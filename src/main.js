// Define constants for later use
const WIDTH = getWidth();
const HEIGHT = getHeight();
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;

const PIPE_WIDTH = 50;

// Sloppy, but hey it works
var birdObj = {
    body: 0,
    eye: 0,
    pupil: 0,
    beak: 0,
    colDetect: 0,
    color: Randomizer.nextColor(),
    rad: 20,
    x: CENTER_X,
    y: CENTER_Y,
    pipeArr: [],
    dead: false,
    points: 0,
    started: 0,
    title: 0,
    start: 0
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
    
    birdObj.title = new Text("Mousey Bird", "30pt Helvetica");
    birdObj.title.setPosition(CENTER_X - birdObj.title.getWidth() / 2, CENTER_Y - birdObj.title.getHeight() * 2);
    birdObj.title.setColor(Color.white);
    add(birdObj.title);
    
    birdObj.start = new Text("Click to start!", "20pt Helvetica");
    birdObj.start.setPosition(CENTER_X - birdObj.start.getWidth() / 2, CENTER_Y - birdObj.start.getHeight() / 2);
    birdObj.start.setColor(Color.white);
    add(birdObj.start);
}

// Create all the variables for the bird
function makeBird(birdObj) {
    birdObj.colDetect = new Rectangle(birdObj.rad * 2, birdObj.rad * 2);
    birdObj.colDetect.setPosition(birdObj.x - birdObj.rad, birdObj.y - birdObj.rad);
    
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
    if(!birdObj.dead) {
        birdObj.x = e.getX();
        birdObj.y = e.getY();
        
        // These could be made into a function, but this works fine
        const EYE_RAD = birdObj.rad / 3;
        var eye_x = birdObj.x + EYE_RAD * 2.5, eye_y = birdObj.y - EYE_RAD;
        const PUPIL_RAD = EYE_RAD / 2;
        var pupil_x = eye_x + PUPIL_RAD, pupil_y = eye_y - PUPIL_RAD;
        const BEAK_W = birdObj.rad  / 2, BEAK_H = birdObj.rad / 3;
        var beak_x = birdObj.x + (birdObj.rad / 1.5), beak_y = birdObj.y;
        
        birdObj.colDetect.setPosition(birdObj.x - birdObj.rad, birdObj.y - birdObj.rad);
        birdObj.body.setPosition(birdObj.x, birdObj.y);
        birdObj.eye.setPosition(eye_x, eye_y);
        birdObj.pupil.setPosition(pupil_x, pupil_y);
        birdObj.beak.setPosition(beak_x, beak_y);
    }
}

// Normally, I'd pass in birdObj. But, because it's a global object I don't need to
function makePipe() {
    if(!birdObj.dead) {
        var pipe1, p1_height, pipe2, p2_height;
        var pipeGap, pipeColor;
        var rPipeColor = [];
        
        pipeGap = Randomizer.nextInt(birdObj.rad * 2.5, birdObj.rad * 3.5);
        p1_height = Randomizer.nextInt(0, HEIGHT - pipeGap);
        
        pipe1 = new Rectangle(PIPE_WIDTH, p1_height);
        pipe1.setPosition(WIDTH, 0);
        
        p2_height = HEIGHT - p1_height - pipeGap;
        pipe2 = new Rectangle(PIPE_WIDTH, p2_height);
        pipe2.setPosition(WIDTH, HEIGHT - p2_height);
        
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
}

// Because of setTimer badness not letting me pass variables into the function,
// the array I need to store pipes in must be global
function movePipe() {
    var colX1, colY1, colX2, colY2;
    var pipeX1, pipeY1, pipeX2, pipeY2;
    
    if(!birdObj.dead) {
        for(var i = 0; i < birdObj.pipeArr.length; i++) {
            birdObj.pipeArr[i].move(-1, 0);
            
            if(birdObj.pipeArr[0].getX() < -1 * PIPE_WIDTH) {
                birdObj.pipeArr.splice(0, 2);
            }
            
            // I could make another function for colission detection, but I'm lazy
            colX1 = birdObj.colDetect.getX(); colX2 = birdObj.colDetect.getX() + birdObj.colDetect.getWidth();
            colY1 = birdObj.colDetect.getY(); colY2 = birdObj.colDetect.getY() + birdObj.colDetect.getHeight();
            
            pipeX1 = birdObj.pipeArr[i].getX(); pipeX2 = birdObj.pipeArr[i].getX() + birdObj.pipeArr[i].getWidth();
            pipeY1 = birdObj.pipeArr[i].getY(); pipeY2 = birdObj.pipeArr[i].getY() + birdObj.pipeArr[i].getHeight();
            
            if(!(colX1 > pipeX2 || colX2 < pipeX1 || colY1 > pipeY2 || colY2 < pipeY1)) {
                birdObj.dead = true;
            }
            
            if(colX1 > pipeX2) {
                if(!(birdObj.pipeArr[i].getColor() == Color.black)){
                    // For some reason, this runs twice. So .5 is used at the value added
                    birdObj.points += .5;
                }
                birdObj.pipeArr[i].setColor(Color.black);
            }
            
        }
    }
}

function checkDead() {
    if(birdObj.dead == true) {
        var gameOver = new Text("GAME OVER", "30pt Helvetica");
        gameOver.setPosition(CENTER_X - gameOver.getWidth() / 2, CENTER_Y);
        gameOver.setColor(Color.white);
        
        var points = new Text("Points: " + birdObj.points, "30pt Helvetica");
        points.setPosition(CENTER_X - points.getWidth() / 2, CENTER_Y + gameOver.getHeight());
        points.setColor(Color.white);
        
        var textBg = new Rectangle(gameOver.getWidth() * 1.5, (gameOver.getHeight() + points.getHeight()) * 1.5);
        textBg.setPosition(CENTER_X - textBg.getWidth() / 2, CENTER_Y - textBg.getHeight() / 2);
        textBg.setColor(Color.black);
        
        remove(birdObj.body);
        remove(birdObj.eye);
        remove(birdObj.pupil);
        remove(birdObj.beak);
        
        add(textBg);
        add(gameOver);
        add(points);
        
        stopTimer(makePipe);
        stopTimer(movePipe);
        stopTimer(checkDead);
    }
}

function startGame(e) {
    if(birdObj.started == 0) {
        game();
        remove(birdObj.title);
        remove(birdObj.start);
        birdObj.started = 1;
    }
}

function game() {
    makeBird(birdObj);
    
    add(birdObj.body);
    add(birdObj.eye);
    add(birdObj.pupil);
    add(birdObj.beak);
    
    makePipe();
    setTimer(makePipe, 2000)
    setTimer(movePipe, 1);
    setTimer(checkDead, 1);

    mouseMoveMethod(moveBird);
}

function main() {
    makeBg();
    mouseClickMethod(startGame);
}

main();
