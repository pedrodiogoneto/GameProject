'use strict';

function Chicken(ctx, width, height, gravity) {
    var self = this;

    self.size = 50;

    self.ctx = ctx;

    self.gameWidth = width;
    self.gameHeight = height;
    self.throwing = false;

    self.baselineY = self.gameHeight - self.size;
    self.positionX = self.gameWidth / 10;
    self.positionY = self.baselineY;

    self.velocityX = 15;
    self.velocityY = -15; 

    self.angle = 0.7; //radianos (0 a pi)!

    self.velocityXAngle = self.velocityX * Math.cos(self.angle);
    self.velocityYAngle = self.velocityY * Math.sin(self.angle);
    
    self.acceleration = gravity;
}

Chicken.prototype.throw = function() {
    var self = this; 

    self.throwing = true;
};

Chicken.prototype.update = function() {
    var self = this;

    if (self.throwing) {
     
        if (self.positionY <= self.baselineY) { 
            self.velocityYAngle = self.velocityYAngle + self.acceleration;
            self.positionX = self.positionX + self.velocityXAngle;
            self.positionY = self.positionY + self.velocityYAngle;
            console.log(self.positionX, self.positionY);
        } else {
            self.throwing = false;
            self.positionY = self.positionY;
        }
    }
}


Chicken.prototype.draw = function () {
    var self = this;

    self.ctx.fillStyle = 'black';
    self.ctx.fillRect(self.positionX - self.size/2, self.positionY - self.size/2, self.size, self.size)
}

