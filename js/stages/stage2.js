var stage2State = {
  preload: function() {
    PrisonBreak.game.load.tilemap('stage2', 'assets/stages/stage2.json', null, Phaser.Tilemap.TILED_JSON);
    PrisonBreak.game.load.image('tiles', 'assets/tiles.png');
  },
  create: function() {
    this.startingX = 500;
    this.startingY = 200;

    // PrisonBreak.game.physics.p2.setImpactEvents(true);
    PrisonBreak.game.physics.p2.restitution = 0.0;

    // PrisonBreak.game.physics.p2.updateBoundsCollisionGroup();

    map = this.game.add.tilemap('stage2');
    map.addTilesetImage('tiles', 'tiles');

    groundLayer = map.createLayer('Tile Layer 1', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);
    wallLayer = map.createLayer('Tile Layer 2', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);
    startLayer = map.createLayer('Tile Layer 3', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);
    endLayer = map.createLayer('Tile Layer 4', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);

    // map.setCollision(114, true, endLayer);
    // PrisonBreak.game.physics.p2.convertTilemap(map, endLayer);
    map.setCollision([1, 3, 2, 4, 35, 36, 115, 116], true, wallLayer);
    PrisonBreak.game.physics.p2.convertTilemap(map, wallLayer);

    PrisonBreak.keyboard = PrisonBreak.game.input.keyboard;
    PrisonBreak.playerGroup = PrisonBreak.game.add.physicsGroup(Phaser.Physics.P2JS);
    PrisonBreak.trapGroup = PrisonBreak.game.add.physicsGroup(Phaser.Physics.P2JS);
    PrisonBreak.keyGroup = PrisonBreak.game.add.physicsGroup(Phaser.Physics.P2JS);

    // PrisonBreak.keyGroup.enableBody = true;

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

    PrisonBreak.game.add.text(PrisonBreak.configs.GAME_WIDTH / 2 - 45, 18, 'STAGE 2', {
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
    PrisonBreak.saw.push(new Saw2(528, 432, 0, 0));
    PrisonBreak.saw.push(new Saw2(528, 432, 50, 0));
    PrisonBreak.saw.push(new Saw2(528, 432, 100, 0));
    PrisonBreak.saw.push(new Saw2(528, 432, 150, 0));
    PrisonBreak.saw.push(new Saw2(528, 432, 50, Math.PI));
    PrisonBreak.saw.push(new Saw2(528, 432, 100, Math.PI));
    PrisonBreak.saw.push(new Saw2(528, 432, 150, Math.PI));
    PrisonBreak.saw.push(new Saw2(528, 432, 50, -Math.PI / 2));
    PrisonBreak.saw.push(new Saw2(528, 432, 100, -Math.PI / 2));
    PrisonBreak.saw.push(new Saw2(528, 432, 150, -Math.PI / 2));
    PrisonBreak.saw.push(new Saw2(528, 432, 50, Math.PI / 2));
    PrisonBreak.saw.push(new Saw2(528, 432, 100, Math.PI / 2));
    PrisonBreak.saw.push(new Saw2(528, 432, 150, Math.PI / 2));

    PrisonBreak.key = [];
    PrisonBreak.key.push(new Key(528, 290));
    PrisonBreak.key.push(new Key(528, 574));
    PrisonBreak.key.push(new Key(625, 432));

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


    var playerContact = function(body, bodyB, shapeA, shapeB, equation) {
      if (body) {
        if (PrisonBreak.keyGroup.children.indexOf(body.sprite) > -1) {
          body.sprite.destroy();
        }
        if (PrisonBreak.trapGroup.children.indexOf(body.sprite) > -1) { //trapGroup contains body's sprite
          this.player.sprite.body.x = this.startingX;
          this.player.sprite.body.y = this.startingY;
          PrisonBreak.keyGroup.removeAll(true,false);
          PrisonBreak.key = [];
          PrisonBreak.key.push(new Key(528, 290));
          PrisonBreak.key.push(new Key(528, 574));
          PrisonBreak.key.push(new Key(625, 432));
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
