import express from 'express';
var cors = require('cors');
const server = express();
server.use(cors());
server.use(express.json());
export default server;
