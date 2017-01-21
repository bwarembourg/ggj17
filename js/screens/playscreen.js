function PlayScreen() {
    this.image = null;
    this.image1 = null;
    this.image2 = null;
    this.imageGameOver = null;
    this.imageTitleScreen = null;


    this.x = 0;
    this.y = 0;
    
    this.init();
};

PlayScreen.prototype.init = function init() {
    LOGGER.log("playscreen creation");
    this.image = ASSET_LOADER.getImage("background");
    this.image1 = ASSET_LOADER.getImage("background1");
    this.image2 = ASSET_LOADER.getImage("background2");
    this.imageGameOver = ASSET_LOADER.getImage("gameover");
    this.imageTitleScreen = ASSET_LOADER.getImage("titlescreen")
};

PlayScreen.prototype.update = function update() {
    if (this.image === null) {
        this.image = ASSET_LOADER.getImage("background");
    }
    if (this.image1 === null) {
        this.image1 = ASSET_LOADER.getImage("background1");
    }
    if (this.image2 === null){
        this.image2 = ASSET_LOADER.getImage("background2");
    }
    if (this.imageGameOver === null){
        this.imageGameOver = ASSET_LOADER.getImage("gameover");
    }
    if (this.imageTitleScreen === null){
        this.imageTitleScreen = ASSET_LOADER.getImage("titlescreen");
    }
}
