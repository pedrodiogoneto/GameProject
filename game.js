'use strict';

function Game(mainElement) {
    var self = this;

    self.mainElement = mainElement;

    self.finished = false;
    self.score = 0;
    self.width = window.innerWidth;
    self.height = window.innerHeight;

    self.gravity = 0.15;

 //   self.enimiesNumber = 1;

    // create dom elements'
    self.canvasElement = document.createElement('canvas');
    self.canvasElement.width = self.width;
    self.canvasElement.height = self.height;
    mainElement.appendChild(self.canvasElement);

    self.ctx = self.canvasElement.getContext('2d');

    self.chicken = new Chicken(self.ctx, self.width, self.height, self.gravity);

    //Chicken's movement commands
    self.handleKeyDown = function (event) {
       
        var key = event.key.toLowerCase();
        
        switch (key) {
            case 'w':
                self.chicken.trowingAngleHigher();
                break;
            case 's':
                self.chicken.trowingAngleLower();
                break;
            case 'a':
                self.chicken.trowingVelocityLower();
                break;
            case 'd':
                self.chicken.trowingVelocityHigher();
                break;
            case 'h':
                self.chicken.throw();
                break;
        }
    }

    document.addEventListener('keydown', self.handleKeyDown);

    function chickenMovement () {
        self.chicken.update();

        self.ctx.clearRect(0, 0, self.width, self.height);
        self.chicken.draw();
        self.ctx.fillStyle = 'black';
        self.chicken.drawThrowLine ();
        self.enimies.draw();
       
        if (!self.finished) {
            window.requestAnimationFrame(chickenMovement);
        }

        if (self.chicken.throwing){
            if (self.chicken.positionX + self.chicken.size/2 >=  self.enimies.positionX && self.chicken.positionY - self.chicken.size/2 <= self.enimies.positionY) {
                console.log('its fucking colliding in the X axis bro!!!');
                self.finished = true;
            } else {
                console.log('at least its logging')
            }
        }

    }
    window.requestAnimationFrame(chickenMovement);


   // for (var number=0; number<=self.enimiesNumber;number++) {
        self.enimies = new Enimies(self.ctx, self.width, self.height);
   // }

    function drawEnimies () {
        var self = this;
        self.ctx.fillStyle = 'black';
        self.ctx.fillRect(self.positionX - self.size, self.positionY - self.size, self.size, self.size)
        self.enimies.draw();
    }


//     // Detect Collision
//     if (self.chicken.throwing){
//     if (self.chicken.positionX + self.chicken.size/2 >=  self.enimies.positionX && self.chicken.positionX + self.chicken.size/2 <= self.enimies.positionX + self.enimies.size) {
//         console.log('its fucking colliding in the X axis bro!!!');
//         return;
//     } else {
//         console.log('at least its logging')
//     }
// }
}



Game.prototype.destroy = function () {
    var self = this;
  
    self.finished = true;
  
    self.canvasElement.remove();
  
    document.removeEventListener('keydown', self.handleKeyDown);
};