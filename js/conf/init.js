var init = function() {
    _initTools();
    _initCanvas();
    _manageCrossBrowser();
    _initGame();
};

var _initCanvas = function() {
    LOGGER.log("initializing the canvas");
    var canvas = document.createElement("canvas");
    CTX = canvas.getContext("2d");

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    document.body.appendChild(canvas);
    LOGGER.log("canvas created");
};

var _initGame = function() {
    GAME = new Game(CTX);
    GAME.create();
};

var _initTools = function() {
    LOGGER = new Logger();
    ASSET_LOADER = new AssetLoader();
    ASSET_LOADER.load();
};

var _manageCrossBrowser = function() {
    var w = window;
    requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || 
        w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
};