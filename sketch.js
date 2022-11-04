let scene = 0;
let nextScene = false;
let me = {};
const r = 15;
const meSpeed = 3;

let walls = [];
const roadWidth = 100;
let haveTicket = false;
let haveLife = false;

let life = {now: 10, total: 10};

// scene 1 default
let showFigure = false;


//

function preload() {
  // load walls
  for (let i = 0; i <= 2; i ++) {
    walls[i] = loadImage("assets/wall" + i + ".png");
  }

}

function setup() {
  createCanvas(600, 400);
  me = {row: width/2, col: height/2};

  
}

function draw() {
  noStroke();
  switch (scene) {
    case 0:
      background(230);
      fill(0);
      textSize(15);
      textStyle(BOLD);
      textAlign(CENTER);
      text("Press WASD to move", width/2, 350);
      text("Press ENTER to talk with NPCs", width/2, 380);

      triangle(width/2, 10+sin(millis()/100)*10, width/2-10, 20+sin(millis()/100)*10, width/2+10, 20+sin(millis()/100)*10);
      fill(255);
      ellipse(me.row, me.col, r*2);
      checkMovement();
      sceneChange();
      if (me.col <= r) {
        nextScene = true;
      }

      break;
    case 1:
      scene1();
      break;
    case 2:
      scene2();
      break;
    case 3:
      scene3();
      break;
    case 4:
      scene4();
      break;

    //to go back to beginning
    case 5:
      mode = 0;
      break;
  }
}



function scene3() {
  background(0, 0, 255);
}

function scene4() {
  
}

function sceneChange() {
  if (nextScene) {
    scene ++;
    me.col = height-r;
    nextScene = false;
  }
}

function checkMovement() {
  if (
    (keyIsDown(LEFT_ARROW) || keyIsDown(65 /*a*/)) && !isWall(scene, me.row-meSpeed, me.col)
  ) {
    me.row-= meSpeed;
  } else if (
    (keyIsDown(RIGHT_ARROW) || keyIsDown(68 /*d*/)) && !isWall(scene, me.row+meSpeed, me.col)
  ) {
    me.row+= meSpeed;
  } else if (
    (keyIsDown(UP_ARROW) || keyIsDown(87 /*w*/)) && !isWall(scene, me.row, me.col-meSpeed)
  ) {
    me.col-= meSpeed;
  } else if (
    (keyIsDown(DOWN_ARROW) || keyIsDown(83 /*s*/)) && !isWall(scene, me.row, me.col+meSpeed)
  ) {
    me.col+= meSpeed;
  }
}

function isWall(scene, row, col) {
  const color = walls[scene].get(row, col);
  return color[0] === 255; // check if the pixel is red
}


function keyPressed() {
  if (scene == 1 && getTicket()) {
    if (keyCode === 13) {
      haveTicket = true;
    }
  } else if (scene == 2 && counterCheck()) {
    if (keyCode === 13) {
      haveLife = true;
    }
  }

}

function ticketIcon() {
  if (haveTicket) {
    fill(255);
    rect(20, 370, 30, 15);
  }
}

function lifeIcon() {
if (haveLife) {
    fill(255);
    rect(520, 15, life.total*6, 15);
    fill(0, 255, 0);
    let remainLife = map(life.now, 0, 10, 0, life.total*6);
    rect(520, 15, remainLife, 15);
  }
}

/////////////// Scene 1 ///////////////
function scene1() {
  const museum = {w: 400, h: 100};
  const door = {w: 100, h: 40};

  background(0, 250, 0);
  fill(0);
  // wall: rect(width/2-museum.w/2, 0, museum.w, museum.h)
  rect(width/2-museum.w/2+r, 0, museum.w-r*2, museum.h-r);
  fill(255);
  rect(width/2-door.w/2, museum.h-door.h, door.w, door.h-r);
  ellipse(me.row, me.col, r*2);
  checkMovement();
  checkTicket(museum, door);
  ticketIcon();
}

function checkTicket(museum, door) {
  let security = collideRectCircle(width/2-door.w/2, museum.h-door.h, door.w, door.h-r+meSpeed, me.row, me.col, r*2);
  if (security) {
    if (!haveTicket) {
      fill(150);
      rect(width/2-door.w, museum.h-door.h-25, door.w*2, door.h);
      showFigure = true;
    } else {
      sceneChange();
      nextScene = true;
    }
  }

  if (showFigure) {
    mysteriousFigure();
    getTicket();
  }
}

function mysteriousFigure() {
  fill(0);
  rect(500, 300+sin(millis()/100)*5, r*2, r*2);
}

function getTicket() {
  let approach = collideRectCircle(500, 300, r*2, r*2, me.row, me.col, (r+meSpeed)*2);
  if (approach) {
    if (!haveTicket) {
      fill(150);
      rect(475, 250, 80, 30);
    } else {
      fill(0);
      rect(475, 250, 80, 30);
    }
    
  }  
  return approach;
}

/////////////// Scene 2 ///////////////
function scene2() {
  background(0, 0, 255);
  fill(220);
  rect(width/2-roadWidth/2, height/2, roadWidth, height/2);
  rect(width/2-roadWidth/2, height/2, width, roadWidth);

  // counter
  fill(0);
  rect(width/2-100, height/2-50, 200, 50);
  rect(width/2-r, height/2-85+sin(millis()/100)*5, r*2, r*2);

  fill(255);
  ellipse(me.row, me.col, r*2);
  checkMovement();
  counterCheck();
  ticketIcon();
  lifeIcon();
  nextRoom();
}

function counterCheck() {
  let receptionist = collideRectCircle(width/2-100, height/2-50, 200, 50, me.row, me.col, (r+meSpeed)*2);
  if (receptionist) {
    if (!haveLife) {
      fill(220);
      rect(width/2-50, height/2-130, 100, 30);
    } else {
      fill(255, 0, 0);
      rect(width/2-50, height/2-130, 100, 30);
    }
  }
  return receptionist;
}

function nextRoom() {
  // go to the next room
  if (haveLife) {
      if (me.row+r > width) {
        nextScene = true;
        sceneChange();
      }
    }
}