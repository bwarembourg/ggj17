function Hero() {
    this.speed = HERO_BASE_SPEED; // movement in pixels per second
    this.x = 0;
    this.y = 0;
    this.pv = HERO_BASE_PV;
    this.collide = false;

    this.width = 32;
    this.height = 32;

    this.image = null;
    this.init();
};

Hero.prototype.init = 
function init() {
    LOGGER.log("hero creation");

    this.image = ASSET_LOADER.getImage("hero");
    this.x = CANVAS_WIDTH / 2;
    this.y = CANVAS_HEIGHT / 2;
};

Hero.prototype.update = 
function update(playerHoldingUp, playerHoldingDown, playerHoldingLeft, playerHoldingRight, playerHoldingFire, modifier) {
    if (this.pv < 1) {
        LOGGER.log("GAME OVER YO")
    }

    if (this.image === null) {
        this.image = ASSET_LOADER.getImage("hero");
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
    }
    if (playerHoldingDown && this.y<CANVAS_HEIGHT - this.height) {
        this.y += velocity;
    }
    if (playerHoldingLeft && this.x>0) {
        this.x -= velocity;
    }
    if (playerHoldingRight && this.x<CANVAS_WIDTH - this.width) {
        this.x += velocity;
    }
};

Hero.prototype.attack = 
function(playerHoldingFire) {
    if (playerHoldingFire) {
        LOGGER.log("ATTACK !");
    }
};
