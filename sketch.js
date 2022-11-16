let scene = 0;
let nextScene = false;
let me;
let monster;
const meSpeed = 3;

let walls = [];
const roadWidth = 100;
let haveTicket = false;
let haveLife = true;
let haveScarf = false;

let life = { now: 10, total: 10 };

// scene 1 default
let showFigure = false;

// scene 5 default
let hands = [];

// scene 6 default
let eye1;
let eye2;
let mouths = [];
let scene6Text = ["HOW", "DARE", "YOU", "LOSE", "IT"];

// scene 7 default
let extraLife = false;
let evilFlower = false;
let s7Flowers = [];

function preload() {
  // load walls
  for (let i = 0; i <= 7; i++) {
    walls[i] = loadImage("assets/wall" + i + ".png");
  }
}

function setup() {
  createCanvas(600, 400);
  me = new Me(width / 2, height / 2, 15);
  monster = new Monster(width / 2, height - 50, 15, me);

  // scene 5 hands
  hands[0] = new Hand(350, 250, 1);
  hands[1] = new Hand(180, 150, -1);
  hands[2] = new Hand(350, 50, 1);

  // scene 6 eyes
  eye1 = new Eye(130, 90);
  eye2 = new Eye(500, 330);

  // scene 6 mouths
  mouths[0] = new Mouth(260, 235);
  mouths[1] = new Mouth(450, 210);

  // scene 7 flowers
  s7Flowers[0] = new Flower(155, 165);
  s7Flowers[1] = new Flower(155, 265);
  s7Flowers[2] = new Flower(width / 2, height / 2 - 150);
  s7Flowers[3] = new Flower(width / 2, height / 2 + 150);
  s7Flowers[4] = new Flower(445, 165);
  s7Flowers[5] = new Flower(445, 265);
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
      text("Press WASD to move", width / 2, 350);
      text("Press ENTER to talk with NPCs", width / 2, 380);

      triangle(
        width / 2,
        10 + sin(millis() / 100) * 10,
        width / 2 - 10,
        20 + sin(millis() / 100) * 10,
        width / 2 + 10,
        20 + sin(millis() / 100) * 10
      );
      me.display();
      me.checkMovement();
      sceneChange();
      if (me.col <= me.r) {
        nextScene = true;
        me.col = height - me.r;
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
    case 5:
      scene5();
      break;
    case 6:
      scene6();
      break;
    case 7:
      scene7();
      break;

    //to go back to beginning
    case 10:
      mode = 0;
      break;

    case 15:
      scene15();
      break;
  }
}

