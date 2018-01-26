'use strict';

function Game(mainElement) {
    var self = this;

    self.mainElement = mainElement;

    self.finished = false;
    self.score = 0;
    self.width = window.innerWidth;
    self.height = window.innerHeight;
    self.gravity = 0.15;

    self.numberEnemies = 5;
    self.enemies = []
    self.numberEnemiesCollided = [];

    self.chickenLives = self.numberEnemies + 2;
    self.chickeEnemyCollision = false;

    self.onEnded;
    self.onWinned;

    // create dom elements'
    self.canvasElement = document.createElement('canvas');
    self.canvasElement.width = self.width;
    self.canvasElement.height = self.height;
    self.canvasElement.setAttribute('id', 'canvasElement');
    mainElement.appendChild(self.canvasElement);
    
    self.gameMusic = document.createElement('audio');
    self.gameMusic.setAttribute('src', './audio/backmusic.mp3');
    self.gameMusic.setAttribute('autoplay','true');
    self.canvasElement.appendChild(self.gameMusic);

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
        self.chickenLives;


        // self.resultOfTrow();


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
        var floor = self.height;
    
        var collisionCondition1 = ((cPosXd > ePosXe && cPosXd < ePosXd) && ((cPosYc < ePosYb && cPosYc > ePosYc) || (cPosYb < ePosYb && cPosYb > ePosYc)));
        var collisionCondition2 = ((cPosXe > ePosXe && cPosXe < ePosXd) && ((cPosYc < ePosYb && cPosYc > ePosYc) || (cPosYb < ePosYb && cPosYb > ePosYc)));
        var collisionCondition3 = cPosYb > (floor-1);

        if (self.chicken.status === 'air'){
            if (collisionCondition1 || collisionCondition2) {
                console.log('its fucking colliding in the X axis bro!!!');
                self.chicken.status = 'finished';
                self.chicken.chickeEnemyCollision = true;
                self.enemyIndexCollided = i;
                self.enemies[i].setCollided();
                self.resultOfTrow();
                self.score += 10;

            } else if (collisionCondition3) {
                console.log('its fucking colliding with the flooor bro!!!');
                self.chicken.status = 'finished';
                self.chicken.chickeEnemyCollision = false;
                self.resultOfTrow();
                self.score -= 5;

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
    self.updateNumberEnemiesCollided();

    if (self.chicken.status === 'finished' && self.chickenLives > 0 && (self.numberEnemiesCollided.length === self.enemies.length)) {
        self.onWinned();
    } else if (self.chicken.status === 'finished' && self.chickenLives > 0 && self.numberEnemiesCollided.length < self.enemies.length) {
        self.chickenLives -= 1;
        setTimeout(function(){self.chicken = new Chicken(self.ctx, self.width, self.height, self.gravity, self.chickeEnemyCollision)},1000);
    } else if (self.chicken.status === 'finished' && self.chickenLives < 1 && self.numberEnemiesCollided.length < self.enemies.length) {
        self.chickenLives -= 1;
        self.onEnded();
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

Game.prototype.onGameOver = function (callback) {
    var self = this;

    self.onEnded = callback;
};

Game.prototype.onGameWin = function (callback) {
    var self = this;

    self.onWinned = callback;
};

Game.prototype.updateNumberEnemiesCollided = function () {
    var self = this;

    for (var i=0;i<self.enemies.length;i++) {
        if (self.enemies[i].collided) {
            if (self.numberEnemiesCollided.indexOf(i)<0) {
                self.numberEnemiesCollided.push(i);
            }
        }
    }
};
