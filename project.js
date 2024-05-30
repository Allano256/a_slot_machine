//THINGS TO KNOW BEFORE STARTING TO DEVELOP

// 1.Deposit some money
//2.Determine number of lines to bet on
// 3. Collect a bet amount
//4.Spin the slot machine
//5. Check if the user won
//6. Give the user their winnings
//7. Play again




// 1.Deposit some money 
//Use ES6
//This is what we installed that we shall use to make a request to the user
const prompt = require("prompt-sync")();


//9. Create symbols to show in the spin machine, rows and columns, value of each wheel
//Global variables all in CAPS
const ROWS =3;
const COLS = 3;

 //10.
 //These are the possible u can have in each wheel, which we shall randomly select from
const SYMBOLS_COUNT = {
      A :2,
      B:4,
      C :6,
      D: 8
}

//11.
 //This is what shall be multiplied by the bet, so a line of A multiplies by 5 osv. 
 //This is the multiplier of the value of each symbol
const SYMBOL_VALUES = {
        A: 5,
        B: 4,
        C: 3,
        D: 2
}



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



//2.Determine number of lines to bet on

//6.
const getNumberOfLines = () => {
   //Here we can duplicate the code from the deposit function
   while (true) {
      //1.This requests the user to enter number of lines
      const lines = prompt("Enter the number of lines to bet on (1-3): ");
  
      //2.This converts the string to an integer/number entered as number of lines ton play
      const numberOfLines = parseFloat(lines);
  
      //3.We need check if its a number of lines picked which has to be less than 3 as 3 is the maximum
      if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
        console.log("Invalid number of lines, try again!");
      } 
      //5. How we end the while loop by creating an else statement
      else {
        return numberOfLines;
      }
    }
};


// 3. Collect a bet amount, we need to figureout how much the user is betting
//Whatever the bet is going to be depends on their balance, basing on what they deposited

//8.
const getBet = (balance, lines) =>{
   while (true) {
      //1.This requests the user to enter number of lines
      const bet = prompt("Enter the total bet per line: ");
  
      //2.This converts the string to an integer
      const numberBet = parseFloat(bet);
  
      //3.We need check if the bet placed is a number,  not below 0 but also not above the balance available and divisible by the number of lines
      if (isNaN(numberBet) || numberBet <= 0 || numberBet > (balance/lines ) ){
        console.log("Invalid bet, try again!");
      } 
      //5. How we end the while loop by creating an else statement
      else {
        return numberBet;
      }
    }
}


//4.Spin the slot machine

//12. Spinning the wheel basically epends omn the symbol_count and how many symbols we have in the wheel
//And determine if the user won anything
//Generate the wheels
//You have the symbol an count to give you the letter an coreresponing value attache to it

const spin = () => {
  const symbols = [];
  //Here we iterate through the symbols
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){

        //Then we have another for loop to push the results into the symbols array
        for(let i = 0; i < count; i++){
            symbols.push(symbol);
        }
  }
  //13.Select the results randomly into our wheels,each array will represent a column inside our slot machine
  //We need to generate what is inside each one of them
  const reels = [[],[],[]]; 
  for (let i = 0; i < COLS; i++){

       const reelSymbols  = [...symbols];
       for (let j = 0; j < ROWS; j++){
         const randomIndex  = Math.floor(Math.random() * reelSymbols.length);
          const selectedSymbol = reelSymbols[randomIndex];
       }
  }

}
spin();




//8.Create a variable to hold the deposit which shall be their balance and has to be a "let"
let balance = deposit();

//7.
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);



