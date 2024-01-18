//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var isAuthorised = false;

app.use(bodyParser.urlencoded({extended: true}));

// NOTE: I can check password as middleware too (req, res, next)
function checkPassword(req, res, next) {
    let password = req.body["password"];

    if (password == "ILOVEPROGRAMMING") {
        isAuthorised = true;
    } else {
        isAuthorised = false;
    }

    next();
}

app.use(checkPassword);

app.post("/check", (req, res) => {
    // Get the password and check
    if (isAuthorised == true) {
        res.sendFile(__dirname + "/public/secret.html");
    } else {
        res.sendFile(__dirname + "/public/index.html");
    }
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
});