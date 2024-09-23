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
// Generics | Object Oriented Programming | Classes (Private,Public, Static)
/**Sample Class Emoji
class Emoji{ // Doesnt do anything. Just a blueprint for objects

  icon: string;
    // constructor runs once instantiated
    constructor(icon){ // icon property
      //gets icon from 'this' class
      this.icon = icon
    }
}*/
/** Public  Class
class EmojiPublic{ // Public 
    // constructor runs once instantiated
    constructor(public icon){ // public keyword
    }
} */
/** Private acces
class EmojiPrivate{ // Private 
  //previous value
  private prev;

  //get prev
  get this_prev(){ 
    return this.prev;
  }

  // constructor runs once instantiated
  constructor(private icon){ }
  get this_icon (){
    return this.icon;
  }
  change(val){
    this.prev=this.icon;
    this.icon = val;
  }
} 
*/
/**  Public acces // Change icon
const cloud = new EmojiPublic('🌧')
console.log(cloud) ;
cloud.icon = '🚒'
console.log(cloud) ;

//Private
const sun = new EmojiPrivate ('🌞'); // Calls the class injects the icon to the constructor
console.log(sun) ;
//Changing data
sun.change('🚒')
console.log(sun) ;

//Normal
const moon = new Emoji ('🌝'); // Calls the class injects the icon to the constructor
console.log(moon) ;

// Static Methods
class addEmoji{
  static addOneTo(val){
    return 1+val;
  }
}
addEmoji.addOneTo(3);
*/
/**Inheritance - get functionality from parent and is customizable
class Human{ //Main Class
  constructor(public name){}
    sayHi (){
      return `Helo, ${this.name}`;
    }
  }
  const patrick = new Human('Patrick Star')
  console.log(patrick.sayHi());

class SuperHuman extends Human{ //SubClass
    heroName;
      constructor(name) {//no private/publid
      super(name);
        this.heroName = `HERO ${name}`;
      }
      superpower(){
        return `${this.heroName} pops trays 🔥🏀🏀🏀`
      }
}
const steph = new SuperHuman(`Steph Curry`);
console.log(steph.superpower());
console.log(steph.sayHi());
*/
/**Composition - Breaks down functionality to small pieces then combines to make bigger functions
const hasName = (name) =>{
  return {name}
}

const canSayHi = (name) =>{
  return { sayHi:`Hello, ${name}`}
}

const Person = function(name){ // Final Function /Multiple Inheritance
  return {
        ...hasName(name),
        ...canSayHi(name)
  }
}
const person = Person('Jeff')
console.log(person.sayHi)

function applyMixins(derivedCtor: any, baseCtors: any[]){

    baseCtors.forEach(baseCtor=>{

      Object.getOwnPropertyNames(baseCtor.prototype).forEach(name=>{

          derivedCtor.prototype[name] = baseCtor.prototype[name];

      });

    });
}

class CanSayHi{

  heroName;
    
    sayHi(){
      return `Hello, ${this.heroName}`;
    }
}

class HasSuperPower{

  heroName;
    
    superpower(){
      return `${this.heroName} 🔥🔥🔥`;
    }
}

class SuperHero implements CanSayHi, HasSuperPower{

  heroName;

    constructor(public name){

      this.heroName = `SUPER ${name}`;

    }
    sayHi:()=> string;
    superpower: ()=> string;

}

applyMixins(SuperHero, [CanSayHi, HasSuperPower])
const ts = new SuperHero('Typescript');
console.log(ts.superpower());

 */
/** // Sample Class Observable  
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
/** Decorators  @@@
 * 
 *  - A function that allows hooks in your source code
 *  - Either extends the functionality
 *  - Or annotate the metadata
 *  - Write abstractions that are clear and concise
 *  - DO NOT OVERUSE decorators
 * 
 *   Things you can decorate: 
 *     *Note different decorator implentation for each* 
 * 
 *    - class definitions
 *    - properties
 *    - methods
 *    - accessors (getters and setters)
 *    - paramters
 * 
 * */ 

//Emoji decorator property
function Emoji(){

  //Decorator Factory - a function that returns the decorator function itself
  return function(target: Object, key: string | symbol){

    let val = target[key];
    const getter =()=>{
      return val;
    };
    const setter =(next)=>{
      console.log(`updating flavor...`);
      val = `🍦${next}🍦;`
    };

    Object.defineProperty(target, key,{ // Control how a property behave

      get: getter,
      set: setter,
      enumerable: true,
      configurable: true

    });
  };

}

// Decorator placement/Name
//@Frozen - Freezes class
export class IceCreamComponent{
  //@Emoji()
  flavor = 'vanilla';
}

function Frozen(constructor: Function){
Object.freeze(constructor);
Object.freeze(constructor.prototype);
}

console.log(Object.isFrozen(IceCreamComponent))
// If `new` will be false   ^
// READ ONLY








