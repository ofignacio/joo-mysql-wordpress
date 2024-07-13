import { Agent, fetch } from "undici";
import util from "util";
import fs from "fs";
import path from "path";

import mysql from "../configs/mysql.js";
import {
  FILE,
  METHOD_WP,
  OPTIONS_STATUS,
  STATUS,
  TITLE,
} from "../utils/constants.js";
import { PRINCIPAL_QUERY_IMAGES } from "../utils/queries.js";
import { POOL_CONFIG } from "../utils/clients.js";

const agent = new Agent(POOL_CONFIG);
const query = util.promisify(mysql.query).bind(mysql);
const SNUMBER = 5;

export const transformImages = (images) => {
  if (!images || images.length == 0) return "";

  let imagesIdToString = images
    .reverse()
    .map((image) => `i:${image};s:${SNUMBER}:"${image}";`)
    .join("");

  let finalString = `a:${images.length}:{${imagesIdToString}}`;
  return finalString;
};

const createImage = async (formData) => {
  const imageHeaders = new Headers();
  imageHeaders.set("content-disposition", "attachment; filename=tmp");
  imageHeaders.set("Authorization", `Basic ${process.env.AUTH_TOKEN}`);
  const response = await fetch(
    `${process.env.WORDPRESS_URL}/${process.env.WORDPRESS_MEDIA_API}`,
    {
      method: METHOD_WP,
      headers: imageHeaders,
      body: formData,
      dispatcher: agent,
    }
  );

  let data = await response.json();

  return data.id;
};

export const uploadImageToWpp = async (objId) => {
  const images = await query(PRINCIPAL_QUERY_IMAGES, [objId]);
  let addedImages = [];
  for await (let image of images) {
    let fullPath = path.resolve(`./src/pictures/${image.fname}${image.type}`);
    let file;

    try {
      file = await fs.openAsBlob(fullPath);
    } catch (ex) {
      console.error(`The file ${image.fname}${image.type} doesn't exist`);
      continue;
    }

    const formdata = new FormData();
    formdata.append(FILE, file, image.fname + image.type);
    formdata.append(TITLE, image.title);
    formdata.append(STATUS, OPTIONS_STATUS[1]);
    try {
      let id = await createImage(formdata);
      addedImages.push(id);
    } catch (err) {
      try {
        await new Promise((r) => setTimeout(r, process.env.RETRY_DELAY));
        let id = await createImage(formdata);
        addedImages.push(id);
      } catch (e) {
        console.error(`Cannot add image`, err.message);
      }
    }
  }

  return addedImages;
};
