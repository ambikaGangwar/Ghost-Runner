var tower, towerImg;
var door, doorImg;
var doorsGroup;
var ghost, ghostImg;
var climber, climberImg, climbersGroup;
var invisibleBlock,invisibleBlockGroup;
var gamestate="PLAY";
var spookysound;



function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  spookysound=loadSound("spooky.wav");


}

function setup() {

  createCanvas(600, 600);
  
  spookysound.loop();

  tower = createSprite(300, 300);
  tower.addImage(towerImg);
  tower.velocityY = 1;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup=new Group();
}

function draw() {
  background("lightBlue");

  if(gamestate==="PLAY"){
    
    
  
  
  if (tower.y > 400) {
    tower.y = 300;
  }
  
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-5;
  }
   if(keyDown("space")){
   ghost.velocityY= -5;
  }
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+5;
  }
  
  ghost.velocityY=ghost.velocityY+0.8;
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gamestate="END";
  }
     
     
  spawndoors();
  drawSprites();
  }
  
  if(gamestate==="END"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GAME_OVER",230,250);
  }
  fill("white");
  text(mouseX + "," + mouseY, mouseX, mouseY);
  
  
}

function spawndoors() {

  if (frameCount % 240 === 0) {
    door = createSprite(200, -50);
    door.addImage(doorImg);

    climber = createSprite(200, 10);
    climber.addImage(climberImg);
    
    invisibleblock=createSprite(200,15);
    invisibleblock.width=climber.width;
     invisibleblock.height=2;
    
    
    door.x = Math.round(random(120, 400));
    door.velocityY = 1;
    
    climber.velocityY = 1;
     invisibleblock.velocityY=1;
    
    climber.x = door.x;
    invisibleblock.x=door.x;
    
    ghost.depth=door.depth;
    ghost.depth+=1;
     
    door.lifetime = 500;
    climber.lifetime = 500;
    
     
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleblock.debug=true;
     invisibleBlockGroup.add(invisibleblock);
    

  }

}