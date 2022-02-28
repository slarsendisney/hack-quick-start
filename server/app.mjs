import express from "express";
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'
const app = express();
const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)
// await db.read()
// db.data = db.data || { posts: [] }     
// db.data.posts.push('hello world')
// const firstPost = db.data.posts[0]
// await db.write()



app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
