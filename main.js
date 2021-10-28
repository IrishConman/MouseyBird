// This is not currently functional. Just a background

const WIDTH = getWidth();
const HEIGHT = getHeight();
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;

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

function makeBird(birdObj) {
    birdObj.body = new Circle(birdObj.rad);
    birdObj.body.setPosition(birdObj.x, birdObj.y);
    birdObj.body.setColor(birdObj.color);
    // add(birdArr[BODY]);
    
    const EYE_RAD = birdObj.rad / 3;
    const EYE_X = birdObj.x + EYE_RAD * 2.5, EYE_Y = birdObj.y - EYE_RAD;
    
    birdObj.eye = new Circle(EYE_RAD);
    birdObj.eye.setPosition(EYE_X, EYE_Y);
    birdObj.eye.setColor(Color.white);
    // add(birdArr[EYE]);
    
    const PUPIL_RAD = EYE_RAD / 2;
    const PUPIL_X = EYE_X + PUPIL_RAD, PUPIL_Y = EYE_Y - PUPIL_RAD;
    
    birdObj.pupil = new Circle(PUPIL_RAD);
    birdObj.pupil.setPosition(PUPIL_X, PUPIL_Y);
    birdObj.pupil.setColor(Color.black);
    // add(birdArr[PUPIL]);
    
    const BEAK_W = birdObj.rad  / 2, BEAK_H = birdObj.rad / 3;
    const BEAK_X = birdObj.x + (birdObj.rad / 1.5), BEAK_Y = birdObj.y;
    
    birdObj.beak = new Rectangle(BEAK_W, BEAK_H);
    birdObj.beak.setPosition(BEAK_X, BEAK_Y);
    birdObj.beak.setColor(Color.orange);
    // add(birdArr[BEAK]);
}

makeBg();

var birdObj = {
    body: 0,
    eye: 0,
    pupil: 0,
    beak: 0,
    color: Color.yellow,
    rad: 20,
    x: CENTER_X,
    y: CENTER_Y
};

makeBird(birdObj);

add(birdObj.body);
add(birdObj.eye);
add(birdObj.pupil);
add(birdObj.beak);
