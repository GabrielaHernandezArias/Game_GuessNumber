'use strict';

// in this method we need to pass in a selector
/*
class --> .message
id --> # message
*/
/*
// this logs into the console the CONTENT of the html / dom element called 'message'
console.log(document.querySelector('.message').textContent);

// this grabs the message element from the dom and changes the content to this:
document.querySelector('.message').textContent = 'Correct Number!';

console.log(document.querySelector('.message').textContent);


// now let's do the same for the other two elements: score and highscore
document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 13;

// manipulating an input html element
// with an input field to get the actual value we use the .value property, can't just do text content like with the others
document.querySelector('.guess').value = 100;

// HANDLING THE CLICK OF A BUTTON! :) what if we wanna get the value of 
// the input field every time we click the check button?
// this is the first time our code reacts to something we need an EVENT LISTENER

*/

/* 0. DEFINE SECRET NUMBER
we only do this once
*/
let secretNum = Math.trunc(Math.random()*20)+1;
// for now we will print the number in the UI
// debugging: document.querySelector('.number').textContent = secretNum;

// variables
let score = 20;
let highscore = 0;

// A function to set main message ("start guessing...")
const setMainMessage = message => document.querySelector('.message').textContent = message;

// 1. EVENT LISTENER
// we pass on the type of the event: click
// then we tell the listener to run this function() when the event happens
document.querySelector('.check').addEventListener('click', function() {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  // 2. COMPARE GIVEN NUMBER TO SECRET NUMBER AND DISPLAY TEXT
  /* scenario 1: no input
   is there a value? so, if there is no guess it will be 0 which is a falsy value
   so: if guess is false (0), write no number
   !guess is true
   so if true: 
   then all the others
    */
  if (!guess){
    setMainMessage("🚫 Please input a number");
  }
  // if the score is still greater than 1 we can keep guessing
  if (score > 1){
    // SCENARIO 1: CORRECT GUESS
    if (guess === secretNum){
        //before: document.querySelector('.message').textContent = "✅ You got it right!";
        setMainMessage("✅ You got it right!");
        // if the guess is right we are adding a lil something to the CSS of the page
        document.querySelector('body').style.backgroundColor = '#77DD77';
        document.querySelector('.number').style.width = '30rem';  // needs to be inside a string for css
        document.querySelector('.number').textContent = secretNum;
        // update highscore if it applies
        if (score > highscore){
          highscore = score;
          document.querySelector('.highscore').textContent = highscore;
        }
      }
    // SCENARIOS 2 & 3: INCORRECT GUESSES 
      else {
        score --;
        document.querySelector('.score').textContent = score;
        setMainMessage(guess > secretNum ? '📉 Aim lower' : '📈 Aim higher ');
      }
  }
  // else, if the score is not greater than 1 then GAME LOST SUCKA! 
  else {
    setMainMessage("boom! game over 😭")
    document.querySelector('.score').textContent = 0;
  }
});

// CHALLENGE: implement the 'Again' button :)
// select the element with the again text and attach a click event handler
// in the handler function, restore the initial values of:
// score, secret number, message, number, score, guess
// restore background color & width 

document.querySelector('.again').addEventListener('click', function() {
  score = 20;
  secretNum = Math.trunc(Math.random()*20)+1;
  document.querySelector('.score').textContent = score;
  setMainMessage("Start guessing...");
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
});