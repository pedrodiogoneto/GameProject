'use strict';

function Player(ctx, width, height) {
  var self = this;

  self.size = 100;

  self.ctx = ctx;

  self.gameWidth = width;
  self.gameHeight = height;

  self.x = self.gameWidth / 2;
  self.y = self.gameHeight;
}

Player.prototype.setDirection = function (direction) {
    var self = this;
    self.direction = direction;
}

Player.prototype.update = function() {
    var self = this;
  
      switch (self.direction) {
        case 'UP':
          self.y += 10;
          break;
      }
  }

Player.prototype.draw = function () {
    var self = this;
  
    self.ctx.fillStyle = 'green';
    self.ctx.fillRect(self.x - self.size/2, self.y - self.size/2, self.size, self.size);
  }