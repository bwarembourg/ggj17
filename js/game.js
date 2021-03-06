function Game() {
    this.hero = null;
    this.monsters = [];
    this.playScreen = null;
    this.player = null;

    this.level = 0;

    this.spawnedMonsters = 0;

    this.score = 0;
    this.collidedMonsters = 0;
    this.cooldownMonster=0;

    this.counterSpriteFrame=0;
    this.attackCounter=0;
    this.counterFrameBg=0;
    this.backgroundDirection=LEFT;
    this.backgroundX = 0;
 
    this.gameState = TITLE_SCREEN;
};

Game.prototype.create = function create() {
    LOGGER.log("creating the game");

    this.player = new Player(PLAYER_NAME);
    this.playScreen = new PlayScreen();
    this.hero = new Hero();

    this.render();
};

Game.prototype.update = function update(modifier) {
    this.playScreen.update();

    if(this.gameState == TITLE_SCREEN){
        if(this.player.holdingFire()){
            this.level=0;
            this.hero.pv=5;
            this.gameState = GAME_ON;
        }
    }
    else if(this.gameState == GAME_OVER){
        if(this.player.holdingFire()){
            this.gameState = TITLE_SCREEN;
        }
    }
    else if(this.gameState == GAME_ON){        
        this.cooldownMonster++;
        if(this.cooldownMonster>=MONSTER_SPAWN_COOLDOWN && this.spawnedMonsters < MONSTER_PER_WAVE[this.level]){
            this.spawnedMonsters++;
            this.cooldownMonster=0;
            var monster = new Monster();
            this.monsters.push(monster);
        }

        else if( this.spawnedMonsters==MONSTER_PER_WAVE[this.level] && !this.monsters[MONSTER_PER_WAVE[this.level] - this.collidedMonsters - 1].isVisible() ){
            this.spawnedMonsters=0;
            this.collidedMonsters=0;
            this.level++;
            this.monsters = [];
        }

        this.hero.update(
            this.player.holdingUp(), this.player.holdingDown(), 
            this.player.holdingLeft(), this.player.holdingRight(), this.player.holdingFire(), modifier);
        this.updateMonsters(modifier);
    }
    this.render();
};

Game.prototype.render = function render() {

    if(this.gameState == TITLE_SCREEN){
        LOGGER.log("title");
        this.renderTitleScreen(this.playScreen);
    }
    else if(this.gameState == GAME_OVER){
        this.renderGameOver(this.playScreen);
    }
    else if(this.gameState == GAME_ON){
        this.renderBackground(this.playScreen);
        this.renderTable(this.monsters);
        this.renderAnimation(this.hero, 3);
        this.renderScore();
    }
};

Game.prototype.renderGameOver = function renderGameOver(renderable){
    if(renderable.imageGameOver != null){
        CTX.drawImage(renderable.imageGameOver, renderable.x, renderable.y);
    }
}

Game.prototype.renderTitleScreen = function renderTitleScreen(renderable){
    if(renderable.imageTitleScreen != null){
        LOGGER.log("render title...")
        CTX.drawImage(renderable.imageTitleScreen, renderable.x, renderable.y);
    }
}

Game.prototype.renderObject = function renderObject(renderable) {
    if (renderable.image != null && renderable.imageRight != null) {
        if(renderable.origin == LEFT || renderable.origin == TOP)
            CTX.drawImage(renderable.image, renderable.x, renderable.y);
        else
            CTX.drawImage(renderable.imageRight, renderable.x, renderable.y);

    }
}; 

Game.prototype.renderAnimation = function renderAnimation(renderable, nbFrame){
    if(renderable.hitting){
        this.attackCounter++

        if(this.attackCounter>ANIMATION_HIT_SPEED*nbFrame){
            this.attackCounter=0;
            renderable.hitting=false;
        }
        for(var i=0; i<nbFrame; i++){
            if(this.attackCounter > ANIMATION_HIT_SPEED*i && this.attackCounter <= ANIMATION_HIT_SPEED*(i+1)){
                if (renderable.image != null) {
                    if(renderable.direction==RIGHT)
                        CTX.drawImage(renderable.imageHitRight, renderable.width*i, 0, renderable.width, renderable.height, renderable.x, renderable.y, renderable.width, renderable.height);
                    else
                        CTX.drawImage(renderable.imageHit, renderable.width*i, 0, renderable.width, renderable.height, renderable.x, renderable.y, renderable.width, renderable.height);
                }
            }        
        }

    }
    else{
        this.counterSpriteFrame++;
        
        if(this.counterSpriteFrame> ANIMATION_SPEED*nbFrame){
            this.counterSpriteFrame=0;
        }

        for(var i=0; i<nbFrame; i++){
            if(this.counterSpriteFrame > ANIMATION_SPEED*i && this.counterSpriteFrame <= ANIMATION_SPEED*(i+1)){
                if (renderable.image != null) {
                    if(renderable.direction==RIGHT)
                        CTX.drawImage(renderable.imageRight, renderable.width*i, 0, renderable.width, renderable.height, renderable.x, renderable.y, renderable.width, renderable.height);
                    else
                        CTX.drawImage(renderable.image, renderable.width*i, 0, renderable.width, renderable.height, renderable.x, renderable.y, renderable.width, renderable.height);
                }
            }        
        }
    }
}

Game.prototype.renderBackground = function renderBackground(renderable){
    if(renderable.image != null && renderable.image1 != null && renderable.image2){
        this.counterFrameBg++;

        if(this.backgroundDirection==LEFT){
            var direction = -1;
        }
        else{
            var direction = 1;
        }

        this.backgroundX += direction;
        if(this.backgroundX<=-300){
            this.backgroundDirection= RIGHT;
            this.counterFrameBg=0;
        }
        else if(this.backgroundX>0){
            this.backgroundDirection = LEFT;
            this.counterFrameBg=0;
        }
        CTX.drawImage(renderable.image, renderable.x, renderable.y);
        CTX.drawImage(renderable.image1, this.backgroundX, renderable.y);
        CTX.drawImage(renderable.image2, renderable.x, renderable.y);
    }
}

Game.prototype.renderScore = function renderScore() {
    CTX.fillStyle = SCORE_FILL_STYLE;
    CTX.font = SCORE_FONT;
    CTX.fillText("Wave : "+this.level+ " - score : " + this.score + " - pv : " + this.hero.pv + "/" + HERO_BASE_PV, 32, 32);
};

Game.prototype.updateMonsters = function updateMonsters(modifier){

    var collisionDetected =false;
    var killDetected = false;
    var monsterCollidingIndex = null;
    var monsterKilledIndex = null;

    for(var i=0; i < this.monsters.length; i++){
        this.monsters[i].update(modifier);

        if(this.monsters[i].collide){
            collisionDetected=true;
            monsterCollidingIndex = i;
        }

        if(this.monsters[i].isDead){
            killDetected = true;
            monsterKilledIndex = i;
        }
    }

    if(collisionDetected){
        this.collidedMonsters++;
        this.monsters.splice(monsterCollidingIndex, 1);
    }

    if(killDetected){
        this.collidedMonsters++;
        this.monsters.splice(monsterKilledIndex, 1);
        this.score++;
    }
};

Game.prototype.renderTable = function renderTable(objectTable){
    for(var i=0; i < objectTable.length; i++){
        this.renderObject(objectTable[i]);
    }
};