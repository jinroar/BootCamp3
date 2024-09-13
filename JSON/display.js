const people = require("./emp.json");
/*
      Name: {firstName} {lastName}
      Age: {age}
      Occupation: {occupation}
      Children:
          1. {firstName} {lastName}
          ...
          n+1: {firstName} {lastName}

 */
for (let i = 0; i < people.length; i++) {
  const employee = people[i]; // get employee
  const years = new Date().getTime() - new Date(employee.birthDate).getTime();  // get difference between current date and birth date of employee
  const age = Math.round(years / 31557600000);   // round to nearest whole year
  /**
         The Date.getTime() method in JavaScript returns the number of milliseconds 
         that have elapsed since January 1, 1970, 00:00:00 UTC (the epoch). 
         This value is a Unix timestamp, which is a universal and timezone-agnostic 
         representation of a date and time. 
         source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
         */
  console.log(`\n\n\t[ Employee Record # ${i + 1} ] \n\tName: ${employee.firstName} ${employee.lastName}`);  // get last name, first name and display
  console.log("\tAge: ", age);    // get and display age
  console.log( `\tOccupation: ${employee.occupation.name} \n\tCompany Address: ${employee.occupation.address}`); //occupation

  console.log("\tChildren: ");
  if (!employee.children[0].firstName == "") {  //if not blank
    for (let j = 0; j < employee.children.length; j++) {  // iterate children
      console.log(`\t\t  ${j + 1}.  ${employee.children[j].firstName} ${employee.children[j].lastName }`); 
    }
  } else { // blank
    console.log("\t\t  [ None ]");
  }
}
