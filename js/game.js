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
};

Game.prototype.create = function create() {
    LOGGER.log("creating the game");

    this.player = new Player(PLAYER_NAME);
    this.playScreen = new PlayScreen();
    this.hero = new Hero();

    this.render();
};

Game.prototype.update = function update(modifier) {
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

    this.playScreen.update();
    this.hero.update(
        this.player.holdingUp(), this.player.holdingDown(), 
        this.player.holdingLeft(), this.player.holdingRight(), this.player.holdingFire(), modifier);
    this.updateMonsters(modifier);
    this.render();
};

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
    CTX.fillText("Wave : "+this.level+ " - score : " + this.score + " - pv : " + this.hero.pv + "/" + HERO_BASE_PV, 32, 32);
};

Game.prototype.updateMonsters = function updateMonsters(modifier){

    var collisionDetected =false;
    var monsterCollidingIndex = null;

    for(var i=0; i < this.monsters.length; i++){
        this.monsters[i].update(modifier);

        if(this.monsters[i].collide){
            collisionDetected=true;
            monsterCollidingIndex = i;
        }
    }

    if(collisionDetected){
        this.collidedMonsters++;
        this.monsters.splice(monsterCollidingIndex, 1);
    }
};

Game.prototype.renderTable = function renderTable(objectTable){
    for(var i=0; i < objectTable.length; i++){
        this.renderObject(objectTable[i]);
    }
};