//Initialization
const input = document.getElementById("input"); //get element input
const buttons = document.querySelectorAll("button"); //select all instances of button

// Calcu Function
function calculate(expression) {
  // Get input
  console.log(expression); //  string type
  console.log(typeof expression); // Return datatype of input

  //Try-catch, return valid expression
  try {
    // return function object to solve the mathmatical experession
    return new Function("return " + expression)();   
  } catch (error) {
    return "Error";
  }
}

// function check(buttonValue) {
//   if (buttonValue.value === "0") {
//     input.value = buttonValue.value;
//   }
// }

function operation(buttonValue) {
  // if (buttonValue.value === "0") {
  //     input.value = "";
  // }
  // else 
  if (buttonValue === "C") { // Clear
    input.value = "";
  } else if (buttonValue === "=") { // call calculate function
    input.value = calculate(input.value);
  } else { 
    input.value = input.value + buttonValue ; // concat input
  }
} 

buttons.forEach((button) => { // for each click of button call listener
  let buttonValue = button.innerText; // get inner text of pressed button
  button.addEventListener("click", function () { 
    operation(buttonValue); // for each click of button call operation()
  });
});
