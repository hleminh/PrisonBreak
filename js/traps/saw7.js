class Saw7_1 {

  constructor(x, y, width, height) {
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
    this.CLOCKWISE = true;
    this.WIDTH = width;
    this.HEIGHT = height;
    this.sprite.body.setCircle(this.sprite.width / 2);
    this.startingX = x;
    this.startingY = y;
  }
  update(){
    this.sprite.body.rotation += 30 * PrisonBreak.game.time.physicsElapsed;

    if(this.CLOCKWISE){
      this.DIRECT_VER_RIGHT = true;
      if(this.sprite.x >= this.startingX + this.WIDTH){
        this.DIRECT_VER_RIGHT = false;
        this.DIRECT_HOR_UP = true;
      }
      if(this.sprite.y <= this.startingY - this.HEIGHT) {
        this.CLOCKWISE = false;
        this.DIRECT_HOR_UP = false;
      }
    }
    if(!this.CLOCKWISE){
      this.DIRECT_HOR_DOWN = true;
      if(this.sprite.y >= this.startingY ){
        this.DIRECT_HOR_DOWN = false;
        this.DIRECT_VER_LEFT = true;
      }
      if(this.sprite.x <= this.startingX){
        this.DIRECT_VER_LEFT = false;
        this.CLOCKWISE = true;
      }

    }



    if(this.DIRECT_VER_RIGHT) {
      this.sprite.body.velocity.x = this.SAW_SPEED;
      this.sprite.body.velocity.y = 0;
    } else if(this.DIRECT_VER_LEFT){
      this.sprite.body.velocity.x = -this.SAW_SPEED;
      this.sprite.body.velocity.y = 0
    } else if(this.DIRECT_HOR_UP){
      this.sprite.body.velocity.x = 0;
      this.sprite.body.velocity.y = -this.SAW_SPEED;
    } else if(this.DIRECT_HOR_DOWN){
      this.sprite.body.velocity.x = 0;
      this.sprite.body.velocity.y = this.SAW_SPEED;
    }
  }
}

class Saw7_2{
  constructor(x, y, width, height) {
    this.sprite = PrisonBreak.trapGroup.create(x, y, 'saw1');
    this.sprite.update = this.update.bind(this);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.body.kinematic = true;
    this.sprite.body.clearCollision(true);
    this.sprite.body.setCircle(this.sprite.width / 2);
  }
  update(){
    this.sprite.body.rotation += 30 * PrisonBreak.game.time.physicsElapsed;
  }
}
