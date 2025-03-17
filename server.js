const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

// Enable CORS for frontend communication
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow frontend requests
    methods: ["GET", "POST"]
  }
});

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  // Listen for messages from the frontend
  socket.on("send_message", (data) => {
    console.log(`📩 Message received: ${data}`);
    io.emit("receive_message", data); // Broadcast to all clients
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});
