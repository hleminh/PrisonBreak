var stage1State = {
  preload: function() {
    PrisonBreak.game.load.tilemap('stage1', 'assets/stages/stage1.json', null, Phaser.Tilemap.TILED_JSON);
    PrisonBreak.game.load.image('tiles', 'assets/tiles.png');
  },
  create: function() {
    this.startingX = 220;
    this.startingY = 375;

    // PrisonBreak.game.physics.p2.setImpactEvents(true);
    PrisonBreak.game.physics.p2.restitution = 0.0;

    // PrisonBreak.game.physics.p2.updateBoundsCollisionGroup();

    map = this.game.add.tilemap('stage1');
    map.addTilesetImage('tiles', 'tiles');

    groundLayer = map.createLayer('Tile Layer 1', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);
    wallLayer = map.createLayer('Tile Layer 2', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);
    startLayer = map.createLayer('Tile Layer 3', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);
    endLayer = map.createLayer('Tile Layer 4', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);

    map.setCollision([1, 3, 2, 4, 35, 36, 115, 116], true, wallLayer);
    PrisonBreak.game.physics.p2.convertTilemap(map, wallLayer);

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

    PrisonBreak.game.add.text(PrisonBreak.configs.GAME_WIDTH / 2 - 45, 18, 'STAGE 1', {
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

    PrisonBreak.saw = [];
    PrisonBreak.saw.push(new Saw1(360, 300, 310, 500, 300));
    PrisonBreak.saw.push(new Saw1(408, 510, 310, 500, 300));
    PrisonBreak.saw.push(new Saw1(456, 300, 310, 500, 300));
    PrisonBreak.saw.push(new Saw1(503, 510, 310, 500, 300));
    PrisonBreak.saw.push(new Saw1(553, 300, 310, 500, 300));
    PrisonBreak.saw.push(new Saw1(600, 510, 310, 500, 300));
    PrisonBreak.saw.push(new Saw1(649, 300, 310, 500, 300));
    PrisonBreak.saw.push(new Saw1(695, 510, 310, 500, 300));
    PrisonBreak.saw.push(new Saw1(743, 300, 310, 500, 300));
    PrisonBreak.saw.push(new Saw1(793, 510, 310, 500, 300));

    PrisonBreak.game.world.bringToTop(PrisonBreak.playerGroup);
    PrisonBreak.game.world.bringToTop(PrisonBreak.trapGroup);

    var mapEndArray = endLayer.getTiles(0, 0, PrisonBreak.game.world.width, PrisonBreak.game.world.height);
    this.endArr = [];

    for (var i = 0; i < mapEndArray.length; i++) {
      var myEndTile = mapEndArray[i];
      if (myEndTile.index == 114) {
        this.endArr.push(myEndTile);
      }
    }

    function fadePlayer() {
      PrisonBreak.game.add.tween(stage1State.player.sprite).to({
        alpha: 0
      }, 100, Phaser.Easing.Linear.None, true);
      PrisonBreak.game.time.events.add(Phaser.Timer.SECOND * 0.5, rePosition, this);
    };

    function rePosition() {
      stage1State.player.sprite.body.x = stage1State.startingX;
      stage1State.player.sprite.body.y = stage1State.startingY;
      PrisonBreak.game.add.tween(stage1State.player.sprite).to({
        alpha: 1
      }, 100, Phaser.Easing.Linear.None, true);
    };





    var playerContact = function(body, bodyB, shapeA, shapeB, equation) {
      if (body) {
        if (PrisonBreak.trapGroup.children.indexOf(body.sprite) > -1) { //trapGroup contains body's sprite
          // this.player.sprite.body.x = this.startingX;
          // this.player.sprite.body.y = this.startingY;
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
          PrisonBreak.game.state.start('stage2');
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
