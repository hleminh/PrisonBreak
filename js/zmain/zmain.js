var PrisonBreak = {};
PrisonBreak.configs = {
  GAME_WIDTH: 20*48,
  GAME_HEIGHT: 15*48,
};

PrisonBreak.game = new Phaser.Game(PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT, Phaser.AUTO, 'gameDiv');

PrisonBreak.game.state.add('boot', bootState);
PrisonBreak.game.state.add('load', loadState);
PrisonBreak.game.state.add('menu', menuState);
PrisonBreak.game.state.add('menuLevel', menuLevelState)
PrisonBreak.game.state.add('stage1', stage1State);
PrisonBreak.game.state.add('stage2', stage2State);
PrisonBreak.game.state.add('stage5', stage5State);
PrisonBreak.game.state.add('win', winState);

PrisonBreak.game.state.start('boot');
