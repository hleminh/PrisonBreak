class Saw{
  constructor(x,y, configs, spriteName){
    this.sprite = Nakama.enemyGroup.create(x, y, spriteName);
    this.sprite.update = this.update.bind(this);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.configs = configs;
  }

  update(){
    
  }
}
