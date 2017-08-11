var stage5State = {
  preload: function() {
    PrisonBreak.game.load.tilemap('stage6', 'assets/stages/stage6.json', null, Phaser.Tilemap.TILED_JSON);
    PrisonBreak.game.load.image('tiles', 'assets/tiles.png');
  },
  create: function() {
    this.startingX = 315+ 48 * 2;
    this.startingY = 215;

    // PrisonBreak.game.physics.p2.setImpactEvents(true);
    PrisonBreak.game.physics.p2.restitution = 0.0;

    // PrisonBreak.game.physics.p2.updateBoundsCollisionGroup();

    map = this.game.add.tilemap('stage6');
    map.addTilesetImage('tiles', 'tiles');

    groundLayer = map.createLayer('Tile Layer 1', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);
    wallLayer = map.createLayer('Tile Layer 2', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);
    startLayer = map.createLayer('Tile Layer 3', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);
    endLayer = map.createLayer('Tile Layer 4', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);
    // map.setCollision(114, true, endLayer);
    // PrisonBreak.game.physics.p2.convertTilemap(map, endLayer);
    map.setCollision([1, 3, 2, 4, 33, 34, 35, 36, 69, 70, 115, 116], true, wallLayer);
    PrisonBreak.game.physics.p2.convertTilemap(map, wallLayer);

    groundLayer.resizeWorld();

    PrisonBreak.keyboard = PrisonBreak.game.input.keyboard;
    PrisonBreak.playerGroup = PrisonBreak.game.add.physicsGroup(Phaser.Physics.P2JS);
    PrisonBreak.trapGroup = PrisonBreak.game.add.physicsGroup(Phaser.Physics.P2JS);
    PrisonBreak.keyGroup = PrisonBreak.game.add.physicsGroup(Phaser.Physics.P2JS);

    var menu = PrisonBreak.game.add.text(100, 18, 'MENU', {
      font: '24px Arial',
      fill: '#fff'
    });

    menu.inputEnabled = true;
    menu.events.onInputUp.addOnce(function() {
      PrisonBreak.game.state.start('menu');
    }, this);

    PrisonBreak.game.add.text(PrisonBreak.configs.GAME_WIDTH - 200, 18, 'DEATHS: ', {
      font: '24px Arial',
      fill: '#fff'
    });

    PrisonBreak.game.add.text(PrisonBreak.configs.GAME_WIDTH/2 - 45, 18, 'STAGE 5', {
      font: '24px Arial',
      fill: '#fff'
    });

    this.deathLabel = PrisonBreak.game.add.text(PrisonBreak.configs.GAME_WIDTH - 90, 18, PrisonBreak.deathCount.toString(), {
      font: '24px Arial',
      fill: '#fff'
    });

    PrisonBreak.game.physics.p2.setBoundsToWorld(true, true, true, true, false);

    endGroup = PrisonBreak.game.add.group();
    endGroup.add(endLayer);

    this.player = new Player(this.startingX, this.startingY, {
      up: Phaser.Keyboard.UP,
      down: Phaser.Keyboard.DOWN,
      left: Phaser.Keyboard.LEFT,
      right: Phaser.Keyboard.RIGHT,
      player_speed: 180
    });

    PrisonBreak.game.camera.follow(this.player.sprite);

    PrisonBreak.saw = [];

    //TODO: add saw after check position

    // saw left
    PrisonBreak.saw.push(new Saw6(263, 310, 263, 407, 166, 310, 'left'));
    PrisonBreak.saw.push(new Saw6(263, 455, 263, 407, 311, 455, 'left'));
    PrisonBreak.saw.push(new Saw6(263, 600, 263, 407, 456, 600, 'left'));
    // saw center
    PrisonBreak.saw.push(new Saw6(551, 552, 407, 551, 216, 552, 'center'));
    //saw right
    PrisonBreak.saw.push(new Saw6(695, 310, 551, 695, 166, 310, 'right'));
    PrisonBreak.saw.push(new Saw6(695, 455, 551, 695, 311, 455, 'right'));
    PrisonBreak.saw.push(new Saw6(695, 600, 551, 695, 456, 600, 'right'));


    PrisonBreak.key = [];
    PrisonBreak.key.push(new Key(263 + 48 * 2, 600));
    PrisonBreak.key.push(new Key(695 + 48 * 2, 166));
    PrisonBreak.key.push(new Key(695 + 48 * 2, 600));

    PrisonBreak.game.world.bringToTop(PrisonBreak.playerGroup);
    PrisonBreak.game.world.bringToTop(PrisonBreak.trapGroup);
    PrisonBreak.game.world.bringToTop(PrisonBreak.keyGroup);

    var mapEndArray = endLayer.getTiles(0, 0, PrisonBreak.game.world.width, PrisonBreak.game.world.height);
    this.endArr = [];

    for (var i = 0; i < mapEndArray.length; i++) {
      var myEndTile = mapEndArray[i];
      if (myEndTile.index == 114) {
        this.endArr.push(myEndTile);
      }
    }

    function fadePlayer() {
      PrisonBreak.game.add.tween(stage5State.player.sprite).to({
        alpha: 0
      }, 100, Phaser.Easing.Linear.None, true);
      PrisonBreak.game.time.events.add(Phaser.Timer.SECOND * 0.5, rePosition, this);
    };

    function rePosition() {
      stage5State.player.sprite.body.x = stage5State.startingX;
      stage5State.player.sprite.body.y = stage5State.startingY;
      PrisonBreak.game.add.tween(stage5State.player.sprite).to({
        alpha: 1
      }, 100, Phaser.Easing.Linear.None, true);

      PrisonBreak.keyGroup.removeAll(true,false);
      PrisonBreak.key = [];
      PrisonBreak.key.push(new Key(263 + 48 * 2, 600));
      PrisonBreak.key.push(new Key(695 + 48 * 2, 166));
      PrisonBreak.key.push(new Key(695 + 48 * 2, 600));
    };


    var playerContact = function(body, bodyB, shapeA, shapeB, equation) { //https://phaser.io/examples/v2/p2-physics/contact-events
      if (body) {
        if (PrisonBreak.keyGroup.children.indexOf(body.sprite) > -1) {
          body.sprite.destroy();
        }
        if (PrisonBreak.trapGroup.children.indexOf(body.sprite) > -1) { //trapGroup contains body's sprite
          fadePlayer();
          PrisonBreak.deathCount++;
          updateDeath(this.deathLabel, PrisonBreak.deathCount);
        }
      }
    }

    this.player.sprite.body.onBeginContact.add(playerContact, this);


  },
  update() {
    if (PrisonBreak.keyGroup.countLiving() == 0) {
      for (var myEndTile of this.endArr) {
        if (this.player.sprite.body.x > myEndTile.worldX && this.player.sprite.body.x < myEndTile.worldX + 48 &&
          this.player.sprite.body.y > myEndTile.worldY && this.player.sprite.body.y < myEndTile.worldY + 48) {
          PrisonBreak.game.state.start('stage6');
        }
      }
    }

  },
  render() {

  }

}

function updateDeath(deathLabel, deathCount) {
  deathLabel.setText(deathCount.toString());
}
