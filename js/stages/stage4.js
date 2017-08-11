var stage4State = {
  preload: function() {
    PrisonBreak.game.load.tilemap('stage4', 'assets/stages/stage4.json', null, Phaser.Tilemap.TILED_JSON);
    PrisonBreak.game.load.image('tiles', 'assets/tiles.png');
  },
  create: function() {
    this.startingX = 170;
    this.startingY = 400;

    // PrisonBreak.game.physics.p2.setImpactEvents(true);
    PrisonBreak.game.physics.p2.restitution = 0.0;

    // PrisonBreak.game.physics.p2.updateBoundsCollisionGroup();

    map = this.game.add.tilemap('stage4');
    map.addTilesetImage('tiles', 'tiles');

    groundLayer = map.createLayer('Tile Layer 1', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);
    wallLayer = map.createLayer('Tile Layer 2', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);
    startLayer = map.createLayer('Tile Layer 3', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);
    endLayer = map.createLayer('Tile Layer 4', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);

    map.setCollision([1, 3, 2, 4, 35, 36, 115, 116], true, wallLayer);
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

    PrisonBreak.game.add.text(PrisonBreak.configs.GAME_WIDTH / 2 - 45, 18, 'STAGE 4', {
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
    PrisonBreak.saw.push(new Saw3(265, 360, 265, 550, 240));
    PrisonBreak.saw.push(new Saw3(265, 410, 265, 550, 240));
    PrisonBreak.saw.push(new Saw3(595, 360, 595, 880, 240));
    PrisonBreak.saw.push(new Saw3(595, 410, 595, 880, 240));

    PrisonBreak.key = [];
    PrisonBreak.key.push(new Key(960, 382));



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
      PrisonBreak.game.add.tween(stage4State.player.sprite).to({
        alpha: 0
      }, 100, Phaser.Easing.Linear.None, true);
      PrisonBreak.game.time.events.add(Phaser.Timer.SECOND * 0.5, rePosition, this);
    };

    function rePosition() {
      stage4State.player.sprite.body.x = stage4State.startingX;
      stage4State.player.sprite.body.y = stage4State.startingY;
      PrisonBreak.game.add.tween(stage4State.player.sprite).to({
        alpha: 1
      }, 100, Phaser.Easing.Linear.None, true);
      PrisonBreak.keyGroup.removeAll(true, false);
      PrisonBreak.key = [];
      PrisonBreak.key.push(new Key(960, 382));
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

    // pause_label = PrisonBreak.game.add.text(PrisonBreak.configs.GAME_WIDTH - 100, 20, 'Pause', {
    //   font: '24px Arial',
    //   fill: '#fff'
    // });
    // pause_label.inputEnabled = true;
    // pause_label.events.onInputUp.add(function() {
    //   PrisonBreak.game.paused = true;
    //   clickToContinue = PrisonBreak.game.add.text(PrisonBreak.configs.GAME_WIDTH / 2, PrisonBreak.configs.GAME_HEIGHT - 150,
    //     'Click Any Where to Continue', {
    //       font: '30px Arial',
    //       fill: '#fff'
    //     }
    //   );
    //   clickToContinue.anchor.setTo(0.5, 0.5);
    //
    // });
    // PrisonBreak.game.input.onDown.add(unpause, self);
    //
    // function unpause(event) {
    //   if (PrisonBreak.game.paused) {
    //     if (0 < event.x < PrisonBreak.configs.GAME_WIDTH && 0 < event.y < PrisonBreak.configs.GAME_HEIGHT) {
    //       clickToContinue.destroy();
    //       PrisonBreak.game.paused = false;
    //     }
    //   }
    // }


  },
  update() {
    if (PrisonBreak.keyGroup.countLiving() == 0) {
      for (var myEndTile of this.endArr) {
        if (this.player.sprite.body.x > myEndTile.worldX && this.player.sprite.body.x < myEndTile.worldX + 48 &&
          this.player.sprite.body.y > myEndTile.worldY && this.player.sprite.body.y < myEndTile.worldY + 48) {
          PrisonBreak.game.state.start('stage5');
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
