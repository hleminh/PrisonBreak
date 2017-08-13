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
    PrisonBreak.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    PrisonBreak.game.load.image('player', 'assets/player.png');
    PrisonBreak.game.load.image('collapse', 'assets/collapse.png');
    PrisonBreak.game.load.image('key', 'assets/key.png');
    PrisonBreak.game.load.image('saw1', 'assets/saws/saw_1.png');
    PrisonBreak.game.load.image('saw2', 'assets/saws/saw_2.png');
    PrisonBreak.game.load.image('saw3', 'assets/saws/saw_3.png');
    PrisonBreak.game.load.image('saw4', 'assets/saws/saw_4.png');
    PrisonBreak.game.load.image('saw5', 'assets/saws/saw_5.png');
    PrisonBreak.game.load.image('saw6', 'assets/saws/saw_6.png');
    PrisonBreak.game.load.image('saw_evil', 'assets/saws/saw_evil.png');
    PrisonBreak.game.load.image('background_lock', 'assets/bgs/lock_pg.png');
    PrisonBreak.game.load.image('background_unlock', 'assets/bgs/unlock_bg.png');
    PrisonBreak.game.load.audio('death','assets/sound/Player_Hit_1.wav');
    PrisonBreak.game.load.audio('saw','assets/sound/Item_13.wav');
    PrisonBreak.game.load.audio('coin','assets/sound/Coins.wav');
    PrisonBreak.game.load.audio('background','assets/sound/background.ogg');
    PrisonBreak.game.load.audio('scream','assets/sound/scream.ogg');
    PrisonBreak.game.load.audio('unlock','assets/sound/Unlock.wav');
    PrisonBreak.game.load.image('blood1', 'assets/blood/blood1.png');
    PrisonBreak.game.load.image('blood2', 'assets/blood/blood2.png');
    PrisonBreak.game.load.image('blood3', 'assets/blood/blood3.png');
    PrisonBreak.game.load.image('blood4', 'assets/blood/blood4.png');
    PrisonBreak.game.load.image('blood5', 'assets/blood/blood5.png');

  },

  create: function() {
    PrisonBreak.deathSound = PrisonBreak.game.add.audio('death');
    PrisonBreak.sawSound = PrisonBreak.game.add.audio('saw');
    PrisonBreak.coinSound = PrisonBreak.game.add.audio('coin');
    PrisonBreak.backgroundSound = PrisonBreak.game.add.audio('background');
    PrisonBreak.screamSound = PrisonBreak.game.add.audio('scream');
    PrisonBreak.unlockSound = PrisonBreak.game.add.audio('unlock');
    PrisonBreak.backgroundSound.loop = true;
    PrisonBreak.backgroundSound.volume = 0.3;
    PrisonBreak.game.state.start('menu');
  }
};
