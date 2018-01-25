'use strict';

function Game(mainElement) {
    var self = this;

    self.mainElement = mainElement;

    self.finished = false;
    self.score = 0;
    self.width = window.innerWidth;
    self.height = window.innerHeight;

    self.gravity = 0.15;

    self.numberEnemies = 1;
    self.enemies = []

    // create dom elements'
    self.canvasElement = document.createElement('canvas');
    self.canvasElement.width = self.width;
    self.canvasElement.height = self.height;
    self.canvasElement.setAttribute('id', 'canvasElement');
    mainElement.appendChild(self.canvasElement);

    self.ctx = self.canvasElement.getContext('2d');

    self.chicken = new Chicken(self.ctx, self.width, self.height, self.gravity);

    //Chicken's movement commands
    self.handleKeyDown = function (event) {
       
        var key = event.key.toLowerCase();
        
        switch (key) {
            case 'w':
                self.chicken.trowingAngleHigher();
                break;
            case 's':
                self.chicken.trowingAngleLower();
                break;
            case 'a':
                self.chicken.trowingVelocityLower();
                break;
            case 'd':
                self.chicken.trowingVelocityHigher();
                break;
            case 'h':
                self.chicken.throw();
                break;
        }
    }

    document.addEventListener('keydown', self.handleKeyDown);
    
    
    for (var number=0; number<self.numberEnemies;number++) {
        self.enemies.push(new Enemy(self.ctx, self.width, self.height));
    }

    function doFrame() {
        
        self.chicken.update();
    
        self.ctx.clearRect(0, 0, self.width, self.height);
        self.chicken.draw();
        self.chicken.drawThrowLine ();
        self.drawEnemies();
        self.checkIfCollision();

        if (!self.finished) {
            window.requestAnimationFrame(doFrame);
        }
        
    }
    window.requestAnimationFrame(doFrame);

}


Game.prototype.checkIfCollision = function () {
    var self = this;   

    for (var i=0;i<self.numberEnemies;i++) {
    
        var cPosXd = self.chicken.positionX + self.chicken.size;
        var cPosXe = self.chicken.positionX;
        var cPosYc = self.chicken.positionY;
        var cPosYb = self.chicken.positionY + self.chicken.size;
        var ePosXd = self.enemies[i].positionX + self.enemies[i].size;
        var ePosXe = self.enemies[i].positionX;
        var ePosYc = self.enemies[i].positionY;
        var ePosYb = self.enemies[i].positionY + self.enemies[i].size;
    
        var collisionCondition1 = ((cPosXd > ePosXe && cPosXd < ePosXd) && ((cPosYc < ePosYb && cPosYc > ePosYc) || (cPosYb < ePosYb && cPosYb > ePosYc)));
        var collisionCondition2 = ((cPosXe > ePosXe && cPosXe < ePosXd) && ((cPosYc < ePosYb && cPosYc > ePosYc) || (cPosYb < ePosYb && cPosYb > ePosYc)));
        
        if (self.chicken.status === 'air'){
            if (collisionCondition1 || collisionCondition2) {
                console.log('its fucking colliding in the X axis bro!!!');
                self.chicken.status = 'finished';
            } else {
                console.log('at least its logging')
            }   
        }
}
}

Game.prototype.drawEnemies = function () {
    var self = this;
    self.enemies.forEach(function(enemy){
        enemy.draw()
    });
}



Game.prototype.destroy = function () {
    var self = this;
  
    self.finished = true;
  
    self.canvasElement.remove();
  
    document.removeEventListener('keydown', self.handleKeyDown);
};

// Game.propotype.onGameOver = function (callback) {
//     var self = this;

//     self.onEnded = callback;
// };