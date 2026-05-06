import express from 'express';
import { createServer } from 'node:http';
import {createSocketServer} from "../services/socketServerService.js";
import cors from "cors";
import { log } from 'node:console';

const app = express();
app.use(cors());

const server = createServer(app);

app.get('/', (req, res) => {
  res.send('Welcome to Mafioso Backend!');
});

createSocketServer(server);
