/** import * as _ from 'lodash';
//import { parseInt, toInteger } from "lodash";
//import {FC} from 'react';
*/
/** Implicit Variables
let lucky: any = 23;
lucky = "23"; // without ':any' -> error, avoid ideally
*/
/** Explicit Variables
  let lucky2 :number;
*/
/** Own type Variables
  type Style = 'bold'| 'italic';
  let font: Style;
  font = 'bold';
*/
/** Interface
interface Person {
  first: string;
  last: string;
  [key: string]: any;
}
*/
/** Object
const person = {
  first: "Jeff",
  last: "eff",
};

const person2 = {
  first: "Jeff2",
  last: "eff2",
  fast: true,
};
*/
/** Functions | Functional Programming
function pow(x, y) {
  // annotate x:number, y:number to work
  return Math.pow(x, y);
}
pow("low", "low"); //string values

function pow2string(x: number, y: number): string {
  // x:number, y:number to return :string
  return Math.pow(x, y).toString();
}
pow2string(5, 2); //string values

function voidvalue(x: number, y: number): void {
  // for event listeners, no return value
  Math.pow(x, y).toString();
}
voidvalue(5, 2);

//Immutable Data
const data = Object.freeze([1,2,3,4,5,6]);
// Function as Arguments
const addEmoji = (val) =>   val + "  😆";
const emojiData = data.map(addEmoji)
console.log(emojiData);

// Function as return value
// sheesh
const appendEmoji = (fixed) => (dynamic)=> fixed + dynamic;

const rain = appendEmoji('🌧');
const sun = appendEmoji('🌞');

console.log(rain(' today'))
console.log(sun(' tomorrow'))

//extra async hehe
async function hello() {
  return "hellooo";
}
*/
/** Array
const arr = [];

arr.push(1);
arr.push("23");
arr.push(false);

//Array with number annotation
const arr2num: number[] = [];
arr2num.push(1);

//Array with Interface
const arrInterface: Person[] = [];

//type, tuple
type Mylist = [number?, string?, boolean?];
// "?" - optional also applicable to function arguments

const arrtuple: Mylist = [];
arrtuple.push(true);
arrtuple.push("23");
arrtuple.push(false);
*/
// Generics | Object Oriented Programming
//Sample Class Emoji
var Emoji = /** @class */ (function () {
    // constructor runs once instantiated
    function Emoji(icon) {
        //gets icon from 'this' class
        this.icon = icon;
    }
    return Emoji;
}());
var sun = new Emoji('🌞'); // Calls the class injects the icon to the constructor
var moon = new Emoji('🌝'); // Calls the class injects the icon to the constructor
console.log(sun);
console.log(moon);
/**
// Sample Class Observable
class Observable<T> {
  constructor(public value: T) {} //Internal type value
}
let x: Observable<number>; // A number
let y: Observable<Person>; // Interface
let z = new Observable(23); // Implicit

//Props Interface
interface CoolProps{
    foo:number;
    bar:string;
}
const Cool:fc<CoolProps> = (props) =>{
    return<>{props.children}</>
}
*/
/** Bootcamp
Data types annotation
let firstName: string= "John Doe";
let ageStr = 20;
 
let age:number = 33;
console.log('HI',firstName, '\nAge: ',age)

interface Student {
  name: string;
  age: number;
  add?: string;
}
const stent1:Student={
  name:"Student",
  age:19
}

const stent2:Student={
  name:"Student",
  age:19,
  add:"ph"
}
console.log('HI',stent1, '\nAge: ',age)

console.log('HI',stent1, stent2)
*/ 
