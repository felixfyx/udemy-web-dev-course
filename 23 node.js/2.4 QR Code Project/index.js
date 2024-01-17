/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qrImage from "qr-image";
import fs from "fs";
import { type } from "os";

var question = [{
    type: "input",
    name: "url",
    message: "Enter a url",
}];

inquirer.prompt(question).then((answers) => {
    // Get answer
    let input = answers["url"];

    // Generate image
    let qr_img = qrImage.image(input, {type : 'png'});
    qr_img.pipe(fs.createWriteStream('qr.png'));

    // Write file
    fs.writeFile("url.txt", input, (err) => {
        if (err) throw err;

        console.log("File created!");
    });
});