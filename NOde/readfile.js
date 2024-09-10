//File module - fs
const {readFile, readFileSync} = require ('fs'); //sync === blocking  

const txt = readFileSync('./hello.txt','utf8')

console.log(txt)