
class Saw6 {
  constructor(x, y, x1, x2, y1, y2, side) {
    this.sprite = PrisonBreak.trapGroup.create(x, y, 'saw1');
    this.sprite.update = this.update.bind(this);
    //
    this.sprite.body.collideWorldBounds = true;
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.body.kinematic = true;
    this.sprite.body.clearCollision(true);
    this.SAW_SPEED = 180;
    this.DIRECT_HOR_UP;
    this.DIRECT_HOR_DOWN;
    this.DIRECT_VER_RIGHT;
    this.DIRECT_VER_LEFT;
    this.side = side;
    this.y1 = y1;
    this.y2 = y2;
    this.x1 = x1;
    this.x2 = x2;
    this.sprite.body.setCircle(this.sprite.width / 2);
    if(this.side == 'center') this.DIRECT_VER_LEFT = true;
    if(this.side == 'right') this.DIRECT_HOR_UP = true

  }


  update() {
    this.sprite.body.rotation += 30;

    if(this.DIRECT_VER_RIGHT){
      this.sprite.body.velocity.x = this.SAW_SPEED;
      this.sprite.body.velocity.y = 0;
      if(this.sprite.x >= this.x2){
        if (this.side == 'left' || this.side == 'center'){
          this.DIRECT_VER_RIGHT = false;
          this.DIRECT_HOR_DOWN = true;
        } else {
          this.DIRECT_VER_RIGHT = false;
          this.DIRECT_HOR_UP = true;
        }

      }
    }
    else if(this.DIRECT_HOR_DOWN){
      this.sprite.body.velocity.x = 0;
      this.sprite.body.velocity.y = this.SAW_SPEED;
      this.sprite.x = this.x2;
      if (this.sprite.y >= this.y2) {
        if (this.side == 'left' || this.side == 'center'){
          this.DIRECT_VER_LEFT = true;
          this.DIRECT_HOR_DOWN = false;
        } else {
          this.DIRECT_VER_RIGHT = true;
          this.DIRECT_HOR_DOWN = false;
        }

      }
    }
    else if(this.DIRECT_VER_LEFT){
      this.sprite.body.velocity.x = -this.SAW_SPEED;
      this.sprite.body.velocity.y = 0;
      if(this.sprite.x <= this.x1){
        if (this.side == 'left' || this.side == 'center'){
          this.DIRECT_VER_LEFT = false;
          this.DIRECT_HOR_UP = true;
        } else {
          this.DIRECT_VER_LEFT = false;
          this.DIRECT_HOR_DOWN = true;
        }

      }
    }
    else if(this.DIRECT_HOR_UP){
      this.sprite.body.velocity.y = -this.SAW_SPEED;
      this.sprite.body.velocity.x = 0;
      if(this.sprite.y <= this.y1){
        if (this.side == 'left' || this.side == 'center'){
          this.DIRECT_HOR_UP = false;
          this.DIRECT_VER_RIGHT = true;
        } else{
          this.DIRECT_HOR_UP = false;
          this.DIRECT_VER_LEFT = true;
        }

      }
    }
    else {
      this.sprite.body.velocity.y = -this.SAW_SPEED;
      this.sprite.body.velocity.x = 0;
      if(this.sprite.y <= this.y1){
        if (this.side == 'left' || this.side == 'center')
          this.DIRECT_VER_RIGHT = true;
        else
          this.DIRECT_VER_LEFT = true;
      }
    }



  }
}
