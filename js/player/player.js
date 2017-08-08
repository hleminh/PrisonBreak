class Player {
  constructor(x, y, configs) {
    this.configs = configs;
    this.sprite = PrisonBreak.playerGroup.create(x, y, 'player');
    this.sprite.body.collideWorldBounds = true;
    this.sprite.update = this.update.bind(this);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.body.fixedRotation = true;
  }

  update() {
    if (PrisonBreak.keyboard.isDown(this.configs.left)) {
      this.sprite.body.velocity.x = -this.configs.player_speed;
    } else if (PrisonBreak.keyboard.isDown(this.configs.right)) {
      this.sprite.body.velocity.x = this.configs.player_speed;
    } else this.sprite.body.velocity.x = 0;
    if (PrisonBreak.keyboard.isDown(this.configs.up)) {
      this.sprite.body.velocity.y = -this.configs.player_speed;
    } else if (PrisonBreak.keyboard.isDown(this.configs.down)) {
      this.sprite.body.velocity.y = this.configs.player_speed;
    } else this.sprite.body.velocity.y = 0;
  }
}
