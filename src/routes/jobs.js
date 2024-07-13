import util from "util";
import { insertProperties } from "../services/properties.js";
import { PRINCIPAL_QUERY } from "../utils/queries.js";
import mysql from "../configs/mysql.js";

const query = util.promisify(mysql.query).bind(mysql);

const initRoutes = (app) => {
  app.post("/run-script", async (_req, res) => {
    try {
      console.log("Starting process");
      const properties = await query(PRINCIPAL_QUERY);
      await insertProperties(properties);
      console.log("Finish process");
      res.sendStatus(200);
    } catch (ex) {
      res.json({ message: ex }).sendStatus(500);
    }
  });
};

export default initRoutes;
