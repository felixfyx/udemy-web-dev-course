import express, { json } from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.post("/submit", (req, res) => {
  let bandName = req.body["street"] + req.body["pet"];
  res.send(`<h2>Your band name is: </h2><h1>${bandName}</h1>`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
