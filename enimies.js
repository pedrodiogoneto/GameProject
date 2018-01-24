'use strict';

function Enemy (ctx, width, height) {
    var self = this;

    self.size = 100;

    self.ctx = ctx;

    self.gameWidth = width;
    self.gameHeight = height;

    self.positionX = self.gameWidth*0.8;
    self.positionY = self.gameWidth*0.3;
}


Enemy.prototype.draw = function () {
    var self = this;

    self.ctx.fillStyle = 'black';
    self.ctx.fillRect(self.positionX, self.positionY, self.size, self.size)
}

// self.ctx.fillRect(self.positionX - self.size, self.positionY - self.size, self.size, self.size)
