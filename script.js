// script.js

// Shuffle function to randomize card order
function shuffleCards() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
}


const cards = document.querySelectorAll('.card');

let isFlipped = false;
let firstCard, secondCard;
let count = 0;
function flipCard() {
  if (this === firstCard) return;

  // Play the card flip sound effect
  const cardFlipSound = document.getElementById('card-flip-sound');
  cardFlipSound.play();

  

  this.classList.add('flip');


  if (!isFlipped) {
    // First card is flipped
    isFlipped = true;
    firstCard = this;
  } else {
    // Second card is flipped
    secondCard = this;
    checkForMatch();
  }
}

function checkForMatch() {
  let firstCardImage = firstCard.querySelector('.card-front img').getAttribute('src');
  let secondCardImage = secondCard.querySelector('.card-front img').getAttribute('src');
  let isMatch = firstCardImage === secondCardImage;


  const rightMatchSound = document.getElementById('right-match-sound');
  rightMatchSound.pause();
  rightMatchSound.currentTime = 0;
  
  if (isMatch) {
    const rightMatchSound = document.getElementById('right-match-sound');
    rightMatchSound.play();

    disableCards();

  } else { 

    unflipCards()
  }
}

function disableCards() {
  count++;
  
  console.log(count);
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();

  checkForWin();
}

function unflipCards() {
  const wrongMatchSound = document.getElementById('wrong-match-sound');
  wrongMatchSound.play();

  cards.forEach(card => card.removeEventListener('click', flipCard));
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
    cards.forEach(card => card.addEventListener('click', flipCard));
  }, 1000);
}

// if count == 8:
// display" you won!"
// enable confetti
// After 2 seconds display play again button
// play again button unflips entire board.

function checkForWin() {
  if (count === 8) {
    displayWinMessage();
  }
}

function resetBoard() {
  isFlipped = false;
  firstCard = null;
  secondCard = null;
}

function displayWinMessage() {
  // Display "You won!" message and enable confetti here

  const foregroundContainer = document.querySelector('.foreground-container');
  foregroundContainer.classList.remove('hidden');

  startConfetti();

  console.log("You won!");

  const cheerSound = document.getElementById('cheer-sound');
  cheerSound.play();

  const winSound = document.getElementById('win-sound');
  winSound.play();



  const playAgainButton = document.getElementById('play-again-btn');
  playAgainButton.addEventListener('click', resetGame);
  playAgainButton.addEventListener('click', playSound);
  playAgainButton.addEventListener('click',stopConfetti);
  
  

}

function playSound(){
  const replaySound = document.getElementById('replay-sound');
  replaySound.play();
}


function resetGame() {

  // Remove the "Play again" button from the DOM
  const foregroundContainer = document.querySelector('.foreground-container');
  foregroundContainer.classList.add('hidden');


  const winSound = document.getElementById('win-sound');
  winSound.pause();
  winSound.currentTime = 0;

  const cheerSound = document.getElementById('cheer-sound');
  cheerSound.pause();
  cheerSound.currentTime = 0;




  // Unflip all the cards
  cards.forEach(card => card.classList.remove('flip'));

  // Shuffle the cards again
  shuffleCards();

  // Reset the count of matches made
  count = 0;

  cards.forEach(card => card.addEventListener('click', flipCard));
}


// Shuffle the cards before adding event listeners
shuffleCards();

// Add event listeners to each card
cards.forEach(card => card.addEventListener('click', flipCard));




















