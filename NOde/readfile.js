//File module - fs
const {readFile, readFileSync} = require ('fs'); //sync === blocking  

const txt = readFileSync('./hello.txt','utf8')

console.log(txt)

console.log('me first')

//Callback
//refactoring via callback (text,utf,(error object, variable)=>{function block})
readFile('./hello.txt','utf8',(err, txt)=>{
  console.log('me second '+txt)  
});

// //Promises
// const { readFile2 } = require ('fs').promises;
// //top leve await ayeee node 14
// const file = await readFile2 ('./hello.txt', 'utf8');
// console.log(file)
