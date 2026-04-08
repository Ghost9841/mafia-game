import express from 'express';
import { createServer } from 'node:http';
import {createSocketServer} from "../services/socketServerService.js";
import cors from "cors";

const app = express();
app.use(cors())

const server = createServer(app);

createSocketServer(server);
