function Hero() {
    this.speed = HERO_BASE_SPEED; // movement in pixels per second
    this.x = 0;
    this.y = 0;

    this.pv = 1;

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
function update(playerHoldingUp, playerHoldingDown, playerHoldingLeft, playerHoldingRight, modifier) {  
    if (this.image === null) {
        this.image = ASSET_LOADER.getImage("hero");
    }

    var velocity = this.speed * modifier;

    if (playerHoldingUp) {
        this.y -= velocity;
    }
    if (playerHoldingDown) {
        this.y += velocity;
    }
    if (playerHoldingLeft) {
        this.x -= velocity;
    }
    if (playerHoldingRight) {
        this.x += velocity;
    }
};

