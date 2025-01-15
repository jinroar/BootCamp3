/**
 * 
 *  Dynamic Shopping Cart via CLI
 *
 *  1. Array to hold product prices
 *  2. Calculate total cost using reduce() method
 *  3. Display Summary of products with total price
 *  
 */

import promptSync from 'prompt-sync';

//declare prompt method from prompt-sync package
const prompt = promptSync();

const shop = () => {
    //an empty array to hold the prices of products
    let cart = [];

    //takes the array of prices and calculates the sum of all items - using reduce() method
    const calculateTotal = () => {
        return cart.reduce((pre, next) =>  pre + next , 0);
    }

    let flag = true;

    //Continue asking for prices until the user enters an empty input
    while (true) {
        let input = prompt('Enter the price of the product (or leave empty to finish):');
        if (input === "") {
            flag = false; //an empty input
            break;
        }

        //parses input as number for calculation
        let price = parseFloat(input);

        //accepts a price as an argument and adds it to the array of product prices
        const addToCart = (price) => {

            //checks if the input is a valid number before adding it to the cart
            const isNumeric = (string) => string == Number.parseFloat(string)

            if (isNumeric(input) && price > 0) {
                cart.push(price);
                console.log(`Added $${price} to the cart.`);
                console.log(`value: ${!Number.isNaN(input)}`);

            } else {
                console.log("Invalid input.");
            }
        }

        addToCart(price);
    }

    console.log(`\nShopping Cart Summary: 
                        Prices: ${"$" + cart.join(" $")} 
                        Total:  ${"$" + calculateTotal()}`);
}
shop();