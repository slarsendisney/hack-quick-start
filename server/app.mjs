import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({
  path: `.env`,
});

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);
// Read write from db
// await db.read()
// db.data = db.data || { posts: [] }
// db.data.posts.push('hello world')
// const firstPost = db.data.posts[0]
// await db.write()

const app = express();

const server = http.createServer(app);
var allowList = ["http://my-website.com"];

if (!process.env.NODE_ENV) {
  allowList.push("http://localhost:8000");
  allowList.push("http://localhost:9000");
}

var corsOptions = {
  origin: function (origin, callback) {
    var originIsAllowed = allowList.indexOf(origin) !== -1;
    callback(null, originIsAllowed);
  },
};

const PORT = process.env.PORT || 3000;

app.get("/health-check", cors(), (req, res) => {
  res.sendStatus(200);
});

const io = new Server(server, { cors: corsOptions });

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
