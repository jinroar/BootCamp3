//Express via common js || Get require to work for es module
import { createRequire } from "module";
const require = createRequire(import.meta.url);
// //file system module for method 1
// import * as fs from 'fs';https://github.com/jenecorpuz/BootCamp3/tree/main/NOde

// /** Express
//  *  The server will live on a url 
//  * 
//  *  When user makes request to this url through a browser
//  *  - The server will respond with some html
//  *  
//  *  Express - An express app can create different url and endpoints
//  *  that the user can navigate to in the browser
//  *  and then we define code for the server to handle those requests 
//  * 
//  *  app.get('/url'(request, response)=>{do something})
//  *  - Get request - When a user navigate to a browser
//  *    requesting data on the server | no modification
//  * 
//  *  -Request = users incoming data
//  *  -Response - your outgoing data
//  *  
//  */
//Common jS
const express = require('express');
const app = express();

//[1/3 methods] send html to server from client with error handling using readFile 
// app.get('/',(request, response)=>{
// fs.readFile('./home.html','utf8',(err,html)=>{
//     if(err){
//         //err in sending content, 500 - server error
//         response.status(500).send('sorry, out of order')
//     }
//     //send content
//     response.send(html);
// })
// });

//[2/3]
// Another method with "sendFile" instead of readFile from 'fs', 
// but requires the whole directory of the machine so not good in pracice
// app.get('/', (req, res) => {
//   res.sendFile('/Users/Jenerose.Corpuz/Desktop/BootCamp3/Node'+'/home.html');
// });

//[3/3]
//Promises and Async method to avoid nesting
const { readFile } = require(`fs`).promises;
app.get('/', async (request, response) => {
    response.send(await readFile('./home.html', 'utf-8'));
});

//Default listen method for deployment
app.listen(3000, () => {
    console.log('Server is running on localhost:3000');
});

//Commented as it doesn't work properly
//app.listen(process.env.PORT || 3030, ( )=> console.log(`App available on https://localhost:3000`))

/**
 *  Now to deploy the node.js app to the cloud we use App Engine by Google as it's FREE!!
 *  
 *  - Standard environment for node.js till version 12. 
 *   - Provides a server and cloud that scales automatically 
 *     - based on the incoming traffice to the app
 * 
 *  Pre-requisites 
 *  Google Cloud Platform Account
 *  Google Cloud Command Line Tools installed in the system
 * 
 *  CREATE  app.yaml file
 *  
 *  app.yaml // inside
 *      runtime: nodejs12
 *       //   App Engine will run the code by looking in the package.json file: "script": "start": "node ."
 *  // end of app.yaml
 * 
 *  Via command line: gcloud app deploy
 *  Click the created link. Then will be redirected to firebase
 *  DONE!!!
 * 
 */
