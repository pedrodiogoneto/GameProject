'use strict';

function Enemy (ctx, width, height) {
    var self = this;

    self.size = 100;

    self.ctx = ctx;

    self.gameWidth = width;
    self.gameHeight = height;

    self.positionX = self.gameWidth * getRandomNum(0.6,0.9);
    self.positionY = self.gameWidth * getRandomNum(0.1,0.5);
}

function getRandomNum(min, max) {
    // min = Math.ceil(min);
    // max = Math.floor(max);
    return (Math.random() * (max - min)) + min;
}

Enemy.prototype.draw = function () {
    var self = this;

    self.ctx.fillStyle = 'black';
    self.ctx.fillRect(self.positionX, self.positionY, self.size, self.size)
}