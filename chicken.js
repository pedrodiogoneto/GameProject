'use strict';

var MAGIC_NUMBER = 10;
var RANDOMNESS = 10;

function Chicken(ctx, width, height, gravity, chickeEnemyCollision) {
    var self = this;

    self.size = 50;

    self.ctx = ctx;

    self.gameWidth = width;
    self.gameHeight = height;

    //status: previous -> air -> finished
    self.status = 'previous'

    self.baselineY = self.gameHeight - self.size;
    self.positionX = self.gameWidth / 10;
    self.positionY = self.baselineY;
    
    self.velocityX = 15;
    self.velocityY = -15; 
    
    self.angle = 0.5; //radianos (0 a pi)!

    self.updateVelocityByAngle();
    
    self.acceleration = gravity;

    self.chickeEnemyCollision = false;
    self.thrownAt = null;
}

Chicken.prototype.throw = function() {
    var self = this; 

    self.status = 'air';
    self.thrownAt = Date.now();
};

Chicken.prototype.update = function() {
    var self = this;

    if (self.status === 'air') {
     
        if (self.positionY <= self.baselineY) { 
            self.velocityYAngle = self.velocityYAngle + self.acceleration;
            self.positionX = self.positionX + self.velocityXAngle;
            self.positionY = self.positionY + self.velocityYAngle;
            console.log(self.positionX, self.positionY);
        } else {
            self.status = 'finished';
            self.positionY = self.positionY;
        }
    }
}

Chicken.prototype.updateVelocityByAngle = function () {
    var self = this;
    self.velocityXAngle = self.velocityX * Math.cos(self.angle);
    self.velocityYAngle = self.velocityY * Math.sin(self.angle);
}

Chicken.prototype.trowingAngleHigher = function() {
    var self = this;

    self.angle += 0.05;
    self.updateVelocityByAngle();

    console.log('New Angle: ' + self.angle);
}

Chicken.prototype.trowingAngleLower = function() {
    var self = this;

    self.angle -= 0.05;
    self.updateVelocityByAngle();
    
    console.log('New Angle: ' + self.angle);
}

Chicken.prototype.trowingVelocityHigher = function() {
    var self = this;

    self.velocityX += 1; 
    self.velocityY -= 1; 
    self.updateVelocityByAngle();
    
    console.log('New X velocity: ' + self.velocityX);
    console.log('New Y velocity: ' + self.velocityY);

}

Chicken.prototype.trowingVelocityLower = function() {
    var self = this;

    self.velocityX -= 1; 
    self.velocityY += 1; 
    self.updateVelocityByAngle();
    
    console.log('New X velocity: ' + self.velocityX);
    console.log('New Y velocity: ' + self.velocityY);
}

Chicken.prototype.draw = function () {
    var self = this;
    if (self.status === 'previous') {
        self.ctx.beginPath(); 
        self.ctx.lineWidth="5";
        self.ctx.strokeStyle="black"; 
        self.ctx.moveTo(self.positionX + self.size/2, self.positionY + self.size/2);
        self.ctx.lineTo(self.positionX + (self.velocityX * Math.cos(self.angle))*5 , self.positionY - (self.velocityY * Math.sin(self.angle))*(-1)*5);
        self.ctx.stroke(); 
    }
    else if (self.status === 'air') {
        var delta = Date.now() - self.thrownAt;
        var upTo = MAGIC_NUMBER * delta/ 500;
        for (var ix = 0; ix < upTo; ix++) {
            var scaleUp = ix / upTo;
            var scaleDown = 1 - scaleUp;
            var red = Math.round(scaleDown * 255); 
            var green = Math.round(scaleUp * 255);
            var blue = Math.round(scaleUp * 255);
            var alpha = scaleDown;
            var color = 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
            self.ctx.fillStyle = color;
            var size = self.size * scaleDown;
            var x = self.positionX - self.velocityXAngle * ix + Math.random() * RANDOMNESS - RANDOMNESS/2;
            var y = self.positionY - self.velocityYAngle * ix + Math.random() * RANDOMNESS - RANDOMNESS/2;
            self.ctx.fillRect(x, y, size, size);
        }
    }
    self.image = new Image();
    self.image.src = './img/chicken.png';
    self.ctx.drawImage(self.image, self.positionX, self.positionY, self.size, self.size);

    // //auxiliar black square draw
    // self.ctx.fillStyle = 'black';
    // self.ctx.fillRect(self.positionX, self.positionY, self.size, self.size);
}


Chicken.prototype.setChickeEnemyCollision = function () {
    var self = this;
    self.chickeEnemyCollision = false;
}

// Chicken.prototype.drawPlayerChicken = function () {
//     var self = this;
//     var chicken = new Image(self.size,self.size);
//     self.image.onload = drawImageActualSize;
//     self.chicken.src = './img/chicken.png';
//     self.ctx.drawImage(self, 0, 0)
// }