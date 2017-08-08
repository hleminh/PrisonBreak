class Saw {
  constructor(x, y, spriteName, direction) {
    this.sprite = PrisonBreak.trapGroup.create(x, y, spriteName);
    this.sprite.update = this.update.bind(this);

    this.sprite.body.collideWorldBounds = true;
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.body.kinematic = true;
    this.SAW_SPEED = 50;
    this.DIRECT = direction;
    // this.sprite.body.clearCollision(true);
    // this.sprite.body.setCollisionGroup(trapCollisionGroup);
  }

  update() {
    this.sprite.body.rotation += 30;
    if(this.DIRECT)
      this.sprite.body.velocity.y = -this.SAW_SPEED;
    else {
      this.sprite.body.velocity.y =  this.SAW_SPEED;
    }
    if(this.sprite.y <120)
      this.DIRECT = false;
    if(this.sprite.y > 268)
      this.DIRECT = true;
  }
}
