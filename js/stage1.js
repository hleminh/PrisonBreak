var stage1State = {
  preload: function() {
    PrisonBreak.game.load.tilemap('stage1', 'assets/stages/stage1.json', null, Phaser.Tilemap.TILED_JSON);
    PrisonBreak.game.load.image('tiles', '/assets/tiles.png');
  },
  create: function() {
    PrisonBreak.keyboard = PrisonBreak.game.input.keyboard;
    PrisonBreak.playerGroup = PrisonBreak.game.add.physicsGroup(Phaser.Physics.P2JS);
    PrisonBreak.trapGroup = PrisonBreak.game.add.physicsGroup(Phaser.Physics.P2JS);
    // PrisonBreak.game.physics.p2.setImpactEvents(true);
    PrisonBreak.game.physics.p2.restitution = 0.8;

    PrisonBreak.game.physics.p2.updateBoundsCollisionGroup();

    map = this.game.add.tilemap('stage1');
    map.addTilesetImage('tiles', 'tiles');

    groundLayer = map.createLayer('Tile Layer 1', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);
    wallLayer = map.createLayer('Tile Layer 2', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);
    startLayer = map.createLayer('Tile Layer 3', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);
    endLayer = map.createLayer('Tile Layer 4', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);



    PrisonBreak.game.physics.p2.setBoundsToWorld(true, true, true, true, false);

    var player = new Player(100, 200, {
      up: Phaser.Keyboard.UP,
      down: Phaser.Keyboard.DOWN,
      left: Phaser.Keyboard.LEFT,
      right: Phaser.Keyboard.RIGHT,
      player_speed: 180
    });

    var saw = new Saw(215, 190, 'saw1', true);
    var saw = new Saw(311, 190, 'saw1', false);
    var saw = new Saw(407, 190, 'saw1', true);
    var saw = new Saw(503, 190, 'saw1', false);

    PrisonBreak.game.world.bringToTop(PrisonBreak.playerGroup);
    PrisonBreak.game.world.bringToTop(PrisonBreak.trapGroup);



    map.setCollision([3, 2, 4, 35, 36], true, wallLayer);
    PrisonBreak.game.physics.p2.convertTilemap(map, wallLayer);


  },
  render() {

  }
}
