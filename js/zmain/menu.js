var move;
var menuState = {
  create: function() {
    PrisonBreak.game.stage.backgroundColor = '#ffffff';
    PrisonBreak.player = PrisonBreak.game.add.sprite(250, PrisonBreak.configs.GAME_HEIGHT - 278, 'player' );
    PrisonBreak.player.scale.setTo(3, 3);
    PrisonBreak.background = PrisonBreak.game.add.sprite(0, 0, 'background_lock');

    PrisonBreak.deathCount = 0;
    move = true;
    var nameLabel = PrisonBreak.game.add.text(300, 70, 'PRISON BREAK', {
      font: "70px Arial",
      fill: "#ffffff"
    });
    var startLabel = PrisonBreak.game.add.text(250, PrisonBreak.configs.GAME_HEIGHT - 150, 'Play Game', {
      font: "50px Arial",
      fill: "#ffffff"
    });
    startLabel.inputEnabled = true;
    startLabel.events.onInputUp.addOnce(this.start, this);

    var menuLevelLable = PrisonBreak.game.add.text(620, PrisonBreak.configs.GAME_HEIGHT - 150, 'Select Level', {
      font: "50px Arial",
      fill: "#ffffff"
    })
    menuLevelLable.inputEnabled = true;
    menuLevelLable.events.onInputUp.addOnce(this.menuLevel, this);

  },
  start: function() {
    PrisonBreak.background.loadTexture('background_unlock', 0, false);
    PrisonBreak.unlockSound.play();
    move = false;
    // this.fadePlayer = function() {
      PrisonBreak.game.add.tween(PrisonBreak.player).to({
        alpha: 0
      }, 2000, Phaser.Easing.Linear.None, true);
      PrisonBreak.game.time.events.add(Phaser.Timer.SECOND * 1, this.fadeComplete, this);
    // };

  },
  fadeComplete: function () {
    PrisonBreak.game.state.start('stage1');
    if (! PrisonBreak.backgroundSound.isPlaying) {
      PrisonBreak.backgroundSound.play();
    }
  },
  menuLevel: function() {
    PrisonBreak.game.state.start('menuLevel');
  },
  update(){
      if(move){
        if(PrisonBreak.player.position.x >= PrisonBreak.configs.GAME_WIDTH - 350) this.DIRECT = false;
        if(PrisonBreak.player.position.x <= 250) this.DIRECT = true;

        if(this.DIRECT) PrisonBreak.player.position.x += 2;
        else PrisonBreak.player.position.x -= 2;
      } else if(!move){
        if(PrisonBreak.player.position.x >= PrisonBreak.configs.GAME_WIDTH - 550) PrisonBreak.player.position.x -= 5;
        if(PrisonBreak.player.position.x <= PrisonBreak.configs.GAME_WIDTH - 550) PrisonBreak.player.position.x += 5;
      }

  }
}
