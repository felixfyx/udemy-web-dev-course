const fs = require("fs");

// Write
fs.writeFile("Hello.txt", "Peepee Poopoo", (err) => {
    if (err) throw err;
    console.log("File created!");
});

// Read
fs.readFile("message.txt", "utf-8", (err, data) => {
    if (err) throw err;
    console.log(data);
  }); 