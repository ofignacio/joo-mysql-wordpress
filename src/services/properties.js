import { transformImages, uploadImageToWpp } from "./images.js";
import { createPost } from "./posts.js";

const insertToWpp = async (property) => {
  let images = await uploadImageToWpp(property.id);
  // if (!images || images.length == 0) {
  //   images = await uploadImageToWpp(property.obj_id);
  // }

  let remImages = transformImages(images);

  if (remImages.length == 0) {
    console.log(
      `Property: ${property.id} and object id: ${property.obj_id}, there aren't photos`
    );
  }

  try {
    return await createPost(property, remImages);
  } catch (err) {
    console.log("Error creating property, retring in 5 seconds...", err);
    try {
      await new Promise((r) => setTimeout(r, process.env.RETRY_DELAY));
      return await createPost(property, remImages);
    } catch (err) {
      console.log("Cannot add the property", property.id);
    }
  }
};

export const insertProperties = async (properties) => {
  let isValidArray =
    properties && Array.isArray(properties) && properties.length;
  if (!isValidArray) {
    throw new Error("Fetch data from database is not a valid array");
  }

  let count = 1;
  for await (let property of properties) {
    const id = await insertToWpp(property);
    console.log(
      `Creating property with id: ${id}, ${count}/${properties.length}`
    );
    count++;
  }
};
