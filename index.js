const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(http);

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "ui/html/index.html"));
});

app.use(express.static("ui"));

io.on("connection", (socket) => {
  socket.broadcast.emit("user connect");

  socket.on("disconnect", () => {
    io.emit("user disconnect");
  });

  socket.on("chat message", (msg) => {
    socket.broadcast.emit("chat message", msg);
  });

  socket.on("typing", (nickname) => {
    socket.broadcast.emit("typing", nickname);
  });
});

http.listen(port, () => console.log(`Server started on port ${port}`));
