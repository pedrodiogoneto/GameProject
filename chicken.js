'use strict';

function Chicken(ctx, width, height, gravity) {
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
    
    self.angle = 0.7; //radianos (0 a pi)!
    
    self.acceleration = gravity;
 
}

Chicken.prototype.throw = function() {
    var self = this; 

    self.status = 'air';
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

Chicken.prototype.updateVelocityByAngle = function (angle, velocityX, velocityY) {
    var self = this;
    self.velocityXAngle = self.velocityX * Math.cos(self.angle);
    self.velocityYAngle = self.velocityY * Math.sin(self.angle);
}

Chicken.prototype.trowingAngleHigher = function() {
    var self = this;

    self.angle += 0.1;
    self.updateVelocityByAngle(self.angle, self.velocityX,self.velocityY)

    console.log('New Angle: ' + self.angle);
}

Chicken.prototype.trowingAngleLower = function() {
    var self = this;

    self.angle -= 0.1;
    self.updateVelocityByAngle(self.angle, self.velocityX,self.velocityY)
    
    console.log('New Angle: ' + self.angle);
}

Chicken.prototype.trowingVelocityHigher = function() {
    var self = this;

    self.velocityX += 1; 
    self.velocityY -= 1; 
    self.updateVelocityByAngle(self.angle, self.velocityX,self.velocityY)
    
    console.log('New X velocity: ' + self.velocityX);
    console.log('New Y velocity: ' + self.velocityY);

}

Chicken.prototype.trowingVelocityLower = function() {
    var self = this;

    self.velocityX -= 1; 
    self.velocityY += 1; 
    self.updateVelocityByAngle(self.angle, self.velocityX,self.velocityY)
    
    console.log('New X velocity: ' + self.velocityX);
    console.log('New Y velocity: ' + self.velocityY);
}

Chicken.prototype.draw = function () {
    var self = this;

    self.ctx.fillStyle = 'black';
    self.ctx.fillRect(self.positionX - self.size/2, self.positionY - self.size/2, self.size, self.size)
}

//self.ctx.fillRect(self.positionX - self.size/2, self.positionY - self.size/2, self.size, self.size)

Chicken.prototype.drawThrowLine = function (angle, velocityX, velocityY, ctx) {
    var self = this;

    if (self.status === 'previous') {
        self.ctx.beginPath(); 
        self.ctx.lineWidth="5";
        self.ctx.strokeStyle="black"; 
        self.ctx.moveTo(self.positionX, self.positionY);
        self.ctx.lineTo(self.positionX + (self.velocityX * Math.cos(self.angle))*10 , self.positionY - (self.velocityY * Math.sin(self.angle))*(-1)*10);
        self.ctx.stroke(); 
    } else {
        self.ctx.clearRect(self.positionX, self.positionY, self.positionX + (self.velocityX * Math.cos(self.angle))*10, self.positionY - (self.velocityY * Math.sin(self.angle))*(-1)*10);
    }
}



