// integrate require module
import { createRequire } from "module";
const require = createRequire(import.meta.url);

//Promises
async function separate_readfile(){
    const { readFile } = require(`fs`).promises;
    //top leve await ayeee node 14
    const file = await readFile ('./promise.txt', 'utf8');
    console.log(file)
    }
    separate_readfile()