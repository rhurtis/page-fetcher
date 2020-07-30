/*
Implement a small command line node app called fetcher.js
which should take a URL as a command-line argument as well
as a local file path and download the resource to the specified path.
Upon completion, it should print out a message like:
Downloaded and saved 1235 bytes to ./index.html.


> node fetcher.js http://www.example.edu/ ./index.html
Downloaded and saved 3261 bytes to ./index.html


Use the request library to make the HTTP request
Use Node's fs module to write the file
Use the callback based approach we've been learning so far
Do not use the pipe function
Do not use synchronous functions (see warning below)


*/

// note the specified file path should be entered like: /filename.extension

let inputURL = "";

inputURL = process.argv.slice(2,3);
let inputUrlString = String(inputURL);
let inputFilepath = process.argv.slice(3,4);
let actualInputFilepath = '/vagrant/w2/d3/page-fetcher/downloads' + inputFilepath;

console.log(`the input url is: ${inputURL} and the specified filepath is ${inputFilepath}`); //verifying that the input has been received.


const request = require('request');
let fs = require('fs');

request(inputUrlString, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
 
  if (error !== null) {
    return console.log('You entered the URL incorrectly or the website does not exist.');
  }
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  
  

  if (response.statusCode !== 200) {
    return console.log(`You may have entered the URL incorrectly or the website may be experiencing problems. The statusCode: ${response.statusCode}`);
  }


  fs.writeFile(actualInputFilepath, body, function(err) {
    if (err) throw err;
    
  });



  setTimeout(() => {
    let stats = fs.statSync(actualInputFilepath);
    let fileSizeInBytes = stats["size"];
    console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${actualInputFilepath}.`);
  },3000);

}





);



