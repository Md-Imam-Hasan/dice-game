'use strict';
var scores, activePlayer, currentScore, gamePlay, diceDOM;

// Initial state
function init() {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  gamePlay = true;
  diceDOM = document.querySelector('.dice');
  diceDOM.style.display = 'none';

  document.getElementById('name--0').textContent = 'Player 1';
  document.getElementById('name--1').textContent = 'Player 2';
  document.getElementById('score--0').textContent = '0';
  document.getElementById('score--1').textContent = '0';
  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.remove('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');
}

function newPlayer() {
  diceDOM.style.display = 'none';
  currentScore = 0;
  document.querySelector('#current--' + activePlayer).textContent = currentScore;
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
  if (activePlayer == 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
}
// new Game button select
document.querySelector('.btn--new').addEventListener('click', init);
// button role the dice
document.querySelector('.btn--roll').addEventListener('click', function () {
  if (gamePlay) {
    var dice = Math.floor(Math.random() * 6) + 1;
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    if (dice != 1) {
      currentScore += dice;
      document.querySelector('#current--' + activePlayer).textContent = currentScore;
    } else {
      newPlayer();
    }
  }
});
// hold button
document.querySelector('.btn--hold').addEventListener('click', function () {
  if (gamePlay) {
    scores[activePlayer] += currentScore;
    document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      document.querySelector('.player--' + activePlayer).classList.add('player--winner');
      document.getElementById('name--' + activePlayer).textContent = 'Winner';
      gamePlay = false;
    }
    currentScore = 0;
    document.querySelector('#current--' + activePlayer).textContent = currentScore;
    newPlayer();
  }
});
init();