function sceneChange() {
  if (nextScene) {
    scene++;
    nextScene = false;
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
  } else if (scene == 4 && scarfDisplay()) {
    if (keyCode === 13) {
      haveScarf = true;
    }
  } else if (scene == 7 && extraLifeCheck()) {
    if (keyCode === 13) {
      extraLife = true;
      evilFlower = true;
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
    if (life.now == 0) {
      scene = 15;
    }
    fill(255);
    rect(520, 15, life.total * 6, 15);
    fill(0, 255, 0);
    let remainLife = map(life.now, 0, 10, 0, life.total * 6);
    rect(520, 15, remainLife, 15);
  }
}

function scarfIcon() {
  if (haveScarf) {
    fill(0);
    rect(me.row - me.r, me.col, me.r * 2, 10);
  }
}

/////////////// BE1 Scene 15 ///////////////
function scene15() {
  background(0);
  textSize(30);
  fill(255, 0, 0);
  text("GAME OVER", width / 2, height / 2);
}

/////////////// Scene 1 ///////////////
function scene1() {
  const museum = { w: 400, h: 100 };
  const door = { w: 100, h: 40 };

  background(0, 250, 0);
  fill(0);
  // wall: rect(width/2-museum.w/2, 0, museum.w, museum.h)
  rect(
    width / 2 - museum.w / 2 + me.r,
    0,
    museum.w - me.r * 2,
    museum.h - me.r
  );
  fill(255);
  rect(width / 2 - door.w / 2, museum.h - door.h, door.w, door.h - me.r);
  me.display();
  me.checkMovement();
  checkTicket(museum, door);
  ticketIcon();
}

function checkTicket(museum, door) {
  let security = collideRectCircle(
    width / 2 - door.w / 2,
    museum.h - door.h,
    door.w,
    door.h - me.r + meSpeed,
    me.row,
    me.col,
    me.r * 2
  );
  if (security) {
    if (!haveTicket) {
      fill(150);
      rect(width / 2 - door.w, museum.h - door.h - 25, door.w * 2, door.h);
      showFigure = true;
    } else {
      nextScene = true;
      sceneChange();
      me.col = height - me.r;
    }
  }

  if (showFigure) {
    mysteriousFigure();
    getTicket();
  }
}

function mysteriousFigure() {
  fill(0);
  rect(500, 300 + sin(millis() / 100) * 5, me.r * 2, me.r * 2);
}

function getTicket() {
  let approach = collideRectCircle(
    500,
    300,
    me.r * 2,
    me.r * 2,
    me.row,
    me.col,
    (me.r + meSpeed) * 2
  );
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
  rect(width / 2 - roadWidth / 2, height / 2, roadWidth, height / 2);
  rect(width / 2 - roadWidth / 2, height / 2, width, roadWidth);

  // counter
  fill(0);
  rect(width / 2 - 100, height / 2 - 50, 200, 50);
  rect(
    width / 2 - me.r,
    height / 2 - 85 + sin(millis() / 100) * 5,
    me.r * 2,
    me.r * 2
  );

  me.display();
  me.checkMovement();
  counterCheck();
  ticketIcon();
  lifeIcon();
  nextRoom();
}

function counterCheck() {
  let receptionist = collideRectCircle(
    width / 2 - 100,
    height / 2 - 50,
    200,
    50,
    me.row,
    me.col,
    (me.r + meSpeed) * 2
  );
  if (receptionist) {
    if (!haveLife) {
      fill(220);
      rect(width / 2 - 50, height / 2 - 130, 100, 30);
    } else {
      fill(255, 0, 0);
      rect(width / 2 - 50, height / 2 - 130, 100, 30);
    }
  }
  return receptionist;
}

function nextRoom() {
  // go to the next room
  if (haveLife) {
    if (me.row + me.r > width) {
      nextScene = true;
      sceneChange();
      me.row = me.r;
    }
  }
}

/////////////// Scene 3 ///////////////
function scene3() {
  background(0, 0, 255);
  fill(220);
  rect(0, height / 2, width, roadWidth);
  me.display();
  me.checkMovement();
  ticketIcon();
  lifeIcon();

  if (me.row + me.r > width) {
    nextScene = true;
    sceneChange();
    me.row = me.r;
  }
}

/////////////// Scene 4 ///////////////
function scene4() {
  background(0, 0, 255);
  fill(220);
  rect(0, height / 2, width / 2 + roadWidth / 2, roadWidth);
  rect(width / 2 - roadWidth / 2, 0, roadWidth, height / 2 + roadWidth);
  me.display();
  me.checkMovement();
  ticketIcon();
  lifeIcon();

  scarfDisplay();
  scarfIcon();

  if (me.col - me.r < 0) {
    nextScene = true;
    sceneChange();
    me.col = height - me.r;
  }
}

function scarfDisplay() {
  fill(150);
  rect(width / 2 - 45, height / 2 + 5, 90, 90);
  rect(width / 2 + 85, height / 2 + 5, 90, 90);

  let touchScarf = collideRectCircle(
    width / 2 - 45,
    height / 2 + 5,
    90,
    90,
    me.row,
    me.col,
    (me.r + meSpeed) * 2
  );
  if (touchScarf) {
    if (!haveScarf) {
      fill(250);
      rect(width / 2 - 30, height / 2 + 110, 60, 20);
    } else {
      fill(0);
      rect(width / 2 - 30, height / 2 + 110, 60, 20);
      me.row = width / 2;
      me.col = height / 2 - me.r;
    }
  }
  return touchScarf;
}

/////////////// Scene 5 ///////////////
function scene5() {
  background(0, 0, 255);
  fill(220);
  rect(width / 2 - roadWidth / 2, 0, roadWidth, height);
  me.display();
  me.checkMovement();
  ticketIcon();
  lifeIcon();
  scarfIcon();

  handsOut();

  if (me.col - me.r < 0) {
    nextScene = true;
    sceneChange();
    me.col = height - me.r;
  }
}

function handsOut() {
  for (let i = 0; i < hands.length; i++) {
    if (me.col <= hands[i].y + 30) {
      hands[i].move(1);
      hands[i].wallText();
      hands[i].catchDetection();
    } else {
      hands[i].move(-1);
    }

    hands[i].display();
  }
}

/////////////// Scene 6 ///////////////
function scene6() {
  background(0, 0, 255);
  fill(220);
  rect(width / 2 - roadWidth / 2, 280, roadWidth, height / 2);
  rect(50, 280, width / 2, roadWidth);
  rect(50, 165, roadWidth, roadWidth * 2 + 15);
  rect(50, 165, width, roadWidth);
  // painting
  fill(100);
  rect(30, 40, 200, 100);

  // mouths
  for (let i = 0; i < mouths.length; i++) {
    if (me.col < 265 && me.row > mouths[i].x) {
      mouths[i].display();
      mouths[i].catchDetection();
    }
  }
  // me
  me.display();
  me.checkMovement();
  ticketIcon();
  lifeIcon();
  scarfIcon();

  // if (life.now != 0) {
  //   monster.display();
  //   monster.checkMovement();
  // }

  // eyes
  if (me.col < 265) {
    eye1.display();
  }
  if (me.row > width / 2 + roadWidth) {
    eye2.display();
  }

  // Texts
  for (let i = 0; i < scene6Text.length; i++) {
    fill(255, 0, 0);
    textSize(25);
    if (me.col < 265 && me.row >= 300 + i * 60) {
      text(scene6Text[i], 300 + i * 60, 70 + (i % 2) * 50);
    }
  }

  if (me.row > width) {
    nextScene = true;
    sceneChange();
    me.row = me.r;
  }
}

/////////////// Scene 7 ///////////////
function scene7() {
  background(0, 0, 255);
  fill(220);
  rect(0, 165, width, roadWidth);
  ellipse(width / 2, height / 2, 300);
  me.display();
  me.checkMovement();
  ticketIcon();
  lifeIcon();
  scarfIcon();

  // Recover?
  if (!extraLife) {
    fill(255);
    rect(width / 2 - 60, height / 2 - 60, 120, 120);
  } else {
    fill(255, 0, 0);
    rect(width / 2 - 60, height / 2 - 60, 120, 120);
  }

  extraLifeCheck();

  for (let i = 0; i < s7Flowers.length; i++) {
    s7Flowers[i].display();
    s7Flowers[i].flowerAttack();
  }
}

function extraLifeCheck() {
  let Credence = collideRectCircle(
    width / 2 - 60,
    height / 2 - 60,
    120,
    120,
    me.row,
    me.col,
    (me.r + meSpeed) * 2
  );
  if (Credence) {
    if (!extraLife) {
      fill(255);
      rect(width / 2 - 50, height / 2 + 70, 100, 30);
    }
  }
  return Credence;
}
