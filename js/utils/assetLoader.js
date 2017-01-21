function AssetLoader() {
    this.images = [];
    this.ready = false;
};

AssetLoader.prototype.load = function load() {
    LOGGER.log("loading assets");

    this._loadImage("monster", "resources/img/monster.png");
    this._loadImage("hero", "resources/img/hero.png");
    this._loadImage("biker", "resources/img/biker.png");
    this._loadImage("dolphin", "resources/img/dolphin.png");
    this._loadImage("background", "resources/img/background.jpg");
    this._loadImage("background1", "resources/img/background1.png");
    this._loadImage("background2", "resources/img/background2.png");
};

AssetLoader.prototype.getImage = function getImage(name) {
    LOGGER.log("fetching " + name + " image...");
    LOGGER.log("found " + this.images[name]);
    return this.images[name];
};

AssetLoader.prototype._loadImage = function loadImage(name, src) {
    var img = new Image();
    img.src = src;

    var me = this;
    img.onload = function() {
        me.images[name] = img;
    };

    this.images[name] = null;
};
    
