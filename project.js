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
  const reels = []; 
  for (let i = 0; i < COLS; i++){
       reels.push([]);
       const reelSymbols  = [...symbols];
       for (let j = 0; j < ROWS; j++){
         const randomIndex  = Math.floor(Math.random() * reelSymbols.length);
          const selectedSymbol = reelSymbols[randomIndex];
          //reels[i] indicates the reel we working at and pushing into the interir array the selected symbol 
          reels[i].push(selectedSymbol);
          reelSymbols.splice(randomIndex, 1); //We do this so that this that has been slected isnt selected again and the 1 indicates remove 1, randomIndex is the position which we removing that element.
       }
  }

return reels;
};


//14. Transpose which will make the data oputpu appear in columns

const transpose = (reels) => {
   const rows = [];

   for(let i =0; i < ROWS; i++){
      rows.push([]);
      for (let j = 0; j < COLS; j++){
         rows[i].push(reels[j][i])
      }
   }
   return rows;
}


//15. Print rows
//This loop is going through each of the rows
const printRows = (rows) => {
   for ( const row of rows){
      let rowString = "" ;
      for (const [i, symbol] of row.entries()){
         rowString += symbol
         if (i != row.length -1){
            rowString += " | "
         }
      }
      console.log(rowString);
   }
}


//16

//5. Check if the user won

const getWinnings = (rows, bet, lines) => {
   let winnings = 0;

   for (let row = 0; row < lines; row++){
      const symbols = rows[row];
      let allSame = true;

      for(const symbol of symbols){
         if (symbol != symbols[0]){
            allSame = false;
            break;
         }
      }

      if (allSame){
         winnings += bet * SYMBOL_VALUES[symbols[0]]
      }
   }

   return winnings;
};

//17.

//7. Play again
//You wrap all the parts at the bottom of the coe and include a  while loop and call the function at the bottom

const game = () => {
   //8.Create a variable to hold the deposit which shall be their balance and has to be a "let"
let balance = deposit();
  while (true) {
   //20. console.log("You have a balance of $" + balance);
     //7.
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);
//18.
balance -= bet * numberOfLines;

const reels = spin();
const rows = transpose(reels)
printRows(rows);
const winnings = getWinnings(rows, bet, numberOfLines);
//19.
 balance += winnings;
console.log("You won, $" + winnings.toString());
   
   //20.
   if (balance <= 0){
      console.log("You ran out of money");
      break;
   }

   const playAgain = prompt("Do you want to play again (y/n)?");

   if(playAgain != "y") break;

  }

};

game();




//Async/Await

//Async works together with await, inorder tO method chain activities 
//We craete an async function to contain all the three functions.
//A function declared with async returns an empty Promise, await makes an Async function wait before continuing
//Then if one of the conditions is false we create a try/catch to grab the errors
//Using Async and await we can write asynchronous code in a synchronous manner.


// function walkDog(){
//    return new Promise((resolve, reject) =>{
//      setTimeout(() => {

//        const dogWalked = true;

//        if(dogWalked){
//            resolve("You walked the dog")
//        } else {
//            reject("You didnt walk the dog")
//        }

//      }, 1500);
//    });
// }

// function cleanedKitchen(){
//    return new Promise((resolve, reject) => {
//      setTimeout(() => {
//       const washedDishes = True;
//       if(washedDishes){
//        resolve("You washed the utencils")
//       } else{
//          reject("You have unclean utencils")
//       }

//      }, 1000)
//    });
// }

// function takeOutTrash() {
//    return new Promise((resolve,reject) => {
//      setTimeout(() =>{
//        const takeOutTrash = True;
//        if(takeOutTrash){
//            resolve("yOU TOOK OUT THE TRASH")
//        }  else {
//            reject("Please take out the trash")
//        }

//      }, 1000)

//    });
// }

// async function doChores(){

//    try{
//       const walkDogResult = await walkDog();
//       console.log(walkDogResult);
   
//       const cleanedKitchenResult = await cleanedKitchen();
//       console.log(cleanedKitchenResult);
   
//       const takeOutTrashResult = await takeOutTrash();
//       console.log(takeOutTrashResult);
   
//       console.log("You finished all the chores!");

//    } catch {
//       console.error(error);
//    }
  
// }



//PROMISE

//An object that manages asynchronous operations.
//Wrap a Promise Object around {asynchronous code}
// "I promise to return a value"
// PENDING -> RESOLVED or REJECTED
// new Promise ((resolve, reject) => {asynchronous code})
//A container for a future value

// function walkDog(){
//    return new Promise((resolve, reject) =>{
//      setTimeout(() => {

//        const dogWalked = true;

//        if(dogWalked){
//            resolve("You walked the dog")
//        } else {
//            reject("You didnt walk the dog")
//        }

//      }, 1500);
//    });
// }

// function cleanedKitchen(){
//    return new Promise((resolve, reject) => {
//      setTimeout(() => {
//       const washedDishes = True;
//       if(washedDishes){
//        resolve("You washed the utencils")
//       } else{
//          reject("You have unclean utencils")
//       }

//      }, 1000)
//    });
// }

// function takeOutTrash() {
//    return new Promise((resolve,reject) => {
//      setTimeout(() =>{
//        const takeOutTrash = True;
//        if(takeOutTrash){
//            resolve("yOU TOOK OUT THE TRASH")
//        }  else {
//            reject("Please take out the trash")
//        }

//      }, 1000)

//    });
// }

// walkDog().then(value => {console.log(value); return cleanedKitchen()} )
//          .then(value =>  {console.log(value); return takeOutTrash()})
//          .then(value => {console.log(value); console.log("You finished all the chores")});
//          .catch(error => console.error(error));


// Example:
// In this example you use the fetch API to get a country, the response you convert
// to Json format and then store it in a new variable data which you call and render the output of the country in that position.
//We also need to handle errors if the page fails to load or anything and best practice is having it at the bottom of the page


// const getCountryData = function(country){
//    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//      .then(response => response.json())
//      .then(data => renderCountry(data[0]));
//      .catch(err => alert(err) or console.log("` ${err}`"));
// or create a function that will render an error.
//      .finally


// }

// getCountryData();

