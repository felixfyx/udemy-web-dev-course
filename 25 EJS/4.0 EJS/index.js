import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    let date = new Date();
    let day = date.getDay();
    let dayType;
    let adv;
    if (day == 0 || day == 6) {
        dayType = "weekend";
        adv = "go have some fun!";
    } else {
        dayType = "weekday";
        adv = "work hard!";
    }
    res.render(
        "index.ejs",
        {
            display_day: dayType,
            advice: adv
        }
    )
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});