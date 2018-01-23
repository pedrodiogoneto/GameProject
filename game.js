'use strict';

function Game(mainElement) {
    var self = this;

    self.mainElement = mainElement;

    self.finished = false;
    self.score = 0;
    self.width = window.innerWidth;
    self.height = window.innerHeight;

    self.gravity = 0.15;

    // create dom elements'
    self.canvasElement = document.createElement('canvas');
    self.canvasElement.width = self.width;
    self.canvasElement.height = self.height;
    mainElement.appendChild(self.canvasElement);

    self.ctx = self.canvasElement.getContext('2d');

    self.chicken = new Chicken(self.ctx, self.width, self.height, self.gravity);

    //Chickes's movement commands
    self.handleKeyDown = function (event) {
       
        var key = event.key.toLowerCase();
        
        switch (key) {
            // case 'w':
            //     self.player.update('w');
            //     break;
            // case 's':
            //     self.player.update('s');
            //     break;
            // case 'a':
            //     self.player.update('a');
            //     break;
            // case 'd':
            //     self.player.update('d');
            //     break;
            // case 'm':
            //     self.player.jump('m');
            //     break;
            case 'h':
                self.chicken.update('h');
                break;
        }
    }

    document.addEventListener('keydown', self.handleKeyDown);

    function chickenMovement () {
        self.chicken.update();

        self.ctx.clearRect(0, 0, self.width, self.height);
        self.chicken.draw();
        self.ctx.fillStyle = 'black';
       
        if (!self.finished) {
            window.requestAnimationFrame(chickenMovement);
        }
    }
    window.requestAnimationFrame(chickenMovement);
}

Game.prototype.destroy = function () {
    var self = this;
  
    self.finished = true;
  
    self.canvasElement.remove();
  
    document.removeEventListener('keydown', self.handleKeyDown);
};