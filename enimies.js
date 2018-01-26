'use strict';

var TIME_TO_DISAPEAR_AFTER_COLLISION = 1500;

function Enemy (ctx, width, height) {
    var self = this;

    self.size = 100;

    self.ctx = ctx;

    self.gameWidth = width;
    self.gameHeight = height;

    self.positionX = self.gameWidth * getRandomNum(0.6,0.9);
    self.positionY = self.gameWidth * getRandomNum(0.1,0.5);

    self.done = false;
    self.collided = false;
    self.collidedAt = null;
    self.numberEnemiesCollided = null;
}

function getRandomNum(min, max) {
    // min = Math.ceil(min);
    // max = Math.floor(max);
    return (Math.random() * (max - min)) + min;
}

Enemy.prototype.setCollided = function () {
    var self = this;
    self.collided = true;
    self.collidedAt = new Date();
}

Enemy.prototype.draw = function () {
    var self = this;

    if (self.collided) {

        var scaleUp = (Date.now() - self.collidedAt) / TIME_TO_DISAPEAR_AFTER_COLLISION;
        var y = self.positionY + (self.gameHeight - self.positionY) * scaleUp;
        self.ctx.fillStyle = 'rgba(0,0,0,' + (1 - scaleUp) + ')';
        self.ctx.fillRect(self.positionX, y, self.size, self.size);

        if (scaleUp > TIME_TO_DISAPEAR_AFTER_COLLISION) {
            self.done = true;
        }
        
    }
    else {    
        self.ctx.fillStyle = 'black';
        self.ctx.fillRect(self.positionX, self.positionY, self.size, self.size);
    }
}
