class Saw7 {

  constructor(x, y) {
    this.sprite = PrisonBreak.trapGroup.create(x, y, 'saw1');
    this.sprite.update = this.update.bind(this);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.body.kinematic = true;
    this.sprite.body.clearCollision(true);
    this.SAW_SPEED = 300;
    this.DIRECT_HOR_UP;
    this.DIRECT_HOR_DOWN;
    this.DIRECT_VER_RIGHT;
    this.DIRECT_VER_LEFT;
    this.sprite.body.setCircle(this.sprite.width / 2);
    this.startingX = x;
    this.startingY = y;
  }
  update(){
    this.sprite.rotation += 30 * PrisonBreak.game.time.physicsElapsed;
    if(this.DIRECT_HOR_UP){
      this.sprite.body.velocity.y = -this.SAW_SPEED;
      this.sprite.body.velocity.x = 0;
      if (this.sprite.y <= this.startingY - 48*2){
        this.DIRECT_VER_UP = false;
        this.DIRECT_HOR_DOWN = true;
      }
    }
    else if(this.DIRECT_HOR_DOWN){
      this.sprite.body.velocity.y = this.SAW_SPEED;
      this.sprite.body.velocity.x = 0;
      if (this.sprite.y >= this.startingY){
        this.DIRECT_HOR_DOWN = false;
        this.DIRECT_VER_LEFT = true;
      }
    }
    else if(this.DIRECT_VER_LEFT){
      this.sprite.body.velocity.y = 0;
      this.sprite.body.velocity.x = -this.SAW_SPEED;
      if(this.sprite.x <= this.startingX){
        this.DIRECT_VER_LEFT = false;
        this.DIRECT_VER_RIGHT = true;
      }
    }
    else if(this.DIRECT_VER_RIGHT){
      this.sprite.body.velocity.y = 0;
      this.sprite.body.velocity.x = this.SAW_SPEED;
      if(this.sprite.x >= this.startingX + 48){
        this.DIRECT_VER_UP = true;
        this.DIRECT_VER_RIGHT = false;
      }
    }
    else {
      this.sprite.body.velocity.y = 0;
      this.sprite.body.velocity.x = this.SAW_SPEED;
      if(this.sprite.x >= this.startingX+48){
        this.DIRECT_VER_RIGHT = false;
        this.DIRECT_HOR_UP = true;
      }
    }
  }
}
