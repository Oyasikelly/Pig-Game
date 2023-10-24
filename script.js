'use strict';

// Selecting elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const currentScore0Element = document.getElementById('current--0');
const currentScore1Element = document.getElementById('current--1');
const diceImage = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting conditions
let scores, currentScore, activePlayer, playing;
function initializing() {
  scores = [0, 0];
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  diceImage.classList.add('hidden');
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
}

initializing();
const player1 = scores[0];
const player2 = scores[1];

function switchPlayers() {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore0Element.textContent = currentScore;
  currentScore1Element.textContent = currentScore;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
}
// Rolling dice functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    //   1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);
    console.log(dice);
    //  2. Display dice
    if (dice) {
      diceImage.classList.remove('hidden');
      diceImage.src = `dice-${dice}.png`;
    }
    //  3. check for rolled  1: if true switch to next player
    if (dice !== 1) {
      // displaying dice score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // if the activeplayer is 0 then set activeplayer to 1, else set activeplayer back to 0 (switching to the next player)

      switchPlayers();
    }
  }
});

function winner() {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
}
btnHold.addEventListener('click', () => {
  if (playing) {
    //  1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //  2. check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      playing = false;
      if (activePlayer === 0) {
        btnRoll.textContent = '🏆 Player 1 Wins';
        winner();
        diceImage.classList.add('hidden');
      } else if (activePlayer === 1) {
        btnRoll.textContent = '🏆 Player 2 Wins';
        winner();
        diceImage.classList.add('hidden');
      }
    }
    // finish the game
    // switch to the next player
    switchPlayers();
  }
});

btnNew.addEventListener('click', () => {
  initializing();
  btnRoll.textContent = '🎲 Roll dice';
});
