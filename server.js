const http = require('http');
//import app
const app = require('./app')

const port = process.env.PORT || 3001;

const server = http.createServer(app);

server.listen(port);