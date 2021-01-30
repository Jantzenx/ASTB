//Jantzen:
let x, y, r, r2, r3;
let squareX = 400;
let squareY = 400;
let barX, barY;
let throtY;

let menuOption = 0;

let curDist = 0;
let runningAvg = 0;
let runningTotal = 0;
let throtCurDist = 0;
let throtRunningAvg = 0;
let throtRunningTotal = 0;
let samples = 0

let timer = 30;
let timeBuffer = timer;

let ax = 0;
let ay = 0;
let vx = 5;
let vy = 5;
let vMul = 0.3;
let aThrottle = 0;
let vThrottle = 5;
let throttleMul = 0.5 * 0.75;
let vThrottleMax = 9;
let vTargetMax = 9;

let audioCues = 0;
let musicToggle = 1;

let haveInitSetting = 0;

let cueTotal = 0;
let cueCorrect = 0;
let cueState = 0;
let dontReact = 0;
let needClick = 0;

let firstStart = true;

function preload() {

  soundFormats('wav', 'mp3');
  menuSound = loadSound('assets/music.mp3');
  startSound = loadSound('assets/misc_menu_4.wav');
  
  jet = loadImage("Yellow_jet.png");
  target = loadImage("Navy_target.png");
  greenTarget = loadImage("assets/Green_target.png");
  blueAngel = loadImage('assets/blue_angel.png');
  blueAngelFlipped = loadImage('assets/blue_angel_flipped.png');
  keyMap = loadImage('assets/keyMap.PNG');

  oneLeft = loadSound('assets/1_Left.mp3');
  oneRight = loadSound('assets/1_Right.mp3');
  twoLeft = loadSound('assets/2_Left.mp3');
  twoRight = loadSound('assets/2_Right.mp3');
  threeLeft = loadSound('assets/3_Left.mp3');
  threeRight = loadSound('assets/3_Right.mp3');
  fourLeft = loadSound('assets/4_Left.mp3');
  fourRight = loadSound('assets/4_Right.mp3');
  fiveLeft = loadSound('assets/5_Left.mp3');
  fiveRight = loadSound('assets/5_Right.mp3');
  sixLeft = loadSound('assets/6_Left.mp3');
  sixRight = loadSound('assets/6_Right.mp3');
  sevenLeft = loadSound('assets/7_Left.mp3');
  sevenRight = loadSound('assets/7_Right.mp3');
  eightLeft = loadSound('assets/8_Left.mp3');
  eightRight = loadSound('assets/8_Right.mp3');
  nineLeft = loadSound('assets/9_Left.mp3');
  nineRight = loadSound('assets/9_Right.mp3');

  leftEven = [twoLeft, fourLeft, sixLeft, eightLeft];

  leftOdd = [oneLeft, threeLeft, fiveLeft, sevenLeft, nineLeft];

  rightEven = [twoRight, fourRight, sixRight, eightRight];

  rightOdd = [oneRight, threeRight, fiveRight, sevenRight, nineRight];

}



