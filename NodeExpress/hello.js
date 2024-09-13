// const myname = "John"

// console.log("Helo",myname);

// const printname = (pname) =>{

//     console.log("Helo",myname);

// }

// printname(myname);

// const person =
// {
//     fname:"jon",
//     lname:"doe",
//     age: 33,
//     subjects: ["eng","math"]
// }

// const person2 =
// {
//     fname:"jane",
//     lname:"doe",
//     age: 25,
//     subjects: ["eng","math"]
// };

// //Array
// const people =
// [
//     person,
//     person2
// ]

// //person.fname = "Jane";
// console.log(people[0].fname)
//person.fname = "Jane";
//console.log(people[1].subjects);

const people = require("./people.json");

/**
 *   Name: {firstName} {lastName}
        Age: {age}
        Occupation: {occupation}
        Children:
            1. {firstName} {lastName}
            ...
            n+1: {firstName} {lastName}

 
 */

for (let i = 0; i < people.length; i++) {
  const person = people[i]; // get person
  console.log(`Person: ${person.lname},${person.fname}`); // get last name, first name
  console.log("Subjects: ");

  for (let j = 0; j < person.subjects.length; j++) {
    // inner loop for person object and inside subjects
    console.log(`\t${j + 1}. ${person.subjects[j]}`); // iterate subjects
  }
}
