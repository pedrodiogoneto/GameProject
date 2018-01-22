'use strict';

function Game(mainElement) {
    var self = this;

    self.mainElement = mainElement;

    self.finished = false;
    self.score = 0;
    self.width = window.innerWidth;
    self.height = window.innerHeight;

    // create dom elements'
    self.canvasElement = document.createElement('canvas');
    self.canvasElement.width = self.width;
    self.canvasElement.height = self.height;
    mainElement.appendChild(self.canvasElement);

    self.ctx = self.canvasElement.getContext('2d');

    self.player = new Player(self.ctx, self.width, self.height);


    //Player's movement
    self.handleKeyDown = function (keycode) {
        switch (keycode) {
          case '36':
            self.player.setDirection('UP');
            break;
        }
    }


    document.addEventListener('keydown', self.handleKeyDown);

    function verticalMovement () {
        self.player.update();

        self.ctx.clearRect(0, 0, self.width, self.height);
        self.player.draw();
        self.ctx.fillStyle = 'black';
       
        if (!self.finished) {
            window.requestAnimationFrame(verticalMovement);
        }
    }
    
    window.requestAnimationFrame(verticalMovement);
};

Game.prototype.destroy = function () {
    var self = this;
  
    self.finished = true;
  
    self.canvasElement.remove();
  
    document.removeEventListener('keydown', self.handleKeyDown);
  };