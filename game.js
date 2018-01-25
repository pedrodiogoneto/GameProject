'use strict';

function Game(mainElement) {
    var self = this;

    self.mainElement = mainElement;

    self.finished = false;
    self.score = 0;
    self.width = window.innerWidth;
    self.height = window.innerHeight;
    self.gravity = 0.15;

    self.numberEnemies = 3;
    self.enemies = []

    self.chickenLives = 5;
    self.chickeEnemyCollision = false;

    // create dom elements'
    self.canvasElement = document.createElement('canvas');
    self.canvasElement.width = self.width;
    self.canvasElement.height = self.height;
    self.canvasElement.setAttribute('id', 'canvasElement');
    mainElement.appendChild(self.canvasElement);

    self.ctx = self.canvasElement.getContext('2d');

    self.chicken = new Chicken(self.ctx, self.width, self.height, self.gravity, self.chickeEnemyCollision);

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
        self.drawEnemies();
        self.checkIfCollision();
        self.purgeEnemies();

        self.resultOfTrow();


        if (!self.finished) {
            window.requestAnimationFrame(doFrame);
        }
        
    }
    window.requestAnimationFrame(doFrame);

}


Game.prototype.checkIfCollision = function () {
    var self = this;   

    for (var i=0;i<self.enemies.length;i++) {

        if (self.enemies[i].collided) {
            continue;
        }
    
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
                self.chicken.chickeEnemyCollision = true;
                self.enemyIndexCollided = i;
                self.enemies[i].setCollided();
            } else {
                console.log('at least its logging')
            }
        }
    }
}

Game.prototype.purgeEnemies = function () {
    var self = this;

    self.enemies = self.enemies.filter(function (enemy) {
        return !enemy.done;
    });
};

Game.prototype.resultOfTrow = function () {
    var self = this;

    if (self.chicken.status === 'finished' && self.chickeEnemyCollision === true && self.chickenLives > 0 && self.enemies.length < 1) {
        setTimeout(self.main.buildSplash(),1000);
    } else if (self.chicken.status === 'finished' && self.chickeEnemyCollision === true && self.chickenLives > 0 && self.enemies.length >= 1) {
        self.enemies.splice(self.enemyIndexCollided);
        self.chickenLives -= 1;
        setTimeout(function(){self.chicken = new Chicken(self.ctx, self.width, self.height, self.gravity, self.chickeEnemyCollision)},1000);
    } else if (self.chicken.status === 'finished' && self.chickeEnemyCollision === false && self.chickenLives > 0 && self.enemies.length >= 1) {
        self.chickenLives -= 1;
        setTimeout(function(){self.chicken = new Chicken(self.ctx, self.width, self.height, self.gravity, self.chickeEnemyCollision)},1000);
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