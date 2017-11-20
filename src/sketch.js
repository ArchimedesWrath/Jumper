var player;
var platforms = [];
var hits = 0;

function setup() {
  createCanvas(400, 600);
  
  player = new Player(canvas.width / 2, canvas.height / 2, 20, 8);
  
  for(var i = 0; i < 10; i++) {
    platforms.push(new Platform(random(50, canvas.width - 50), random(50, canvas.height - 50)));
  }

}

function draw() {

  background(55);

  player.show();
  player.move();

  playerNext();
  playerDied();

  for(var i = 0; i < platforms.length; i++) {

    platforms[i].show();

    if(player.y >= platforms[i].y - 15 
      && player.y <= platforms[i].y 
      && player.x >= platforms[i].x - 20 
      && player.x <= platforms[i].x + 20) {
      player.bounceForce = -17;
      platforms.splice(i, 1);
      hits++;
      
    }

  }

  cleared();
  
}

function keyReleased() {
  player.setMoveDirection(0);
}

function keyPressed() {
  if(keyCode === LEFT_ARROW) {
    player.setMoveDirection(-5);
  } else if(keyCode === RIGHT_ARROW) {
    player.setMoveDirection(5);
  }

  return 0;
}

function collide() {

  if(player.y >= platform.y - 15 && player.y <= platform.y && player.x >= platform.x - 20 && player.x <= platform.x + 20) {
    return true;
  }

  return false;
}

function playerDied() {

  if(player.y > canvas.height + 100) {
    player.y = canvas.height / 2;
    player.x = canvas.width / 2;
    randomPlatforms();
  } 

}

function playerNext() {
  if(player.y <= 0) {
    player.y = canvas.width - 50;
    randomPlatforms();
  } 
}

function randomPlatforms() {
  platforms = [];
  hits = 0;
  for(var i = 0; i < 10; i++) {
    platforms.push(new Platform(random(50, canvas.width - 50), random(player.x - 50, canvas.height - 50)));
  }

}

function cleared() {
  if(hits === 10) randomPlatforms();
}
