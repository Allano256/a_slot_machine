//THINGS TO KNOW BEFORE STARTING TO DEVELOP

// 1.Deposit some money
//2.Determine number of lines to bet on
// 3. Collect a bet amount
//4.Spin the slot machine
//5. Check if the user won
//6. Give the user their winnings
//7. Play again

// 3. Collect a bet amount/Ask the user to make a stake/deposit
//Use ES6
//This is what we installed that we shall use to make a request to the user
const prompt = require("prompt-sync")();

const deposit = () => {
  //4.We need to return the number from this function and also to make sure the user keeps entering the value if its invalid. Using a  while loop
  while (true) {
    //1.This requests the user to enter a value
    const depositAmount = prompt("Enter a deposit amount: ");

    //2.This converts the string to an integer/number entered as deposit
    const numberDepositAmount = parseFloat(depositAmount);

    //3.We need check if its a number entered
    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Invalid deposit amount, try again.");
    } 
    //5. How we end the while loop by creating an else statement
    else {
      return numberDepositAmount;
    }
  }
};

//6.Create a variable to hold the deposit
const depositAmount = deposit();
console.log(depositAmount);
