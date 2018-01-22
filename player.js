'use strict';

function Player(ctx, width, height) {
  var self = this;

  self.size = 50;

  self.ctx = ctx;

  self.gameWidth = width;
  self.gameHeight = height;

  self.x = self.gameWidth / 10;
  self.y = self.gameHeight - self.size;

  self.gravity = -0.2;  


}


Player.prototype.update = function(key) {
  var self = this;

  //var jump = setInterval(function () {self.y = self.gameWidth / 10 + jumpVelocity},50);

  // var jumpVelocity = 5;
  // var gravity = -0.2;  

  switch (key) {
    case 'w':
      self.y -= self.gameHeight / 10; 
      break;
    case 's':
      self.y += self.gameHeight / 10; 
      break;
    case 'a':
      self.x -= self.gameWidth / 10; 
      break;
    case 'd':
      self.x += self.gameWidth / 10; 
      break;
  }
  
  if (self.x > self.gameWidth) {
    self.x = self.gameWidth;
  }

  if (self.x < 0) {
    self.x = 0;
  }

  if (self.y > self.gameHeight) {
    self.y = self.gameHeight;
  }

  if (self.y < 0) {
    self.y = 0;
  }
}


Player.prototype.draw = function () {
    var self = this;
  
    self.ctx.fillStyle = 'black';
    self.ctx.fillRect(self.x - self.size/2, self.y - self.size/2, self.size, self.size);
}

Player.prototype.jump = function (key) {
  var self = this;
  self.gravity = setInterval(function (){return self.y += 10},5);  
  self.jump1;
  var ySpeed = 5;
  //var time = setInterval(function () {return self.y = self.y + ySpeed},50);

  if (key === 'm') {
    self.y -=300;
  }
}

Player.prototype.finishJump = function () {
  var self = this;
  clearInterval(self.gravity);
}