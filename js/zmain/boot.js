var bootState = {
  create: function() {
    PrisonBreak.game.physics.startSystem(Phaser.Physics.P2JS);
    PrisonBreak.game.scale.windowConstraints.bottom = "visual";
    PrisonBreak.game.state.start('load');

  }
}
