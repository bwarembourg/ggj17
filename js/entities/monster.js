
function Monster() {
    this.image = null;
    this.x = 0;
    this.y = 0;
    this.speed = MONSTER_BASE_SPEED;

    this.width = 32;
    this.height = 32;

    this.origin = null;

    this.pv = 1;
    this.isDead = true;
    this.colide = false;

    this.init();
};

Monster.prototype.init = function init() {
    LOGGER.log("creating monster");
    this.image = ASSET_LOADER.getImage("monster");
    this.defineOrigin();
    this.toRandomPosition();
    LOGGER.log("monster x : "+this.x+" y : "+this.y);
};

Monster.prototype.update = function update(modifier) {
    if (this.image === null) {
        this.image = ASSET_LOADER.getImage("monster");
    }

    if (!this.isVisible || this.pv < 1) {
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
    if (this.colide === false && GAME.hero.x <= (this.x + 32)
        && this.x <= (GAME.hero.x + 32)
        && GAME.hero.y <= (this.y + 32)
        && this.y <= (GAME.hero.y + 32)) {

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
