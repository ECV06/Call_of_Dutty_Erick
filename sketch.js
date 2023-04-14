var bg,bgImg;
var player, shooterImg, shooter_shooting;
var enemy1, enemyImg, enemy_group;
var botiquin, botiquinImg;
var laser,laser_group, obstacles, obstaclesImg;
var bombas, bombasImg;
var p_d,p_i,walk_d,walk_i;
var gameOver,gameOverImg,restart,restartImg;

var bgSound, laserSound, bombasSound, enemySound, deadSound, winSound,
explosion;
var gameState = "PLAY";

var vidas = 3;
var score = 0;

function preload(){ 
  walk_d = loadAnimation("assets/sprite-1.png","assets/sprite-2.png","assets/sprite-3.png","assets/sprite-4.png",)
  shooter_shooting = loadAnimation("assets/sprite1.png","assets/sprite2.png","assets/sprite3.png","assets/sprite4.png");
  p_d = loadAnimation("assets/sprite1.png","assets/sprite4.png");
  //p_i = loadAnimation("assets/sprite1.png","assets/sprite4.png");
  //bgSound = loadSound("nombre del archivo de sonido")
  //laserSound=loadSound("")
  enemyImg= loadImage("assets/marciano1.png");
  restartImg = loadImage(r.png);
  gameOverImg = loadImage(gameOver.png);
  bgImg = loadImage("assets/bg.jpeg");

}

function setup() {
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
  bg.addImage(bgImg);
  bg.scale = 1.1;
  
//creating the player sprite
 player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addAnimation("stand",p_d);
 player.addAnimation("walking",walk_d);
 player.addAnimation("shooting",shooter_shooting);
 //player.addAnimation("stand_i",p_i);
   player.scale = 1;
   player.debug = true;
   player.setCollider("rectangle",0,0,200,200);
 
  enemy1=createSprite(displayWidth+1150, displayHeight-300,50,50);
  enemy1.addImage(enemyImg);
  enemy1.scale = 1;

  laser_group = new Group();
  enemy_group = new Group();

  gameOver=createSprite(width/2,height/2-200)
  gameOver.addImage(gameOverImg);
  gameOver.visible=false;

  restart=createSprite(width/2,height/2-160)
  restart.addImage(restartImg);
  restart.scale=0.4;
  restart.visible=false;
  console.log(windowWidth);
  

}

function draw() {
  background(0);
  
  if(gameState === "PLAY"){
    restart.visible=false;
    gameOver.visible=false;
    if (player.collide(enemy1)) {
      vidas = vidas-1;
      enemy1.destroy();
      //deadSound.play();
    }
    if (player.collide(botiquin)) {
      vidas = vidas + 1;
      botiquin.destroy();
    }
    if (laser.collide(enemy1)) {
      score = score + 1;
      enemy1.destroy();
      //explosion.play();
    }

    if(life===3){
      heart3.visible = true
      heart1.visible = false
      heart2.visible = false
    }
    if(life===2){
      heart2.visible = true
      heart1.visible = false
      heart3.visible = false
    }
    if(life===1){
      heart1.visible = true
      heart3.visible = false
      heart2.visible = false
    }

     //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.changeAnimation("shooting");
  player.changePosition(player,0,-5)
}
if(keyDown("DOWN_ARROW")||touches.length>0){
  player.changeAnimation("shooting");
  player.changePosition(player,0,5);
}
if(keyIsDown("RIGHT_ARROW")||touches.length>0){
  player.changeAnimation("walking");
  player.changePosition(player,5,0)
 }
 if(keyIsDown("LEFT_ARROW")||touches.length>0){
  player.changeAnimation("walking");
  player.changePosition(player,-5,0)
 }
 if(keyWentUp("RIGHT_ARROW")||touches.length>0){
  player.changeAnimation("stand");
 }
 if(keyWentUp("LEFT_ARROW")||touches.length>0){
  player.changeAnimation("stand");
 }

 if(keyWentDown("space")){
  laser = createSprite(displayWidth-1150,player.y-30,20,10)
  laser.velocityX = 20
  laser_group.add(laser)
  
  player.depth = laser.depth
  player.depth = player.depth+2
  player.changeAnimation("shooting");
  //laserSound.play();
 
}
//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.changeAnimation("stand");
}

 if(vidas <= 0){
  gameState = "END";
 }
  }else if(gameState === "END"){
    restart.visible=true;
    gameOver.visible=true;
  
    if(mousePressedOver(restart)){
    gameState = "PLAY";
    reiniciar();
    }
  }

drawSprites();

if (gameState === "END") {
  fill("blue")
  text("¡¡¡Has perdido!!!", width / 2 - 100, height / 2);
}

//retroalimentación al usuario
textSize(20)
fill("white")
text("Puntuación = " + score,displayWidth-200,displayHeight/2-220)
text("Vidas = " + vidas,displayWidth-200,displayHeight/2-280)


}

//crear funcion para spawnear enemigos

//crear funcion para spawnear botiquines,recompensas

//crear funcion para restar vidas

