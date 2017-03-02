var canvas;
var HEIGHT = 600;
var WIDTH = 900;
var FPS = 10;

// Lily pads
var LILYPAD_Y = Math.floor(5 * HEIGHT / 6);
var LILYPAD_WIDTH = 50;
var LILYPAD_HEIGHT = Math.floor(LILYPAD_WIDTH/3);
console.log("HEIGHT " + LILYPAD_HEIGHT); 
var LILYPAD_COLOR;
var lilyPadsInfo = {
    selected : null,
};

// Frogs
var FROG_IMAGE;
var FROG_SIZE = 30;

// Colors
var BG_COLOR;

// Elements
var padSlider;
var padSliderValue; // Used to determine if #pads has changed.
var lilyPads = [];

function preload() {
    FROG_IMAGE = loadImage('assets/green-frog.png');
}

function setup() {
    canvas = createCanvas(WIDTH, HEIGHT);

    // Define colors
    BG_COLOR = color(200, 200, 255);
    LILYPAD_COLOR = color(200, 255, 200);

    background(BG_COLOR);
    frameRate(FPS);
    textSize(28);
    
    // Create slider for the number of lilypads.
    padSlider = {
        maxPads : 15,
        slider : createSlider(2, 10, 5),
        draw : function() {
            text("Number of lilypads: " + this.slider.value(), 
                 this.slider.x * 2 + this.slider.width, 
                 this.slider.y+15);
        }
    };
    padSlider.slider.position(20, 20);
    initLayout();
}

function draw() {
    // If the number of pads has changed, reinit. the structrue.
    if (padSlider.slider.value() != padSliderValue) {
        initLayout();
    }
    background(BG_COLOR);
    padSlider.draw();  
    for (var i = 0; i < lilyPads.length; i++) {
        lilyPads[i].draw();
    }
}

function initLayout() {
    var nPads = padSlider.slider.value();
    lilyPads = [];
    for (var i = 0; i < nPads; i++) {
        var lilyPad = new LilyPad(i, 
                                  lilyPadsInfo, 
                                  (i+1)*LILYPAD_WIDTH + i*40, 
                                  LILYPAD_Y, 
                                  LILYPAD_WIDTH,
                                  LILYPAD_HEIGHT, 
                                  LILYPAD_COLOR);
        lilyPad.setFrogs(1);
        lilyPads.push(lilyPad);
    }
    padSliderValue = nPads;
    console.log(lilyPads);
}

function keyPressed() {
}

function mouseClicked() {
    for (var i = 0; i < lilyPads.length; i++) {
        lilyPads[i].clicked();
    }
}
