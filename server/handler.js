import app from "./server.js";

import { configDotenv } from "dotenv";
import http from 'http'

const httpServer = http.createServer(app);

const server =httpServer.listen(process.env.PORT)
