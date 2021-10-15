const express = require("express");
const socketio = require("socket.io");

const app = express();

const expressServer = app.listen(9000);

const io = socketio(expressServer);

io.of("/").on("connection", (socket) => {
  console.log(socket.id);
  io.emit("live-painter", {
    message: "Welcome to Live Painter. We are happy to see you",
  });

  socket.on("line", (data) => {
    io.emit("drawLine", data);
  });

  socket.on("clear", (data) => {
    io.emit("clear", null);
  });
});
