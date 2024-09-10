//import * as _ from 'lodash';

async function hello() {
    return('hellooo')
}

 //implicit
 let lucky:any = 23;
 lucky ='23' // without ':any' -> error, avoid ideally

 /**explicit
  let lucky2 :number;

 //own type
  type Style = 'bold'| 'italic';
  let font: Style;
  font = 'bold';
*/
//Interface
interface Person {
    first: string;
    last: string;
    [key: string]:any
}

//object
const person = {
    first: 'Jeff',
    last: 'eff'
}

const person2 = {
    first: 'Jeff2',
    last: 'eff2',
    fast:true
}

//functions
function pow(x, y){ // annotate x:number, y:number to work
    return Math.pow(x,y);
}
pow('low','low')//string values


function pow2string(x:number, y:number): string { // x:number, y:number to return :string
    return Math.pow(x,y).toString();
}
pow2string(5,2)//string values

function voidvalue(x:number, y:number): void { // for event listeners, no return value
     Math.pow(x,y).toString();
}
voidvalue(5,2)


//Array
const arr =  []

arr.push(1)
arr.push('23')
arr.push(false)

//Array with number annotation
const arr2num:number[] =  []
arr2num.push(1)

//Array with Interface
const arrInterface: Person[] =  []

//type, tuple
type Mylist = [number?,string?,boolean?]
     // "?" - optional also applicable to function arguments

const arrtuple: Mylist = []
arrtuple.push(true)
arrtuple.push('23')
arrtuple.push(false)



//Generics

class Observable<T>{
    constructor(public value: T){} //Internal type value 
}
    let x: Observable<number>; // A number
    let y: Observable<Person>; // Interface

    let z = new Observable(23) // Implicit
