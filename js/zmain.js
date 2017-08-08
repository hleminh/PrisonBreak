var PrisonBreak = {};
PrisonBreak.configs = {
  GAME_WIDTH: 900,
  GAME_HEIGHT: 600,
};

PrisonBreak.game = new Phaser.Game(PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT, Phaser.AUTO, 'gameDiv');

PrisonBreak.game.state.add('boot', bootState);
PrisonBreak.game.state.add('load', loadState);
PrisonBreak.game.state.add('menu', menuState);
PrisonBreak.game.state.add('stage1', stage1State);
PrisonBreak.game.state.add('win', winState);

PrisonBreak.game.state.start('boot');
