import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "felixfoo",
  host: "localhost",
  database: "secrets",
  port: 5432,
});
db.connect();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const username = req.body["username"];
  const password = req.body["password"];
  try {
    const checkUser = await db.query("select * from users where email = $1", [username]);

    if (checkUser.rows.length > 0)
    {
      res.send("Email already exist");
    } else {
      await db.query("insert into users (email, password) values ($1, $2)", [username, password]);
      res.render("secrets.ejs");
    }
  } catch(err) {
    console.log(err);
  }

});

app.post("/login", async (req, res) => {
  const username = req.body["username"];
  const password = req.body["password"];
  try {
    const checkUser = await db.query("select * from users where email = $1", [username]);

    if (checkUser.rows.length == 0)
    {
      res.send("Email does not exist exist");
    } else {
      // Definitely just 1 element here
      const user = checkUser.rows[0];
      if (password === user.password) {
        res.render("secrets.ejs");
      } else {
        res.send("Wrong password");
      }
    }
  } catch(err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
