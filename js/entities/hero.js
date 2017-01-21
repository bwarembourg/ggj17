function Hero() {
    this.speed = HERO_BASE_SPEED; // movement in pixels per second
    this.x = 0;
    this.y = 0;
    this.pv = HERO_BASE_PV;
    this.collide = false;
    this.direction = BOTTOM;

    this.width = 65;
    this.height = 46;

    this.hitboxMargin = 15;
    this.widthHitbox = 32;
    this.heightHitbox = 32;

    this.image = null;
    this.init();
};

Hero.prototype.init = 
function init() {
    LOGGER.log("hero creation");

    this.image = ASSET_LOADER.getImage("biker");
    this.x = CANVAS_WIDTH / 2;
    this.y = CANVAS_HEIGHT / 2;
};

Hero.prototype.update = 
function update(playerHoldingUp, playerHoldingDown, playerHoldingLeft, playerHoldingRight, playerHoldingFire, modifier) {
    if (this.pv < 1) {
        LOGGER.log("GAME OVER YO")
    }

    if (this.image === null) {
        this.image = ASSET_LOADER.getImage("biker");
    }

    this.move(playerHoldingUp, playerHoldingDown, playerHoldingLeft, playerHoldingRight, modifier);
    this.attack(playerHoldingFire);
    this.collide = false;
};

Hero.prototype.move = 
function move(playerHoldingUp, playerHoldingDown, playerHoldingLeft, playerHoldingRight, modifier) {
    var velocity = this.speed * modifier;

    if (playerHoldingUp && this.y>0) {
        this.y -= velocity;
        this.direction = TOP;
    }
    if (playerHoldingDown && this.y<CANVAS_HEIGHT - this.height) {
        this.y += velocity;
        this.direction = BOTTOM;
    }
    if (playerHoldingLeft && this.x>0) {
        this.x -= velocity;
        this.direction = LEFT;
    }
    if (playerHoldingRight && this.x<CANVAS_WIDTH - this.width) {
        this.x += velocity;
        this.direction = RIGHT;
    }
};

Hero.prototype.attack = 
function(playerHoldingFire) {
    if (playerHoldingFire) {
        LOGGER.log("ATTACK ! "+this.direction);

        var xHit = null;
        var yHit = null
        switch(this.direction){
            case TOP:
                xHit = this.x;
                yHit = this.y - this.heightHitbox;
                break;
            case BOTTOM:
                xHit = this.x;
                yHit = this.y + this.height + this.heightHitbox;
                break;
            case RIGHT:
                xHit = this.x + this.width;
                yHit = this.y;
                break;
            case LEFT:
                xHit = this.x - this.widthHitbox;
                yHit = this.y;
                break;
        }
        var monsters = GAME.monsters;
        for(var i=0; i< monsters.length; i++){
            if( xHit <= (monsters[i].x + monsters[i].width)
                && monsters[i].x <= (xHit + this.widthHitbox)
                && yHit <= (monsters[i].y + monsters[i].height)
                && monsters[i].y <= (yHit + this.heightHitbox) ){
                GAME.monsters[i].pv--;
                LOGGER.log("WOO U KILLED MONSTER "+i);
            }
        }
    }
};
