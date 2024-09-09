//import * as _ from 'lodash';

async function hello() {
    return('hellooo')
}

 //implicit
 let lucky:any = 23;
 lucky ='23' // without ':any' -> error, avoid ideally

 /**explicit
  let lucky2 :number;

  type Style = 'bold'| 'italic';
  let font: Style;
  font = 'bold';
*/
const person = {
    first: 'Jeff',
    last: 'eff'
}

const person2 = {
    first: 'Jeff2',
    last: 'eff2'
}