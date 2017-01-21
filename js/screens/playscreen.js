function PlayScreen() {
    this.image = null;
    this.x = 0;
    this.y = 0;
    
    this.init();
};

PlayScreen.prototype.init = function init() {
    LOGGER.log("playscreen creation");
    this.image = ASSET_LOADER.getImage("background");
};

PlayScreen.prototype.update = function update() {
    if (this.image === null) {
        this.image = ASSET_LOADER.getImage("background");
    }
}