function setup() {
  
  createCanvas(windowWidth, windowHeight);
  fullscreen(1);
  fancyFont = loadFont('assets/HighlandGothicFLF.ttf');
  textFont(fancyFont, 50);
  x = width / 2;
  y = height / 2;
  r = random(3, 6);
  r2 = random(3, 6);
  r3 = random(2, 5);
  barX = 50;
  barY = windowHeight - 400;
  throtY = windowHeight - 150
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function startMenu() {

  keyCode = DELETE;
  textAlign(LEFT);
  exitPointerLock();
  cursor();
  fill('black');
  rect(windowWidth / 2 - 100, windowHeight / 2 - 200, 200, 75);
  rect(windowWidth / 2 - 100, windowHeight / 2 - 100, 200, 75);
  rect(windowWidth / 2 - 100, windowHeight / 2 - 0, 200, 75);
  stroke('#013993');
  strokeWeight(3);
  fill('#e4ac00');
  textSize(45);
  text("Jantzen and Mike's ASTB trainer... 'as real as it gets!'", windowWidth / 2 - 615, 175)


  if (mouseX > windowWidth / 2 - 100 && mouseX < windowWidth / 2 + 100) {
    if (mouseY > windowHeight / 2 - 200 && mouseY < windowHeight / 2 - 125) {
      fill('#e4ac00')
      rect(windowWidth / 2 - 100, windowHeight / 2 - 200, 200, 75);
    } else if (mouseY > windowHeight / 2 - 100 && mouseY < windowHeight / 2 - 25) {
      fill('#e4ac00')
      rect(windowWidth / 2 - 100, windowHeight / 2 - 100, 200, 75);
    } else if (mouseY > windowHeight / 2 - 0 && mouseY < windowHeight / 2 + 75) {
      fill('#e4ac00')
      rect(windowWidth / 2 - 100, windowHeight / 2 - 0, 200, 75);
    }
  }


  textSize(50 - 15)
  text('START', windowWidth / 2 - 67, windowHeight / 2 - 145);
  textSize(45 - 15);
  text('SETTINGS', windowWidth / 2 - 82, windowHeight / 2 + 55);
  textSize(40 - 18);
  text('INSTRUCTIONS', windowWidth / 2 - 90, windowHeight / 2 - 50);
  text('Laptop users: zoom your browser out to 67%', windowWidth / 2 - 240, windowHeight / 2 + 175);
  text('Press F11 to go fullscreen', windowWidth / 2 - 140, windowHeight / 2 + 235);
  image(blueAngelFlipped, windowWidth / 2 - 1000, 300);
  image(blueAngel, windowWidth / 2 + 140, 300);

  menuSound.setVolume(0.10, 0.25);

  if (!menuSound.isPlaying() && musicToggle == 1) {
    menuSound.play();
  }



}

function mouseClicked() {
  if (menuOption == 0) {

    if (mouseX > windowWidth / 2 - 100 && mouseX < windowWidth / 2 + 100) {
      if (mouseY > windowHeight / 2 - 200 && mouseY < windowHeight / 2 - 125) {
        menuOption = 1;
        timer = timeBuffer;
        startSound.play();
      } else if (mouseY > windowHeight / 2 - 100 && mouseY < windowHeight / 2 - 25) {
        menuOption = 2;
      } else if (mouseY > windowHeight / 2 - 0 && mouseY < windowHeight / 2 + 75) {
        menuOption = 3;
      }
    }
  }

}

function gameOver() {
  textAlign(CENTER);
  textSize(100);
  text("Game Over", windowWidth / 2, windowHeight / 2 - 300);
  textSize(40);
  text("Your average distance from the target was: " + round(runningAvg), windowWidth / 2, windowHeight / 2 + 0)
  text("Your average distance from the throttle target was: " + round(throtRunningAvg), windowWidth / 2, windowHeight / 2 + 100)
  text("Try to get your scores as low as possible", windowWidth / 2, windowHeight / 2 + 200)
  text("Press backspace to return to the menu", windowWidth / 2, windowHeight / 2 + 300);
  if (audioCues == 1) {
    text("You got " + cueCorrect + "/" + cueTotal + " cues correct", windowWidth / 2, windowHeight / 2 - 100);
  }
  if (keyCode == BACKSPACE) {
    throtRunningAvg = 0;
    runningAvg = 0;
    cueCorrect = 0;
    cueTotal = 0;
    keyCode = DELETE;
    clear();
    menuOption = 0;
  }

}

function instructMenu() {
  image(keyMap, 420, -50);
  textSize(27);
  textAlign(CENTER)
  text("Goal: Align your plane with the target using the mouse,", windowWidth / 2, windowHeight / 2 - 100);
  text(" while aligning your throttle with the target using the 'w' and 's' keys", windowWidth / 2, windowHeight / 2 - 60);
  text("If you have audio cue training on (headphones required), there are 2 more controls:", windowWidth / 2, windowHeight / 2 + 0);
  textSize(20);
  text("1. Press 'e' when you hear an EVEN number in your LEFT ear", windowWidth / 2, windowHeight / 2 + 50);
  text("2. RIGHT click when you hear an ODD number in your RIGHT ear", windowWidth / 2, windowHeight / 2 + 100);
  textSize(30);
  text("Press Backspace to return", windowWidth / 2, windowHeight / 2 + 250);

  if (keyCode == BACKSPACE) {
    keyCode = DELETE;

    clear();
    menuOption = 0;
  }
}

function settingsMenu() {
  if (haveInitSetting == 0) {
    throtSlider = createSlider(5, 15, vThrottleMax);
    throtSlider.position(windowWidth / 2 - 100, 130);
    throtSlider.size(200);
    targetSlider = createSlider(5, 15, vTargetMax);
    targetSlider.position(windowWidth / 2 - 100, 230);
    targetSlider.size(200);
    timerSlider = createSlider(1, 200, timer);
    timerSlider.position(windowWidth / 2 - 100, 330);
    timerSlider.size(200);

    audioSlider = createSlider(0, 1, audioCues);
    audioSlider.position(windowWidth / 2 - 100, 430);
    audioSlider.size(200);

    musicSlider = createSlider(0, 1, musicToggle);
    musicSlider.position(windowWidth / 2 - 100, 530);
    musicSlider.size(200);

    haveInitSetting = 1;
  }
  timer = timerSlider.value();
  timeBuffer = timer;
  vThrottleMax = throtSlider.value();

  vMul = 0.15 + ((targetSlider.value() - 5) / 10) * (0.45 - 0.15);
  throttleMul = 0.225 + ((throtSlider.value() - 5) / 10) * (0.525 - 0.225);

  vTargetMax = targetSlider.value();
  audioCues = audioSlider.value();
  musicToggle = musicSlider.value();

  fill('#e4ac00')
  textSize(18);
  textAlign(CENTER);
  text("Easy", windowWidth / 2 - 150, 145);
  text("Hard", windowWidth / 2 + 150, 145);
  text("Easy", windowWidth / 2 - 150, 245);
  text("Hard", windowWidth / 2 + 150, 245);
  text("Time:", windowWidth / 2 - 150, 345);
  text(timer + " seconds", windowWidth / 2 + 185, 345);
  text("Off", windowWidth / 2 - 150, 445);
  text("On", windowWidth / 2 + 150, 445);
  text("Off", windowWidth / 2 - 150, 545);
  text("On", windowWidth / 2 + 150, 545);

  textSize(35);
  textAlign(CENTER);
  text("Slide to adjust throttle speed", windowWidth / 2, 100);
  textAlign(CENTER);

  text("Slide to adjust target speed", windowWidth / 2, 200);
  textAlign(CENTER);

  text("Slide to adjust game time", windowWidth / 2, 300);
  textAlign(CENTER);

  text("Audio cue training", windowWidth / 2, 400);

  text("Music", windowWidth / 2, 500);

  fill('#e4ac00')
  textSize(25);
  textAlign(CENTER)
  text('Press Backspace to return', windowWidth / 2, windowHeight / 2 + 250);

  if (musicToggle == 0) {
    menuSound.stop();
  }

  if (keyCode == BACKSPACE) {
    keyCode = DELETE;

    targetSlider.remove();
    throtSlider.remove();
    audioSlider.remove();
    timerSlider.remove();
    musicSlider.remove();
    clear();
    menuOption = 0;
    haveInitSetting = 0;
  }

}

function keyPressed() {

  if (cueState != 0 && keyCode != BACKSPACE && keyCode == 69 && menuOption == 1) {

    needClick = 0;

    if (dontReact == 1) {
      cueCorrect--;
      return;
    }
    if (cueState == 1 && keyCode == 69) {

    }
    if (cueState == 2) {
      cueCorrect--;
    }
    if (cueState == 3) {
      cueCorrect--;
    }
    if (cueState == 4) {
      cueCorrect--;
    }

    cueState = 0;
  }
}

function mousePressed() {

  if (menuOption == 1) {

    needClick = 0;

    if (dontReact == 1) {
      cueCorrect--;
      return;
    }

    if (cueState == 4) {}
    
    if (cueState == 1) {

      cueCorrect--;
    }
    if (cueState == 2) {
      cueCorrect--;
    }
    if (cueState == 3) {
      cueCorrect--;
    }

  }

  cueState = 0;
}

function draw() {

  background(0);
  
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }

  if (menuOption == 0) {
    firstStart = true;
    startMenu();
  } else if (menuOption == 2) {
    instructMenu();
  } else if (menuOption == 3) {
    settingsMenu();
  } else if (menuOption == 1) {
    
    if(firstStart == true)
      {
    squareX = windowWidth/2;
    squareY = windowHeight/2;
    firstStart = false;
      }
    playGame();
  } else if (menuOption == 5) {
    firstStart = true;
    gameOver();
  }

}

