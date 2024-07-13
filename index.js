// Principal libraries
import express from "express";
import http from "http";
import 'dotenv/config'

// Routes
import initRoutes from "./src/routes/jobs.js";

// General constants
const app = express();
const server = http.createServer(app);

// Routes
initRoutes(app);

// Server info
server.listen(process.env.PORT || 4000);
console.log(`Start on port: ${process.env.PORT || 4000}`);