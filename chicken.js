'use strict';

function Chicken(ctx, width, height, gravity) {
    var self = this;

    self.size = 50;

    self.ctx = ctx;

    self.gameWidth = width;
    self.gameHeight = height;

    self.positionX = self.gameWidth / 10;
    self.positionY = self.gameHeight - self.size;

    self.velocityX = 10;
    self.velocityY = -10; 
    
    self.acceleration = gravity;
}

Chicken.prototype.update = function(key) {
    var self = this;

    if (key === 'h') {
            setInterval(function(){
                if (self.positionY < self.gameHeight - self.size/2) { 
                    self.velocityY = self.velocityY + self.acceleration;
                    self.positionX = self.positionX + self.velocityX;
                    self.positionY = self.positionY + self.velocityY;
                    console.log(self.positionX, self.positionY);
                    self.draw();
                } else {
                    self.positionY = self.positionY;
                }
            }, 20);
    }
}


Chicken.prototype.draw = function () {
    var self = this;

    self.ctx.fillStyle = 'black';
    self.ctx.fillRect(self.positionX - self.size/2, self.positionY - self.size/2, self.size, self.size)
}

