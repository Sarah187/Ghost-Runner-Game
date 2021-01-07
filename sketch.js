var ghost, climber, door, tower
var ghostImg, climberImg, doorImg, towerImg
var ghostSound
var doorGroup, climberGroup
var gameState = "play";

function preload(){
  
  ghostSound = loadSound("spooky.wav");
  
  ghostImg = loadAnimation("ghost-jumping.png", "ghost-standing.png");
  
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  
}

function setup() {
  
  createCanvas(600,500);
  
  ghostSound.loop();
  
  doorGroup = createGroup();
  climberGroup = createGroup();
  blockGroup = createGroup();
  
  tower = createSprite(300,200,20,20);
  tower.addImage("tower", towerImg);
  
  ghost = createSprite(200,300,10,10);
  ghost.addAnimation("ghost", ghostImg);
  ghost.scale = 0.3;
  
}

function draw() {
  
  background(100);
  
  if (gameState === "play") {
    
    tower.velocityY = 2;
    
    if (tower.y > 400) {
      tower.y = 300;
  }
    
    if (keyWentDown("space")) {
      ghost.velocityY = -9;
  }
    
    ghost.velocityY = ghost.velocityY + 0.5;
    
    spawnDoors();
    spawnClimbers();
    invisibleBlock();
    
    if (climberGroup.isTouching(ghost)) {
      ghost.velocityY = 0;      
    }
    
    if (blockGroup.isTouching(ghost) || ghost.y>500) {
      ghost.destroy();
      gameState = "end";
    }
    
    if (keyDown("left")) {
      ghost.x=ghost.x-5;
    }
    if (keyDown("right")) {
      ghost.x=ghost.x+5;
    }
    
    drawSprites();
    
  }
  
  if (gameState === "end") {
    background(0);
    
    stroke("white");
    strokeWeight(3);
    textSize(30);
    text("Game Over!!", 200,250); 
    
  }
  
}

function spawnDoors() {
  
  if (frameCount%120 === 0) {
    door = createSprite(200,-50,20,20);
    door.addImage ("door", doorImg);
    door.velocityY = 2;
    door.x = Math.round(random(100,400));
    door.lifetime = 200;
    ghost.depth+=10;
    ghost.depth = door.depth;
    
    doorGroup.add(door);
  } 
  
}

function spawnClimbers() {
  
  if (frameCount%120 === 0) {
    climber = createSprite(200,10,20,20);
    climber.addImage ("climber", climberImg);
    climber.velocityY = 2;
    climber.x = door.x;
    climber.lifetime = 200;
    
    climberGroup.add(door);
  } 
  
}

function invisibleBlock() {
  
  if (frameCount%120 === 0) {
    block = createSprite(200,10,10,10);
    block.velocityY = 2;
    block.x = door.x;
    block.lifetime = 200;
    block.visible = true;
    
    block.debug = true;
    
    blockGroup.add(block);
  } 
  
}
