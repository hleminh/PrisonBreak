class Saw2 {
  constructor(centerX, centerY, radius, angle) {
    this.sprite = PrisonBreak.trapGroup.create(null, null, 'saw1');

    this.sprite.body.collideWorldBounds = true;
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.body.kinematic = true;
    this.sprite.body.clearCollision(true);
    this.sprite.body.setCircle(this.sprite.width / 2);
    this.SAW_SPEED = 1.6;
    this.DIRECT;
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.angle = angle;

    this.sprite.update = this.update.bind(this);
  }
  update() {
    this.sprite.body.x = this.centerX + Math.cos(this.angle) * this.radius;
    this.sprite.body.y = this.centerY + Math.sin(this.angle) * this.radius;
    this.angle += this.SAW_SPEED * PrisonBreak.game.time.physicsElapsed;
    this.sprite.body.rotation = this.angle;
  }
}
