'use strict';
var scores, activePlayer, currentScore, gamePlay, diceDOM, finalScore, prevDice;

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
  prevDice = 0;
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
    if ((prevDice) && (prevDice == 6 && dice == 6)) {
      scores[activePlayer] = 0;
      document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];
      newPlayer();
    } else {
      prevDice = dice;
      diceDOM.style.display = 'block';
      diceDOM.src = 'images/dice-' + dice + '.png';
      if (dice != 1) {
        currentScore += dice;
        document.querySelector('#current--' + activePlayer).textContent = currentScore;
      } else {
        newPlayer();
      }
    }
  }
});
// hold button
document.querySelector('.btn--hold').addEventListener('click', function () {
  if (gamePlay) {
    var input = document.querySelector('.final--score').value;
    if (input) {
      finalScore = input;
    } else {
      finalScore = 100;
    }
    scores[activePlayer] += currentScore;
    document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];
    if (scores[activePlayer] >= finalScore) {
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
