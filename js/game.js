function Game() {
    this.hero = null;
    this.monsters = [];
    this.playScreen = null;
    this.player = null;

    this.level = 0;

    this.spawnedMonsters = 0;

    this.score = 0;
    this.cooldownMonster=0;
};

Game.prototype.create = function create() {
    LOGGER.log("creating the game");

    this.player = new Player(PLAYER_NAME);
    this.playScreen = new PlayScreen();
    this.hero = new Hero();

    this.render();
};

Game.prototype.update = function update(modifier) {
    LOGGER.log("updating the game");
    //this.checkCollisions();
    this.cooldownMonster++;
    if(this.cooldownMonster>=MONSTER_SPAWN_COOLDOWN && this.spawnedMonsters < MONSTER_PER_WAVE[this.level]){
        this.spawnedMonsters++;
        this.cooldownMonster=0;
        var monster = new Monster();
        this.monsters.push(monster);
    }

    else if( this.spawnedMonsters==MONSTER_PER_WAVE[this.level] && !this.monsters[MONSTER_PER_WAVE[this.level] - 1].isVisible() ){
        this.spawnedMonsters=0;
        this.level++;
    }

    this.playScreen.update();
    this.hero.update(
        this.player.holdingUp(), this.player.holdingDown(), 
        this.player.holdingLeft(), this.player.holdingRight(), modifier);
    this.updateMonsters(modifier);
    this.render();
};

// Game.prototype.checkCollisions = function checkCollisions() {
//     if (this.hero.x <= (this.monster.x + 32)
//         && this.monster.x <= (this.hero.x + 32)
//         && this.hero.y <= (this.monster.y + 32)
//         && this.monster.y <= (this.hero.y + 32)) {

//         LOGGER.log("OMG A COLLISION !");
//         this.score++;
//         this.monster.die();
//         this.renderScore();
//     }
// };

Game.prototype.render = function render() {
    this.renderObject(this.playScreen);
    this.renderTable(this.monsters);
    this.renderObject(this.hero);
    this.renderScore();
};

Game.prototype.renderObject = function renderObject(renderable) {
    if (renderable.image != null) {
        CTX.drawImage(renderable.image, renderable.x, renderable.y);
    }
}; 

Game.prototype.renderScore = function renderScore() {
    CTX.fillStyle = SCORE_FILL_STYLE;
    CTX.font = SCORE_FONT;
    CTX.fillText("Wave : "+this.level+" - spawnedMonsters : "+this.spawnedMonsters, 32, 32);
};

Game.prototype.updateMonsters = function updateMonsters(modifier){
    for(var i=0; i < this.monsters.length; i++){
        this.monsters[i].update(modifier);
    }
}

Game.prototype.renderTable = function renderTable(objectTable){
    for(var i=0; i < objectTable.length; i++){
        this.renderObject(objectTable[i]);
    }
}