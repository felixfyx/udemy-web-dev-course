import express from "express"

const app = express();
const port = 3001;

app.get("/", (req, res) => {
    // Printing out the request headers
    //console.log(req.rawHeaders);

    // Send response
    res.send("<h1>Hello world!</h1>");
});

app.get("/about", (req, res) => {
    // Printing out the request headers
    //console.log(req.rawHeaders);

    // Send response
    res.status(200).send("<h1>About me</h1><p>MY NAME IS DOOK NOOKEM</p>");
});

app.get("/contact", (req, res) => {
    // Printing out the request headers
    //console.log(req.rawHeaders);

    // Send response
    res.send("<h1>Contact</h1>");
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});