function playGame() {
  if (timer <= 0.99) {
    menuOption = 5;
    curDist = 0;
    runningTotal = 0;
    throtCurDist = 0;
    throtRunningTotal = 0;
    samples = 0;
    timer = timeBuffer;
    return;
  }
  
  textAlign(LEFT);
  requestPointerLock();
  noCursor();
  fill(0);
  stroke("#013993");
  rect(20, 100, 70, windowHeight - 200);
  strokeWeight(3);
  stroke("#013993");
  
  if (keyCode == BACKSPACE) {
    keyCode = DELETE;

    clear();
    menuOption = 0;
  }

  if (menuSound.isPlaying()) {
    menuSound.setVolume(0);
  }


  if (audioCues == 1) {


    if (frameCount % 300 == 0) {


      if (needClick == 1) {
        cueCorrect--;
      }


      dontReact = 0;
      needClick = 0;
      let array = floor(random(0, 3.99));
      let cue;
      let evenIndex = floor(random(0, 3.99));
      let oddIndex = floor(random(0, 4.99));


      if (array == 0) {
        cueState = 1;
        cue = leftEven[evenIndex];
        needClick = 1;
      } else if (array == 1) {
        cueState = 2;
        cue = leftOdd[oddIndex];
      } else if (array == 2) {
        cueState = 3;
        cue = rightEven[evenIndex];
      } else if (array == 3) {
        cueState = 4;
        cue = rightOdd[oddIndex];
        needClick = 1;
      }


      cueTotal++;
      cue.play();
      cueCorrect++;
    }
  }

  if (cueState == 2 || cueState == 3) {
    dontReact = 1;
  }


  if (sqrt(pow(x - squareX, 2) + (pow(y - squareY, 2))) <= 40) {
    image(greenTarget, x, y, 50, 50);
  } else {
    image(target, x, y, 50, 50);
  }

  if (abs(barY - throtY) <= 40) {
    image(greenTarget, barX - 20, barY, 50, 50);
  } else {
    image(target, barX - 20, barY, 50, 50);
  }

  image(jet, squareX, squareY, 85, 37.5);
  image(jet, barX - 27, throtY, 68, 30)

  fill('#e4ac00')
  textSize(35);
  text("Target: " + round(runningAvg), 10, 30);
  text("Throttle: " + round(throtRunningAvg), 10, 70);
  textSize(25);
  text("Press Backspace to return", windowWidth - 370, windowHeight - 10)
  text(timer, windowWidth / 2, 30);
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    throtY -= 5;
  }

  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    throtY += 5;
  }

  squareY = squareY + (-movedY);
  squareX = squareX + (-movedX);

  if (y < 150) {
    ax = random(-10, 10);
    ay = random(1, 10);

    vx = vx + ax;

    vy = abs(vy + ay);

  }
  if (y > windowHeight - 100) {
    ax = random(-10, 10);
    ay = random(-10, -1);

    vx = vx + ax;

    vy = -1 * abs(vy + ay);

  }
  if (x < 150) {
    ax = random(1, 10);
    ay = random(-10, 10);

    vx = abs(vx + ax);

    vy = vy + ay;

  }
  if (x > windowWidth - 100) {
    ax = random(-10, -1);
    ay = random(-10, 10);

    vx = -1 * abs(vx + ax);

    vy = vy + ay;

  }

  if (barY > windowHeight - 165) {
    aThrottle = random(-5, -1);
    vThrottle = vThrottle + aThrottle;
    vThrottle = -1 * abs(vThrottle);
  }

  if (barY < 100) {
    aThrottle = random(1, 5);
    vThrottle = vThrottle + aThrottle;
    vThrottle = abs(vThrottle);
  }


  if (throtY >= windowHeight - 150) {
    throtY = windowHeight - 150;
  } else if (throtY <= 110) {
    throtY = 110;
  }
  if (vThrottle < -vThrottleMax) {
    vThrottle = -vThrottleMax;
  }
  if (vThrottle > vThrottleMax) {
    vThrottle = vThrottleMax;
  }

  if (vx < -vThrottleMax) {
    vx = -vThrottleMax;
  }
  if (vx > vThrottleMax) {
    vx = vThrottleMax
  }
  if (vy < -vThrottleMax) {
    vy = -vThrottleMax;
  }
  if (vy > vThrottleMax) {
    vy = vThrottleMax;
  }

  x = x + vx * vMul;
  y = y + vy * vMul;
  barY = barY + vThrottle * throttleMul;

  if (frameCount % 40 == 0) {
    ax = random(-10, 10);
    ay = random(-10, 10);
    aThrottle = random(-5, 5);

    vx = vx + ax;
    vy = vy + ay;
    vThrottle = vThrottle + aThrottle;
  }

  if (frameCount % 60 == 0) {
    timer--;
    if (floor(random(0, 3) == 1)) {
      vx = -vx;
    }

    if (floor(random(0, 3) == 1)) {
      vy = -vy;
    }
    if (floor(random(0, 2) == 1)) {
      vThrottle = -vThrottle;
    }

  }

  if (frameCount % 30 == 0) {
    curDist = round(dist(x, y, squareX, squareY));
    throtCurDist = abs(barY - throtY);

    samples = samples + 1
    runningTotal = runningTotal + curDist;
    throtRunningTotal = throtRunningTotal + throtCurDist;

    runningAvg = runningTotal / samples;
    throtRunningAvg = throtRunningTotal / samples;

  }
}
