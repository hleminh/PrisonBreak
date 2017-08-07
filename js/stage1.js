var stage1State = {
  preload: function() {
    PrisonBreak.game.load.tilemap('stage1', 'assets/stages/stage1.json', null, Phaser.Tilemap.TILED_JSON);
    PrisonBreak.game.load.image('tiles', '/assets/tiles.png');
  },
  create: function() {
    PrisonBreak.keyboard = PrisonBreak.game.input.keyboard;
    map = this.game.add.tilemap('stage1');
    map.addTilesetImage('tiles', 'tiles');

    layer = map.createLayer('Tile Layer 1', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);
    layer.resizeWorld();
    layer.wrap = false;
    var player = new Player(100, 100, {
      up: Phaser.Keyboard.UP,
      down: Phaser.Keyboard.DOWN,
      left: Phaser.Keyboard.LEFT,
      right: Phaser.Keyboard.RIGHT,
      player_speed: 100
    });
  }
}
