class Saw4 {
  constructor(x, y, width, height, clockwise) {
    this.sprite = PrisonBreak.trapGroup.create(x, y, 'saw4');
    this.sprite.body.collideWorldBounds = true;
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.body.kinematic = true;
    this.SAW_SPEED = 135;
    this.clockwise = clockwise;
    this.x = x+0.00001;
    this.y = y+0.00001;
    this.WIDTH = width;
    this.HEIGHT = height;
    this.HOR;
    this.VER;
    this.sprite.body.setCircle(this.sprite.width / 2);
    this.sprite.update = this.update.bind(this);
  }
  update() {
    this.sprite.body.rotation += this.SAW_SPEED * PrisonBreak.game.time.physicsElapsed;

    if(this.sprite.body.x < this.x)                   this.HOR = false;
    if(this.sprite.body.x > this.x + this.WIDTH)      this.HOR = true;
    if(this.sprite.body.y < this.y)                   this.VER = false;
    if(this.sprite.body.y > this.y + this.HEIGHT)     this.VER = true;

    if(this.clockwise){
      if(this.HOR == false && this.VER == false)      {this.sprite.body.velocity.x = this.SAW_SPEED; this.sprite.body.velocity.y = 0;}
      else if(this.HOR == true && this.VER == false)  {this.sprite.body.velocity.x = 0; this.sprite.body.velocity.y = this.SAW_SPEED;}
      else if(this.HOR == true && this.VER == true)   {this.sprite.body.velocity.x = -this.SAW_SPEED; this.sprite.body.velocity.y = 0;}
      else                                            {this.sprite.body.velocity.x = 0; this.sprite.body.velocity.y = -this.SAW_SPEED;}
    }

    else {
      if(this.HOR == false && this.VER == false)      {this.sprite.body.velocity.x = 0; this.sprite.body.velocity.y = this.SAW_SPEED;}
      else if(this.HOR == true && this.VER == false)  {this.sprite.body.velocity.x = -this.SAW_SPEED; this.sprite.body.velocity.y = 0;}
      else if(this.HOR == true && this.VER == true)   {this.sprite.body.velocity.x = 0; this.sprite.body.velocity.y = -this.SAW_SPEED;}
      else                                            {this.sprite.body.velocity.x = this.SAW_SPEED; this.sprite.body.velocity.y = 0;}
    }
  }
}
