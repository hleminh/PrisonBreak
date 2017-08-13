var winState = {
  create: function() {
    this.done = false;
    PrisonBreak.game.stage.backgroundColor = '#00000';
    PrisonBreak.player = PrisonBreak.game.add.sprite(250, PrisonBreak.configs.GAME_HEIGHT - 90, 'player');
    PrisonBreak.player.scale.setTo(2, 2);
    PrisonBreak.prison = PrisonBreak.game.add.sprite(576, 407.8, 'prisonHouse');
    PrisonBreak.prison.anchor = new Phaser.Point(0.5, 0.5);
    PrisonBreak.game.physics.p2.enable(PrisonBreak.player);
    PrisonBreak.player.body.velocity.x = 400;

  },
  start: function() {
    PrisonBreak.deathCount = 0;
    PrisonBreak.game.state.start('stage1');
  },
  fadeComplete: function() {
    PrisonBreak.prison.destroy();
    PrisonBreak.player.destroy();
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
    var i = 1;

    for (var score of PrisonBreak.highScore) {
      PrisonBreak.game.add.text(470, PrisonBreak.configs.GAME_HEIGHT - 600 + i * 50, 'Stage ' + i + ': ', {
        font: "25px Arial",
        fill: "#ffffff"
      });

      if (PrisonBreak.highScore[i - 1].death != null) {
        PrisonBreak.game.add.text(470 + 100, PrisonBreak.configs.GAME_HEIGHT - 600 + i * 50,
          PrisonBreak.highScore[i - 1].death + ' death(s)', {
            font: "25px Arial",
            fill: "#ffffff"
          });
      } else {
        PrisonBreak.game.add.text(470 + 100, PrisonBreak.configs.GAME_HEIGHT - 600 + i * 50,
          'Not Played', {
            font: "25px Arial",
            fill: "#ffffff"
          });
      }

      i++;
    }
  },

  update() {
    if (!this.done) {
      if (PrisonBreak.player.position.x <= PrisonBreak.configs.GAME_WIDTH - 60) {
      } else {
        PrisonBreak.player.body.velocity.x = 0;

        this.done = true;
        PrisonBreak.game.add.tween(PrisonBreak.player).to({
          alpha: 0
        }, 500, Phaser.Easing.Linear.None, true);
        PrisonBreak.game.add.tween(PrisonBreak.prison).to({
          alpha: 0
        }, 500, Phaser.Easing.Linear.None, true);
        PrisonBreak.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.fadeComplete, this);
      }
    }

  }
}
