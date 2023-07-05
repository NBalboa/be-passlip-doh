const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const { connection, getAllPasslip } = require("./configs/database.js");
const { PORT } = require("./configs/secrets.js");

app.use(cors());
app.options("*", cors());
const { router } = require("./middlewares/route.js");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router(app);

io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);

  socket.on("send_message", (data) => {
    getAllPasslip()
      .spread((result) => {
        socket.broadcast.emit(result);
      })
      .catch((err) => {});
  });

  socket.on("send_request", (data) => {
    socket.broadcast.emit("receive_request", data);
  });

  socket.on("send_aprrove", (data) => {
    socket.broadcast.emit("show_approve", data);
  });
});

server.listen(PORT, () => {
  connection();
  console.log(`port running on ${PORT} locally`);
});
