class Saw3 {
  constructor(x, y, x1, x2) {
    this.sprite = PrisonBreak.trapGroup.create(x, y, 'saw3');
    this.sprite.update = this.update.bind(this);

    this.sprite.body.collideWorldBounds = true;
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.body.kinematic = true;
    this.SAW_SPEED = 135;
    this.DIRECT;
    this.x1 = x1;
    this.x2 = x2;
    this.sprite.body.setCircle(this.sprite.width / 2);
  }

  update() {
    this.sprite.body.rotation += this.SAW_SPEED * PrisonBreak.game.time.physicsElapsed;
    
    if (this.sprite.x < this.x1) this.DIRECT = false;
    if (this.sprite.x > this.x2) this.DIRECT = true;

    if (this.DIRECT) this.sprite.body.velocity.x = -this.SAW_SPEED;
    else this.sprite.body.velocity.x = this.SAW_SPEED;
  }
}
