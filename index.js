/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      //----------- taking input from user ------------//
      message: "Enter Your UPI I'D",
      name: "UPI",
    },
  ])
  .then((answers) => {
    const upi = answers.UPI;
    //---------------- generating qr --------------//
    var qr_png = qr.image(upi);
    qr_png.pipe(fs.createWriteStream("QR2-img.png"));
    //------------ saving that id into a file to maintain the history---//
    fs.writeFile("upiId.txt", upi, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      done("enter a valid upi id");
    } else {
      done("something is wrong");
    }
  });

