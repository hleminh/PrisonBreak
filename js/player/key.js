class Key {
  constructor(x, y) {
    this.sprite = PrisonBreak.keyGroup.create(x, y, 'key');
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.body.kinematic = true;
  }
}

class KeyTrap{
  constructor(x, y) {
    this.sprite = PrisonBreak.keyTrapGroup.create(x, y, 'key');
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.body.kinematic = true;
  }
}
