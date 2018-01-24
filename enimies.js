'use strict';

function Enimies (ctx, width, height) {
    var self = this;

    self.size = 200;

    self.ctx = ctx;

    self.gameWidth = width;
    self.gameHeight = height;

    self.positionX = self.gameWidth * 0.5;
    self.positionY = self.gameWidth * 0.5;
}


Enimies.prototype.draw = function () {
    var self = this;

    self.ctx.fillStyle = 'black';
    self.ctx.fillRect(self.positionX - self.size, self.positionY - self.size, self.size, self.size)
}

