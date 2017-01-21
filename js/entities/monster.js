
function Monster() {
    this.image = null;
    this.imageRight = null;

    this.x = 0;
    this.y = 0;
    this.speed = MONSTER_BASE_SPEED;

    this.width = 38;
    this.height = 38;

    this.origin = null;

    this.pv = 1;
    this.isDead = false;
    this.colide = false;

    this.init();
};

Monster.prototype.init = function init() {
    LOGGER.log("creating monster");
    this.image = ASSET_LOADER.getImage("dolphin");
    this.imageRight = ASSET_LOADER.getImage("dolphin_right");

    this.defineOrigin();
    this.toRandomPosition();
    LOGGER.log("monster x : "+this.x+" y : "+this.y);
};

Monster.prototype.update = function update(modifier) {
    if (this.image === null) {
        this.image = ASSET_LOADER.getImage("dolphin");
    }

    if (this.imageRight === null){
        this.imageRight = ASSET_LOADER.getImage("dolphin_right");
    }

    if (this.pv < 1) {
        this.die();
    }

    this.checkCollisions();
    this.move(modifier);
};

Monster.prototype.move = function(modifier) {
    var velocity = this.speed * modifier;

    switch(this.origin){
        case TOP:
            this.y+=velocity;
            break;
        case BOTTOM:
            this.y-=velocity;
            break;
        case RIGHT:
            this.x-=velocity;
            break;
        default:
            this.x+=velocity;
            break;
    }
};

Monster.prototype.checkCollisions = function() {
    if (this.colide === false && GAME.hero.x <= (this.x + this.width)
        && this.x <= (GAME.hero.x + GAME.hero.width)
        && GAME.hero.y <= (this.y + this.height)
        && this.y <= (GAME.hero.y + GAME.hero.height)) {

        this.collide = true;
        GAME.hero.pv--;
        this.pv--;
        LOGGER.log("OMG A COLLISION !");
    }
};

Monster.prototype.die = function() {
    this.isDead = true;
}

Monster.prototype.defineOrigin = function defineOrigin(){
    this.origin = Math.floor( Math.random() * 4);
};

Monster.prototype.toRandomPosition = function toRandomPosition() {
    switch(this.origin){
        case TOP : 
            this.y =- this.height;
            this.x = Math.random() * (CANVAS_WIDTH - this.width);
            break;
        case BOTTOM:
            this.y = CANVAS_HEIGHT;
            this.x = Math.random() * (CANVAS_WIDTH - this.width);
            break;
        case RIGHT:
            this.x = CANVAS_WIDTH;
            this.y = Math.random() * (CANVAS_HEIGHT - this.height);
            break;
        default:
            this.x = -this.width;
            this.y = Math.random() * (CANVAS_HEIGHT - this.height);
            
    }
};

Monster.prototype.isVisible = function isVisible(){
    if( this.origin == BOTTOM && this.y< - this.height){
        return false;
    }
    else if(this.origin == TOP && this.y> CANVAS_HEIGHT){
        return false;
    }
    else if(this.origin == RIGHT && this.x< - this.width){
        return false;
    }
    else if(this.origin == LEFT && this.x > CANVAS_WIDTH){
        return false;
    }
    return true;
};
