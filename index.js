'use strict';

function main() {

    var mainElement = document.querySelector('#site-main');

    var gameStage;
    var game;

    // _____ Splash Screen

    var splashElement;
    var startGameButton;
    var playerName;
    var handleStartClick = function () {
        destroySplash();
        buildGame();
      };
    

    function buildSplash() {
        gameStage = 'splash';

        // create dom elements
        splashElement = document.createElement('div');
        splashElement.setAttribute('id', 'splash');

        var title = document.createElement('h1');
        title.innerText = 'A REALLY COOL NAME';
        splashElement.appendChild(title);
        
        playerName = document.createElement('input');
        playerName.setAttribute('value', 'USER NAME');
        splashElement.appendChild(playerName);
        
        startGameButton = document.createElement('button');
        startGameButton.innerText = 'START GAME';
        splashElement.appendChild(startGameButton);

        // apppend to site-main
        mainElement.appendChild(splashElement);

        // bind click on start play button
        startGameButton.addEventListener('click', handleStartClick);
    }

    function destroySplash() {
        
        // unbind click on start play button
        startGameButton.removeEventListener('click', handleStartClick);
        
        // remove splash from dom
        splashElement.remove();
    }


  // _____ Game

  function buildGame() {
    gameStage = 'game';
    game = new Game(mainElement);

    window.setTimeout(function () {
      destroyGame();
      buildGameOver();
    }, 100000);
  }

  function destroyGame() {
    game.destroy();
  }

  // _____ Game Over

  var gameOverElement;
  var playAgainButton;
  var donateButton;
  var handlePlayAgainClick = function () {
    destroyGameOver();
    buildGame();
  };

  function buildGameOver() {
    gameStage = 'gameOver';

    // create dom elements
    gameOverElement = document.createElement('div');
    gameOverElement.setAttribute('id', 'game-over');

    var title = document.createElement('h1');
    title.innerText = 'GAME OVER LOSER';
    gameOverElement.appendChild(title);

    var userScore = document.createElement('h2');
    userScore.innerText = playerName + ' Score: ' + game.score;
    gameOverElement.appendChild(userScore);

    playAgainButton = document.createElement('button');
    playAgainButton.innerText = 'PLAY AGAIN';
    gameOverElement.appendChild(playAgainButton);

    donateButton = document.createElement('button');
    donateButton.innerText = 'DONATE';
    gameOverElement.appendChild(donateButton);

    // apppend to site-main
    mainElement.appendChild(gameOverElement);

    // bind click on start play button
    playAgainButton.addEventListener('click', handlePlayAgainClick);
  }

  function destroyGameOver() {
    // unbind click on start play button
    playAgainButton.removeEventListener('click', handlePlayAgainClick);
    // remove gameOver from dom
    gameOverElement.remove();
  }

    buildGame();
}


window.onload = main;