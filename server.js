const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// When a user connects
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Receive message from client
  socket.on("sendMessage", (data) => {
    // Send message to all connected clients
    io.emit("receiveMessage", data);
  });

  // When user disconnects
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Test route
app.get("/", (req, res) => {
  res.send("Chat Backend Running ✅");
});

// Use Render's dynamic port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
