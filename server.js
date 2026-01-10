require("dotenv").config();
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require("./src/services/ai.service");

const httpServer = createServer(app);
const chatHistory = [];
const io = new Server(httpServer, {
  cors: {
    origin: "https://chat-sphere-frontend-9egl.vercel.app",
  },
});

io.on("connection", (socket) => {
  socket.on("ai-message", async (data) => {
    chatHistory.push({
      role: "user",
      content: data.prompt,
    });

    const response = await generateResponse(chatHistory);

    chatHistory.push({
      role: "assistant",
      content: response,
    });

    socket.emit("ai-message-response", response);
  });
});

httpServer.listen(3000, () => {
  console.log("Server Started");
});
