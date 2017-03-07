var canvas;
var canvasHolderElement;
var HEIGHT;
var WIDTH;
var FPS = 10;

// Lily pads
var LILYPAD_Y;
var LILYPAD_WIDTH;
var LILYPAD_HEIGHT;
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
    canvasHolderElement = select('#p5canvas');
    WIDTH = canvasHolderElement.width;
    HEIGHT = canvasHolderElement.height;

    // Size parameters


    canvas = createCanvas(WIDTH, HEIGHT);
    canvas.parent('p5canvas');

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
    padSlider.slider.parent('p5canvas-slider');
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
    console.log(WIDTH, HEIGHT);
    var nPads = padSlider.slider.value();
    LILYPAD_Y = Math.floor(5 * HEIGHT / 6);
    LILYPAD_WIDTH = Math.floor(WIDTH / (1.5 * nPads + 0.5));    //  (n+1)*0.5*LILYPAD_WIDTH + n*LILYPAD_WIDTH = LILYPAD_WIDTH * (1.5*n + 0.5) = WIDTH
    LILYPAD_HEIGHT = Math.floor(LILYPAD_WIDTH/3);
    LILYPAD_COLOR;
    lilyPadsInfo = {
        selected : null,
    };

    FROG_SIZE = Math.floor(3 * LILYPAD_WIDTH / 5);
    lilyPads = [];
    for (var i = 0; i < nPads; i++) {
        var lilyPad = new LilyPad(i, 
                                  lilyPadsInfo, 
                                  (1.5*i + 1) * LILYPAD_WIDTH, 
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

function touchEnded() {
    mouseX = touchX;
    mouseY = touchY;
    mouseClicked();
}

function touchStarted() {
    // Prevent touch from dragging screen (default action).
}
