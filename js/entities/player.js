function Player(name) {
    this.name = name;
    this.keysDown = {};

    this.init();
};

Player.prototype.init = function init() {
    LOGGER.log("creating player");
    var me = this;

    addEventListener("keydown", function (e) {
        me.keysDown[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function (e) {
        delete me.keysDown[e.keyCode];
    }, false);
};

Player.prototype.holdingUp = function holdingUp() {
    return 38 in this.keysDown;
};
Player.prototype.holdingDown = function holdingDown() {
    return 40 in this.keysDown;
};
Player.prototype.holdingLeft = function holdingLeft() {
    return 37 in this.keysDown;
};
Player.prototype.holdingRight = function holdingRight() {
    return 39 in this.keysDown;
};


