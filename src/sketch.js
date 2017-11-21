var player;
var platforms = [];
var hits = 0;
var jumps = 0;
var next = 0;
var cleared = 0;
var score = 0;
var paused = false;
var difficulty;
var holdLeft=holdRight=false;
var tutorial = false;
var inTutorial = false;

//Platform starting dimensions
var w = 40; 
var h = 10;

function setup() {
  createCanvas(400, 600);
  
  player = new Player(canvas.width / 2, canvas.height / 2, 20, 8);
  
  for(var i = 0; i < 10; i++) {
    platforms.push(new Platform(random(50, canvas.width - 50), random(50, canvas.height - 50), w, h));
  }

}

function draw() {

  background(55);
  
  game();
  playerScore();
  inputs();
  pauseGame();

  if(jumps % 5 === 0 && !player.hasJumped) player.hasJump = true;
  if(player.hasJump) {
    fill(0, 155, 255);
    noStroke();
    ellipse(canvas.width - 20, 20, 10, 10);
  }

  intro();
  
}

function inputs() {
  if(holdRight) {
    player.setMoveDirection(5);
  } else if(holdLeft) {
    player.setMoveDirection(-5);
  } else if(!holdRight && !holdLeft) {
    player.setMoveDirection(0);
  }
}

function keyReleased() {

  if(keyCode === DOWN_ARROW) {
    player.quickDrop(0);
  } else if(keyCode === LEFT_ARROW) {
    holdLeft = false;
  } else if(keyCode === RIGHT_ARROW) {
    holdRight = false;
  }
}

function keyPressed() {
  //This code should be in a switch statement
  if(keyCode === LEFT_ARROW) {
    holdLeft = true;
  } else if(keyCode === RIGHT_ARROW) {
    holdRight = true;
  } else if(keyCode === UP_ARROW) {
    player.jump();
  } else if(keyCode === 32) {
    pause();
  } else if(keyCode === 83) {
    if(!tutorial) {
      tutorial = true;
      inTutorial = false;
      loop();
    }
  }

  //Make fast falling work
  //else if(keyCode === DOWN_ARROW && player.bounceForce >= -2) {
  //  player.quickDrop(10);
  //}

  return 0;
}

function playerDied() {

  if(player.y > canvas.height + 100) {
    //endGame();
    player.y = canvas.height / 2;
    player.x = canvas.width / 2;
    randomPlatforms();
  } 

}

function playerNext() {
  if(player.y <= 0) {
    player.y = canvas.width - 50;
    next++;
    randomPlatforms();
  } 
}

function randomPlatforms() {
  platforms = [];
  hits = 0;
  for(var i = 0; i < 10; i++) {
    platforms.push(new Platform(random(50, canvas.width - 50), random(player.x - 50, canvas.height - 50), w, h));
  }

}

function playerCleared() {
  if(hits === 10) {
    cleared++;
    randomPlatforms();
  } 
}

function pause() {
  if(paused === false) {
    paused = true;
    noLoop();
    console.log('Total jumps: ' + jumps + ', total new scenes: ' + next + ', total scenes cleared: ' + cleared);
    console.log('Current difficulty: ' + difficulty + ', Current width: ' + w);
  } else if(paused === true) {
    paused = false
    loop();
  }
}

//Can make this into powerup
function playerOffside() {
  if(player.x >= canvas.width) {
    player.x = canvas.width - 10;
    holdRight = false;
  } else if(player.x <= 0) {
    player.x = 10;
    holdLeft = false;
  }
}

function pauseGame() {
  if(paused === true) {

    fill(155, 100);
    rect(0, 0, 1600, 2400);
    textSize(32);
    fill(255, 255, 255);
    textAlign(CENTER);
    text('paused', canvas.width / 2, canvas.height / 4);
  }
}

function playerScore() {
  score = (jumps * 100) + (next * 100) + (cleared * 200);
  textSize(12);
  fill(222, 222, 222);
  textAlign(LEFT);
  text(score, 10, 15);
}

function game() {
  player.show();
  player.move();
  playerNext();
  playerOffside();
  playerCleared();
  playerDied();

  for(var i = 0; i < platforms.length; i++) {

    platforms[i].show();

    if(player.y >= platforms[i].y - 15 
      && player.y <= platforms[i].y 
      && player.x >= platforms[i].x - 20 
      && player.x <= platforms[i].x + 20) {
      player.hasJumped = false;
      player.bounceForce = -17;
      platforms.splice(i, 1);
      hits++;
      jumps++;
      
      //Fixes the platform flash
      for(var j = 0; j < platforms.length; j++) platforms[j].show(); 

    }

    
  }  
}

function addDifficulty() {

}

function intro() {
  if(!tutorial) {
    noLoop();
    inTutorial = true;
    fill(0, 155);
    rect(0, 0, 1600, 2400);
    textSize(32);
    fill(255, 255, 255);
    textAlign(CENTER);
    text('Hey', canvas.width / 2, canvas.height / 4);
    textAlign(CENTER);
    textSize(15);
    text('Left and Right arrow keys move.', canvas.width / 2, canvas.height / 5 + 100);
    textAlign(CENTER);
    text('Up arrow key allows you a free jump.', canvas.width / 2, canvas.height / 5 + 125);
    text('Spacebar to pause the game.', canvas.width / 2, canvas.height / 5 + 150);
    text('You bounce off platforms.', canvas.width / 2, canvas.height / 5 + 175);
    text('Every platform you bounce off dissapears.', canvas.width / 2, canvas.height / 5 + 200);
    text('Generate new platforms either by', canvas.width / 2, canvas.height / 5 + 225);
    text('jumping up to the next scene or', canvas.width / 2, canvas.height / 5 + 250)
    text('clearing the current screen of all platforms.', canvas.width / 2, canvas.height / 5 + 270);
    text('Every 20 bounces off a platform gives you a free jump.', canvas.width / 2, canvas.height / 5 + 300);
    text('Game gets harder over time.', canvas.width / 2, canvas.height / 5 + 325);
    text('Press \'s\' to start game', canvas.width / 2, canvas.height / 5 + 400);
    } 
}
