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

function makeBird(birdArr, birdRad, birdColor, x, y) {
    const BODY = 1, EYE = 2, PUPIL = 3, BEAK = 4;
    
    birdArr[BODY] = new Circle(birdRad);
    birdArr[BODY].setPosition(x, y);
    birdArr[BODY].setColor(birdColor);
    // add(birdArr[BODY]);
    
    const EYE_RAD = birdRad / 3;
    const EYE_X = x + EYE_RAD * 2.5, EYE_Y = y - EYE_RAD;
    
    birdArr[EYE] = new Circle(EYE_RAD);
    birdArr[EYE].setPosition(EYE_X, EYE_Y);
    birdArr[EYE].setColor(Color.white);
    // add(birdArr[EYE]);
    
    const PUPIL_RAD = EYE_RAD / 2;
    const PUPIL_X = EYE_X + PUPIL_RAD, PUPIL_Y = EYE_Y - PUPIL_RAD;
    
    birdArr[PUPIL] = new Circle(PUPIL_RAD);
    birdArr[PUPIL].setPosition(PUPIL_X, PUPIL_Y);
    birdArr[PUPIL].setColor(Color.black);
    // add(birdArr[PUPIL]);
    
    const BEAK_W = birdRad / 2, BEAK_H = birdRad / 3;
    const BEAK_X = x + (birdRad / 1.5), BEAK_Y = y;
    
    birdArr[BEAK] = new Rectangle(BEAK_W, BEAK_H);
    birdArr[BEAK].setPosition(BEAK_X, BEAK_Y);
    birdArr[BEAK].setColor(Color.orange);
    // add(birdArr[BEAK]);
    
    var retArr = []; retArr = birdArr;
    return retArr;
}

makeBg();

var bird = [];
bird = makeBird(bird, 20, Color.yellow, CENTER_X, CENTER_Y);

// This gives an error, idk why
for(var i = 0; i < bird.length; i++) {
    add(bird[i]);
}