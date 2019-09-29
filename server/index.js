const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const router = require('./router');
const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};
const uri =
  'mongodb+srv://jezzamondev:jezzamonmongo@cluster0-hkx6v.mongodb.net/multivision?retryWrites=true&w=majority';
mongoose.connect(uri, options).then(
  () => {
    console.log('ready');
  },
  err => {
    console.log('err appears err', err);
  }
);

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);
const port = process.env.PORT || 3030;
const server = http.createServer(app);
server.listen(port);
console.log('server listening on:', port);
