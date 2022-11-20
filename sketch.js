let scene = 0;
let nextScene = false;
let me;
let monster;
const meSpeed = 3;

let walls = [];
const roadWidth = 100;
let haveTicket = false;
let haveLife = false;
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
let flowerAttack = [];
let scene7Text = [
  "CARELESS!",
  "NO WAY!",
  "BORROW?",
  "IRRESPONSIBLE!",
  "YOU?",
  "IMPOSSIBLE!",
];

// scene 8 default
let approachMonster = false;
let monsterAttack = false;
let textOffset = 10;
let textNum = 1;
let attackCountdown = 0;

// scene 10 default
let s10Flowers = [];
let flowerAttack10 = [];

// scene 11 default
let hands11 = [];
let pick = false;
let pickOffset = 0;
let mouths11 = [];

// scene 12 default
let HE = false;
let BE = false;
let fadeOffset = 0;
let exit = false;

function preload() {
  // load walls
  for (let i = 0; i <= 13; i++) {
    walls[i] = loadImage("assets/wall" + i + ".png");
  }
}

function setup() {
  createCanvas(600, 400);
  me = new Me(width / 2, height / 2, 15);
  monster = new Monster(width / 2 + 10, 215 - 10, 15, me);

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
  console.log(s7Flowers[0].x);
  for (let i = 0; i < s7Flowers.length; i++) {
    flowerAttack[i] = new FlowerBullet(s7Flowers[i]);
  }

  // scene 10 flowers
  s10Flowers[0] = new Flower(350, 250);
  s10Flowers[1] = new Flower(250, 150);
  s10Flowers[2] = new Flower(350, 50);
  s10Flowers[3] = new Flower(250, 300);
  for (let i = 0; i < s10Flowers.length; i++) {
    flowerAttack10[i] = new FlowerBullet(s10Flowers[i]);
  }

  // scene 11 hands
  hands11[0] = new Hand(550, 185, 1);
  hands11[1] = new Hand(180, 320, -1);
  // scene 11 mouths
  mouths11[0] = new Mouth(width / 2 - 150, height / 2 - 40);
  mouths11[1] = new Mouth(width / 2 + 40, height / 2 - 10);
}

function draw() {
  noStroke();
  switch (scene) {
    case 0:
      scene0();
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
    case 8:
      scene8();
      break;
    case 9:
      scene9();
      break;
    case 10:
      scene10();
      break;
    case 11:
      scene11();
      break;
    case 12:
      scene12();
      break;
    case 13:
      scene13();
      break;
    case 14:
      scene14();
      break;

    //to go back to beginning
    // case 10:
    //   mode = 0;
    //   break;

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
  } else if (scene == 8 && approachMonster) {
    if (keyCode === 13) {
      monsterAttack = true;
    }
  } else if (scene == 12 && haveTicket) {
    if (keyCode === 13) {
      HE = true;
      BE = false;
    }
  } else if (scene == 15) {
    if (keyCode === 13) {
      scene = 0;
    }
  }
}

function mousePressed() {
  let restart = collidePointRect(mouseX, mouseY, width / 2 - 50, 300, 100, 50);
  if ((restart && scene == 13) || scene == 14) {
    scene = 0;

    // reset
    me.row = width / 2;
    me.col = height / 2;
    haveTicket = false;
    haveLife = false;
    haveScarf = false;
    showFigure = false;
    life.now = 10;
    attackCountdown = 0;
    pick = false;
    pickOffset = 0;
    HE = false;
    BE = false;
    exist = false;
    fadeOffset = 0;
  }
}

/////////////// BE1 Scene 15 ///////////////
function scene15() {
  background(0);
  textSize(30);
  textAlign(CENTER);
  fill(255, 0, 0);
  text("GAME OVER", width / 2, height / 2);
}
