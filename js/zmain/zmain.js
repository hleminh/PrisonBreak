var PrisonBreak = {};
PrisonBreak.configs = {
  GAME_WIDTH: 24*48,
  GAME_HEIGHT: 17*48,
};

PrisonBreak.game = new Phaser.Game(PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT, Phaser.AUTO, 'gameDiv');

PrisonBreak.game.state.add('boot', bootState);
PrisonBreak.game.state.add('load', loadState);
PrisonBreak.game.state.add('menu', menuState);
PrisonBreak.game.state.add('menuLevel', menuLevelState);
PrisonBreak.game.state.add('stage1', stage1State);
PrisonBreak.game.state.add('stage2', stage2State);
PrisonBreak.game.state.add('stage3', stage3State);
PrisonBreak.game.state.add('stage4', stage4State);
PrisonBreak.game.state.add('stage5', stage5State);
PrisonBreak.game.state.add('stage6', stage6State);
PrisonBreak.game.state.add('stage7', stage7State);
PrisonBreak.game.state.add('win', winState);

PrisonBreak.game.state.start('boot');
