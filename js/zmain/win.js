var winState = {
  create: function() {
    var nameLabel = PrisonBreak.game.add.text(80, 80, 'You won', {
      font: "50px Arial",
      fill: "#ffffff"
    });

    var startLabel = PrisonBreak.game.add.text(80, PrisonBreak.configs.GAME_HEIGHT - 80, 'Press Enter to restart', {
      font: "25px Arial",
      fill: "#ffffff"
    });

    var enterKey = PrisonBreak.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.addOnce(this.start, this);
  },
  start: function(){
    PrisonBreak.deathCount = 0;
    PrisonBreak.game.state.start('stage1');

  }
}
