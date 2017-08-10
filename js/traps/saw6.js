class Saw6 {
  constructor(x, y, x1, x2, y1, y2) {
    this.sprite = PrisonBreak.trapGroup.create(x, y, 'saw1');
    this.sprite.update = this.update.bind(this);

    this.sprite.body.collideWorldBounds = true;
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    // this.sprite.body.kinematic = true;
    // this.sprite.body.clearCollision(true);
    this.SAW_SPEED = 135;
    this.DIRECT_HOR_UP;
    this.DIRECT_HOR_DOWN = true;
    this.DIRECT_VER_RIGHT;
    this.DIRECT_VER_LEFT;
    this.y1 = y1;
    this.y2 = y2;
    this.x1 = x1;
    this.x2 = x2;
    this.sprite.body.setCircle(this.sprite.width / 2);
  }

  update() {
    this.sprite.body.rotation += 30;
    if(this.sprite.y >= this.y2 && this.sprite.x <= this.x1){
      this.DIRECT_HOR_UP = false;
      this.DIRECT_HOR_DOWN = false;
      this.DIRECT_VER_RIGHT = true;
      this.DIRECT_VER_LEFT = false;
    }
    if(this.sprite.x >= this.x2 && this.sprite.y >= this.y2){
      this.DIRECT_HOR_UP = true;
      this.DIRECT_HOR_DOWN = false;
      this.DIRECT_VER_RIGHT = false;
      this.DIRECT_VER_LEFT = false;
    }
    if(this.sprite.y <= this.y1 && this.sprite.x >= this.x2){
      this.DIRECT_HOR_UP = false;
      this.DIRECT_HOR_DOWN = false;
      this.DIRECT_VER_RIGHT = false;
      this.DIRECT_VER_LEFT = true;
    }
    if(this.sprite.x <= this.x1 && this.sprite.y <= this.y1){
      this.DIRECT_HOR_UP = false;
      this.DIRECT_HOR_DOWN = true;
      this.DIRECT_VER_RIGHT = false;
      this.DIRECT_VER_LEFT = false;
    }

    if(this.DIRECT_HOR_UP){
      this.sprite.body.velocity.y = -this.SAW_SPEED;
    }
    else if(this.DIRECT_HOR_DOWN){
      this.sprite.body.velocity.y = this.SAW_SPEED;
    } else{
      this.sprite.body.velocity.x = 0;
    }

    if(this.DIRECT_VER_RIGHT){
      this.sprite.body.velocity.x = this.SAW_SPEED;
    }
    else if(this.DIRECT_VER_LEFT){
      this.sprite.body.velocity.x = -this.SAW_SPEED;
    } else {
      this.sprite.body.velocity.y = 0;
    }
  }
}
