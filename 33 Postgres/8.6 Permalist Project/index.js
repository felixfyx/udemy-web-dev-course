import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "felixfoo",
  host: "localhost",
  database: "permalist",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Get rid of this later
/*
let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];
*/

async function getTasks() {
  const result = await db.query("select * from items");
  let tasks = [];
  result.rows.forEach((task) => {
    tasks.push(task);
  });
  return tasks;
}

app.get("/", async (req, res) => {
  const items = await getTasks();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  try {
    await db.query("insert into items (title) values ($1)", [item]);
    //items.push({ title: item });
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/edit", async (req, res) => {
  const itemId = req.body["updatedItemId"];
  const itemTitle = req.body["updatedItemTitle"];
  try {
    await db.query("update items set title = $2 where id = $1", [itemId, itemTitle]);
    res.redirect("/");
  } catch(err) {
    console.log(err);
  }
});

app.post("/delete", async (req, res) => {
  const item = req.body.deleteItemId;
  try {
    await db.query("delete from items where id = $1", [item]);
    res.redirect("/");
  } catch(err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
