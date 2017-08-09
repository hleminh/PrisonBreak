var loadState = {
  preload: function() {
    var loadingLabel = PrisonBreak.game.add.text(80, 150, 'loading...', {
      font: "30px Courier",
      fill: "#ffffff"
    });

    PrisonBreak.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    PrisonBreak.game.scale.minWidth = PrisonBreak.configs.GAME_WIDTH / 2;
    PrisonBreak.game.scale.minHeight = PrisonBreak.configs.GAME_HEIGHT / 2;
    PrisonBreak.game.scale.maxWidth = PrisonBreak.configs.GAME_WIDTH;
    PrisonBreak.game.scale.maxHeight = PrisonBreak.configs.GAME_HEIGHT;
    PrisonBreak.game.scale.pageAlignHorizontally = true;
    PrisonBreak.game.scale.pageAlignVertically = true;
    PrisonBreak.game.time.advancedTiming = true;

    PrisonBreak.game.load.image('player', 'assets/player.png');
    PrisonBreak.game.load.image('saw1', 'assets/saws/saw_1.png');
    PrisonBreak.game.load.image('saw2', 'assets/saws/saw_2.png');
    PrisonBreak.game.load.image('saw3', 'assets/saws/saw_3.png');
    PrisonBreak.game.load.image('saw4', 'assets/saws/saw_4.png');
    PrisonBreak.game.load.image('saw5', 'assets/saws/saw_5.png');
    PrisonBreak.game.load.image('saw6', 'assets/saws/saw_6.png');

  },

  create: function() {
    PrisonBreak.game.state.start('menu');
  }
};
