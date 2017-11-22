function Player(x, y, size, grav) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.gravity = grav;
  this.bounceForce = 0;
  this.moveDirection = 0;
  this.drop = 0;
  this.hasJump = false;
  this.hasJumped = false;

  this.show = function() {
    fill(255, 0, 155);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, this.size, this.size);
  }

  this.setMoveDirection = function(x){
    this.moveDirection = x;
  }

  this.quickDrop = function(y) {
    this.drop = y;
  }

  this.move = function() {

    if(this.bounceForce < 0) this.bounceForce += 0.2;
    this.y += this.gravity + this.bounceForce + this.drop;
    this.x += this.moveDirection;

  }

  this.jump = function(bounceForce) {
    if(this.hasJump) {
      this.bounceForce = bounceForce;
      this.hasJump = false;
      this.hasJumped = true;
    }
  }
}