// Define constants for later use
const WIDTH = getWidth();
const HEIGHT = getHeight();
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;

// Sloppy, but hey it works
var birdObj = {
    body: 0,
    eye: 0,
    pupil: 0,
    beak: 0,
    color: Randomizer.nextColor(),
    rad: 20,
    x: CENTER_X,
    y: CENTER_Y,
    pipeArr: []
};


// Make 2 rectangles, one green and one blue
function makeBg() {
    var bgSky, bgGround;
    
    bgSky = new Rectangle(WIDTH, HEIGHT);
    bgSky.setPosition(0, 0);
    bgSky.setColor("#150080");
    add(bgSky);

    const GROUND_HEIGHT = HEIGHT / 4;
    bgGround = new Rectangle(WIDTH, GROUND_HEIGHT);
    bgGround.setPosition(0, HEIGHT - GROUND_HEIGHT);
    bgGround.setColor("#009919");
    add(bgGround);
}

// Create all the variables for the bird
function makeBird(birdObj) {
    birdObj.body = new Circle(birdObj.rad);
    birdObj.body.setPosition(birdObj.x, birdObj.y);
    birdObj.body.setColor(birdObj.color);
    
    const EYE_RAD = birdObj.rad / 3;
    var eye_x = birdObj.x + EYE_RAD * 2.5, eye_y = birdObj.y - EYE_RAD;
    
    birdObj.eye = new Circle(EYE_RAD);
    birdObj.eye.setPosition(eye_x, eye_y);
    birdObj.eye.setColor(Color.white);
    
    const PUPIL_RAD = EYE_RAD / 2;
    var pupil_x = eye_x + PUPIL_RAD, pupil_y = eye_y - PUPIL_RAD;
    
    birdObj.pupil = new Circle(PUPIL_RAD);
    birdObj.pupil.setPosition(pupil_x, pupil_y);
    birdObj.pupil.setColor(Color.black);
    
    const BEAK_W = birdObj.rad  / 2, BEAK_H = birdObj.rad / 3;
    var beak_x = birdObj.x + (birdObj.rad / 1.5), beak_y = birdObj.y;
    
    birdObj.beak = new Rectangle(BEAK_W, BEAK_H);
    birdObj.beak.setPosition(beak_x, beak_y);
    birdObj.beak.setColor(Color.orange);
}

// This function is the reason birdObj is global
// Move the bird's position as the cursor moves
function moveBird(e) {
    birdObj.x = e.getX();
    birdObj.y = e.getY();
    
    // These could be made into a function, but this works fine
    const EYE_RAD = birdObj.rad / 3;
    var eye_x = birdObj.x + EYE_RAD * 2.5, eye_y = birdObj.y - EYE_RAD;
    const PUPIL_RAD = EYE_RAD / 2;
    var pupil_x = eye_x + PUPIL_RAD, pupil_y = eye_y - PUPIL_RAD;
    const BEAK_W = birdObj.rad  / 2, BEAK_H = birdObj.rad / 3;
    var beak_x = birdObj.x + (birdObj.rad / 1.5), beak_y = birdObj.y;
    
    birdObj.body.setPosition(birdObj.x, birdObj.y);
    birdObj.eye.setPosition(eye_x, eye_y);
    birdObj.pupil.setPosition(pupil_x, pupil_y);
    birdObj.beak.setPosition(beak_x, beak_y);
}

// Normally, I'd pass in birdObj. But, because it's a global object I don't need to
function makePipe() {
    const PIPE_WIDTH = 50;
    var pipe1, p1_height, pipe2, p2_height;
    var pipeGap, pipeColor;
    var rPipeColor = [];
    
    pipeGap = Randomizer.nextInt(birdObj.rad * 3, birdObj.rad * 4);
    p1_height = Randomizer.nextInt(0, HEIGHT - pipeGap);
    
    pipe1 = new Rectangle(PIPE_WIDTH, p1_height);
    pipe1.setPosition(WIDTH - PIPE_WIDTH, 0);
    
    p2_height = HEIGHT - p1_height - pipeGap;
    pipe2 = new Rectangle(PIPE_WIDTH, p2_height);
    pipe2.setPosition(WIDTH - PIPE_WIDTH, HEIGHT - p2_height);
    
    for(var i = 0; i < 3; i++) {
        rPipeColor[i] = Randomizer.nextInt(127, 255);
    }
    pipeColor = new Color(rPipeColor[0], rPipeColor[1], rPipeColor[2]); 
    
    pipe1.setColor(pipeColor);
    pipe2.setColor(pipeColor);
    
    birdObj.pipeArr.push(pipe1);
    birdObj.pipeArr.push(pipe2);
    
    add(birdObj.pipeArr[birdObj.pipeArr.length - 1]);
    add(birdObj.pipeArr[birdObj.pipeArr.length - 2]);
}

// Because of setTimer badness not letting me pass variables into the function,
// the array I need to store pipes in must be global
function movePipe() {
    for(var i = 0; i < birdObj.pipeArr.length; i++) {
        birdObj.pipeArr[i].move(-1, 0);
    }
    
}

// Yes, this isn't C++. I'm still making a main function anyway
function main() {
    makeBg();
    
    makeBird(birdObj);
    
    add(birdObj.body);
    add(birdObj.eye);
    add(birdObj.pupil);
    add(birdObj.beak);
    
    makePipe();
    setTimer(makePipe, 2000)
    setTimer(movePipe, 5);

    mouseMoveMethod(moveBird);
}

main();
