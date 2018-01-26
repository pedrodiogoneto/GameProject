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
      // getPlayerName();
      buildGame();
  };
    

  function buildSplash() {
    gameStage = 'splash';

    // create dom elements
    splashElement = document.createElement('div');
    splashElement.setAttribute('id', 'splash');

    var containerExt = document.createElement('div');
    containerExt.setAttribute('id', 'containerExt');
    splashElement.appendChild(containerExt);

    var containerTitle = document.createElement('div');
    containerTitle.setAttribute('id', 'containerTitle');
    containerExt.appendChild(containerTitle);

    var containerButton = document.createElement('div');
    containerButton.setAttribute('id', 'containerButton');
    containerExt.appendChild(containerButton);

    var title = document.createElement('h1');
    title.setAttribute('id', 'title');
    title.innerText = 'CHICKEN VENDETTA';
    containerTitle.appendChild(title);
    
    // playerName = document.createElement('input');
    // playerName.setAttribute('value', 'USER NAME');
    // playerName.setAttribute('id', 'playername');
    // splashElement.appendChild(playerName);
    
    startGameButton = document.createElement('button');
    startGameButton.innerText = 'START GAME';
    containerButton.appendChild(startGameButton);
    startGameButton.setAttribute('id','startGameButton');

    // apppend to site-main
    mainElement.appendChild(splashElement);

    // bind click on start play button
    startGameButton.addEventListener('click', handleStartClick);
  }

  // function getPlayerName () {
  //   playerName = document.getElementById('playername').value;
  // }

  function destroySplash() {
        
    // unbind click on start play button
    startGameButton.removeEventListener('click', handleStartClick);
    
    // remove splash from dom
    splashElement.remove();
  }


  // _____ Game

  function buildGame() {
    gameStage = 'game';
    // gameLevel = null;
    game = new Game(mainElement);


    game.onGameOver(function () {
      destroyGame();
      buildGameOver();
    });
    
    game.onGameWin(function () {
      destroyGame();
      buildGameWin();
    });

    function destroyGame() {
      game.destroy();
    }

    // _____ Game Over
  
    var gameWinElement;
    var gameOverElement;
    var playAgainButton;
    var playAgainButtonWinner;
    var donateButton;
    var handlePlayAgainClick = function () {
      destroyGameOver();
      buildGame();
    }; 

    var handlePlayAgainClickWinner = function () {
      destroyGameWin();
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
      donateButton.setAttribute('class', 'btn');
      gameOverElement.appendChild(donateButton);

      // apppend to site-main
      mainElement.appendChild(gameOverElement);s

      // bind click on start play button
      playAgainButton.addEventListener('click', handlePlayAgainClick);
    

      // bind click on donate button
      donateButton.addEventListener('click', handleDonateClick);
    }

    function destroyGameOver() {
      // unbind click on start play button
      playAgainButton.removeEventListener('click', handlePlayAgainClick);
      // unbind click on donate button
      donateButton.removeEventListener('click', handleDonateClick);
      // remove gameOver from dom
      gameOverElement.remove();
    }

    function buildGameWin() {
      gameStage = 'gameWin';

      // create dom elements
      gameWinElement = document.createElement('div');
      gameWinElement.setAttribute('id', 'game-win');
      gameWinElement.setAttribute('id', 'splash');

      var containerExt = document.createElement('div');
      containerExt.setAttribute('id', 'containerExt');
      gameWinElement.appendChild(containerExt);

      var containerTitle = document.createElement('div');
      containerTitle.setAttribute('id', 'containerTitle');
      containerExt.appendChild(containerTitle);

      var containerButton = document.createElement('div');
      containerButton.setAttribute('id', 'containerButton');
      containerExt.appendChild(containerButton);

      var title = document.createElement('h1');
      title.innerText = 'WINNER!!! ';
      containerTitle.appendChild(title);
      title.setAttribute('id','title');

      // var userScore = document.createElement('h2');
      // userScore.innerText = playerName + ' Score: ' + game.score;
      // containerButton.appendChild(userScore);

      playAgainButtonWinner = document.createElement('button');
      playAgainButtonWinner.innerText = 'PLAY AGAIN';
      containerButton.appendChild(playAgainButtonWinner);
      playAgainButtonWinner.setAttribute('id','startGameButton');

      donateButton = document.createElement('button');
      donateButton.innerText = 'DONATE';
      containerButton.appendChild(donateButton);
      donateButton.setAttribute('id','startGameButton');


      // apppend to site-main
      mainElement.appendChild(gameWinElement);

      // bind click on start play button
      playAgainButtonWinner.addEventListener('click', handlePlayAgainClickWinner);
    }

    function destroyGameWin() {
      // unbind click on start play button
      playAgainButtonWinner.removeEventListener('click', handlePlayAgainClickWinner);
      // remove gameOver from dom
      gameWinElement.remove();
    }

  }
    buildSplash();
  
}
window.onload = main;