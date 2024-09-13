// integrate require module
import { createRequire } from "module";
const require = createRequire(import.meta.url);
//File module - fs
import * as fs from 'fs';

const {readFile, readFileSync} = fs; //sync === blocking  
const txt = readFileSync('./hello.txt','utf8')

console.log(txt)

console.log('me first')

//Callback
//refactoring via callback (text,utf,(error object, variable)=>{function block})
readFile('./bye.txt','utf8',(err, txt)=>{
  if(err){
    console.log('error '+txt)    
    return
  }
  console.log(txt)  
  console.log(`me displayed last but only second before last in code`);
});
console.log('me displayed second but last in code')


//Promises
async function separate_readfile(){
const { readFile } = require(`fs`).promises;
//top leve await ayeee node 14
const file = await readFile ('./promise.txt', 'utf8');
console.log(file)
}
separate_readfile()
