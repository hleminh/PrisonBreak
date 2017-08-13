var winState = {
  create: function() {
    PrisonBreak.game.stage.backgroundColor = '#00000';
    PrisonBreak.player = PrisonBreak.game.add.sprite(250, PrisonBreak.configs.GAME_HEIGHT - 90, 'player' );
    PrisonBreak.player.scale.setTo(2, 2);
    PrisonBreak.prison = PrisonBreak.game.add.sprite(576, 407.8, 'prisonHouse');
    PrisonBreak.prison.anchor = new Phaser.Point(0.5, 0.5);
    var nameLabel = PrisonBreak.game.add.text(370, 80, 'YOU WON!!!', {
      font: "70px Arial",
      fill: "#ffffff"
    });

    var startLabel = PrisonBreak.game.add.text(450, PrisonBreak.configs.GAME_HEIGHT - 650, 'Press Enter to restart', {
      font: "25px Arial",
      fill: "#ffffff"
    });

    var enterKey = PrisonBreak.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.addOnce(this.start, this);
  },
  start: function(){
    PrisonBreak.deathCount = 0;
    PrisonBreak.game.state.start('stage1');
  },
  update(){
    if(PrisonBreak.player.position.x <= PrisonBreak.configs.GAME_WIDTH - 210){
      PrisonBreak.player.position.x += 5;
    }
  }
}
