import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "felixfoo",
  host: "localhost",
  database: "world",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisited() {
  const result = await db.query("select country_code from visited_countries");

  let countries = [];
  // Using for loop will create object instead
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  //Write your code here.
  let countries = await checkVisited();
  console.log(countries);
  res.render("index.ejs", { countries: countries, total: countries.length });
});

app.post("/add", async(req, res) => {
  // Get all the countries anyway in case of errors
  const countries = await checkVisited();

  // Select the country row to accept long string format
  try {
    const country_code = await db.query(
      "select country_code from countries where lower(country_name) like '%' || $1 || '%';",
      [req.body["country"].toLowerCase()]
    );
    const country = country_code.rows[0];
    const cc_input = country.country_code;

    // console.log(country); // This will return just "country_code: 'JP'"
    // console.log(country.country_code); // This will return just "JP"

    try {
      await db.query(
        "insert into visited_countries (country_code) values ($1)",
        [cc_input]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
      res.render("index.ejs", { 
        countries: countries, 
        total: countries.length,
        error: "Country name has already been added!"
      });
    }
  } catch (err) {
    console.log(err);
    res.render("index.ejs", { 
      countries: countries, 
      total: countries.length,
      error: "Country name does not exist!"
    });
  }

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
