var menuState = {
  create: function() {
    var nameLabel = PrisonBreak.game.add.text(80, 80, 'Prison Break', {
      font: "50px Arial",
      fill: "#ffffff"
    });

    var startLabel = PrisonBreak.game.add.text(80, PrisonBreak.configs.GAME_HEIGHT - 80, 'Press Enter to start', {
      font: "25px Arial",
      fill: "#ffffff"
    });

    var enterKey = PrisonBreak.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.addOnce(this.start, this);
  },
  start: function(){
    PrisonBreak.game.state.start('stage1');

  }
}
