var stage6State = {
  preload: function() {
    PrisonBreak.game.load.tilemap('stage5', 'assets/stages/stage5.json', null, Phaser.Tilemap.TILED_JSON);
    PrisonBreak.game.load.image('tiles', 'assets/tiles.png');
  },
  create: function() {
    if (! PrisonBreak.backgroundSound.isPlaying) {
      PrisonBreak.backgroundSound.play();
    }
    this.startingX = 180;
    this.startingY = 200;

    // PrisonBreak.game.physics.p2.setImpactEvents(true);
    PrisonBreak.game.physics.p2.restitution = 0.0;

    // PrisonBreak.game.physics.p2.updateBoundsCollisionGroup();

    map = this.game.add.tilemap('stage5');
    map.addTilesetImage('tiles', 'tiles');

    groundLayer = map.createLayer('Tile Layer 1', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);
    wallLayer = map.createLayer('Tile Layer 2', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);
    startLayer = map.createLayer('Tile Layer 3', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);
    endLayer = map.createLayer('Tile Layer 4', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);
    checkLayer = map.createLayer('Tile Layer 5', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);

    map.setCollision([1, 3, 2, 4, 35, 36, 115, 116], true, wallLayer);
    this.wallLayerTiles = PrisonBreak.game.physics.p2.convertTilemap(map, wallLayer);

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

    PrisonBreak.game.add.text(PrisonBreak.configs.GAME_WIDTH / 2 - 45, 18, 'STAGE 6', {
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

    this.wallMaterial = PrisonBreak.game.physics.p2.createMaterial('wallMaterial');
    this.spriteMaterial = PrisonBreak.game.physics.p2.createMaterial('spriteMaterial');

    for (var i = 0; i < this.wallLayerTiles.length; i++) {
      this.wallLayerTiles[i].setMaterial(this.wallMaterial);
    }

    this.player.sprite.body.setMaterial(this.spriteMaterial);

    this.contactMaterial = PrisonBreak.game.physics.p2.createContactMaterial(this.spriteMaterial, this.wallMaterial);
    this.contactMaterial.restitution = 0;
    this.contactMaterial.relaxation = 10000;

    PrisonBreak.game.camera.follow(this.player.sprite);

    PrisonBreak.saw = [];
    PrisonBreak.saw.push(new Saw2(335, 240, 0, 0));
    PrisonBreak.saw.push(new Saw2(335, 240, 40, Math.PI));
    PrisonBreak.saw.push(new Saw2(335, 240, 80, Math.PI));
    PrisonBreak.saw.push(new Saw2(335, 240, 40, 0));
    PrisonBreak.saw.push(new Saw2(335, 240, 80, 0));
    PrisonBreak.saw.push(new Saw2(335, 240, 80, Math.PI / 2));
    PrisonBreak.saw.push(new Saw2(335, 240, 40, Math.PI / 2));
    PrisonBreak.saw.push(new Saw2(335, 240, 40, -Math.PI / 2));
    PrisonBreak.saw.push(new Saw2(335, 240, 80, -Math.PI / 2));

    PrisonBreak.saw.push(new Saw2(528, 240, 0, 0));
    PrisonBreak.saw.push(new Saw2(528, 240, 40, Math.PI));
    PrisonBreak.saw.push(new Saw2(528, 240, 80, Math.PI));
    PrisonBreak.saw.push(new Saw2(528, 240, 40, 0));
    PrisonBreak.saw.push(new Saw2(528, 240, 80, 0));
    PrisonBreak.saw.push(new Saw2(528, 240, 80, Math.PI / 2));
    PrisonBreak.saw.push(new Saw2(528, 240, 40, Math.PI / 2));
    PrisonBreak.saw.push(new Saw2(528, 240, 40, -Math.PI / 2));
    PrisonBreak.saw.push(new Saw2(528, 240, 80, -Math.PI / 2));

    PrisonBreak.saw.push(new Saw2(721, 240, 0, 0));
    PrisonBreak.saw.push(new Saw2(721, 240, 40, Math.PI));
    PrisonBreak.saw.push(new Saw2(721, 240, 80, Math.PI));
    PrisonBreak.saw.push(new Saw2(721, 240, 40, 0));
    PrisonBreak.saw.push(new Saw2(721, 240, 80, 0));
    PrisonBreak.saw.push(new Saw2(721, 240, 80, Math.PI / 2));
    PrisonBreak.saw.push(new Saw2(721, 240, 40, Math.PI / 2));
    PrisonBreak.saw.push(new Saw2(721, 240, 40, -Math.PI / 2));
    PrisonBreak.saw.push(new Saw2(721, 240, 80, -Math.PI / 2));

    PrisonBreak.saw.push(new Saw2(914, 240, 0, 0));
    PrisonBreak.saw.push(new Saw2(914, 240, 40, Math.PI));
    PrisonBreak.saw.push(new Saw2(914, 240, 80, Math.PI));
    PrisonBreak.saw.push(new Saw2(914, 240, 40, 0));
    PrisonBreak.saw.push(new Saw2(914, 240, 80, 0));
    PrisonBreak.saw.push(new Saw2(914, 240, 80, Math.PI / 2));
    PrisonBreak.saw.push(new Saw2(914, 240, 40, Math.PI / 2));
    PrisonBreak.saw.push(new Saw2(914, 240, 40, -Math.PI / 2));
    PrisonBreak.saw.push(new Saw2(914, 240, 80, -Math.PI / 2));

    PrisonBreak.saw.push(new Saw2(818 + 48 * 2, 578, 0, 0));
    PrisonBreak.saw.push(new Saw2(818 + 48 * 2, 578, 40, Math.PI));
    PrisonBreak.saw.push(new Saw2(818 + 48 * 2, 578, 80, Math.PI));
    PrisonBreak.saw.push(new Saw2(818 + 48 * 2, 578, 40, 0));
    PrisonBreak.saw.push(new Saw2(818 + 48 * 2, 578, 80, 0));
    PrisonBreak.saw.push(new Saw2(818 + 48 * 2, 578, 80, Math.PI / 2));
    PrisonBreak.saw.push(new Saw2(818 + 48 * 2, 578, 40, Math.PI / 2));
    PrisonBreak.saw.push(new Saw2(818 + 48 * 2, 578, 40, -Math.PI / 2));
    PrisonBreak.saw.push(new Saw2(818 + 48 * 2, 578, 80, -Math.PI / 2));

    PrisonBreak.saw.push(new Saw2(625 + 48 * 2, 578, 0, 0));
    PrisonBreak.saw.push(new Saw2(625 + 48 * 2, 578, 40, Math.PI));
    PrisonBreak.saw.push(new Saw2(625 + 48 * 2, 578, 80, Math.PI));
    PrisonBreak.saw.push(new Saw2(625 + 48 * 2, 578, 40, 0));
    PrisonBreak.saw.push(new Saw2(625 + 48 * 2, 578, 80, 0));
    PrisonBreak.saw.push(new Saw2(625 + 48 * 2, 578, 80, Math.PI / 2));
    PrisonBreak.saw.push(new Saw2(625 + 48 * 2, 578, 40, Math.PI / 2));
    PrisonBreak.saw.push(new Saw2(625 + 48 * 2, 578, 40, -Math.PI / 2));
    PrisonBreak.saw.push(new Saw2(625 + 48 * 2, 578, 80, -Math.PI / 2));

    PrisonBreak.saw.push(new Saw2(432 + 48 * 2, 578, 0, 0));
    PrisonBreak.saw.push(new Saw2(432 + 48 * 2, 578, 40, Math.PI));
    PrisonBreak.saw.push(new Saw2(432 + 48 * 2, 578, 80, Math.PI));
    PrisonBreak.saw.push(new Saw2(432 + 48 * 2, 578, 40, 0));
    PrisonBreak.saw.push(new Saw2(432 + 48 * 2, 578, 80, 0));
    PrisonBreak.saw.push(new Saw2(432 + 48 * 2, 578, 80, Math.PI / 2));
    PrisonBreak.saw.push(new Saw2(432 + 48 * 2, 578, 40, Math.PI / 2));
    PrisonBreak.saw.push(new Saw2(432 + 48 * 2, 578, 40, -Math.PI / 2));
    PrisonBreak.saw.push(new Saw2(432 + 48 * 2, 578, 80, -Math.PI / 2));

    PrisonBreak.saw.push(new Saw2(239 + 48 * 2, 578, 0, 0));
    PrisonBreak.saw.push(new Saw2(239 + 48 * 2, 578, 40, Math.PI));
    PrisonBreak.saw.push(new Saw2(239 + 48 * 2, 578, 80, Math.PI));
    PrisonBreak.saw.push(new Saw2(239 + 48 * 2, 578, 40, 0));
    PrisonBreak.saw.push(new Saw2(239 + 48 * 2, 578, 80, 0));
    PrisonBreak.saw.push(new Saw2(239 + 48 * 2, 578, 80, Math.PI / 2));
    PrisonBreak.saw.push(new Saw2(239 + 48 * 2, 578, 40, Math.PI / 2));
    PrisonBreak.saw.push(new Saw2(239 + 48 * 2, 578, 40, -Math.PI / 2));
    PrisonBreak.saw.push(new Saw2(239 + 48 * 2, 578, 80, -Math.PI / 2));

    PrisonBreak.key = [];
    PrisonBreak.key.push(new Key(743 + 48 * 2, 500));
    PrisonBreak.key.push(new Key(552 + 48 * 2, 500));
    PrisonBreak.key.push(new Key(166 + 48 * 2, 500));
    PrisonBreak.key.push(new Key(360 + 48 * 2, 500));


    PrisonBreak.game.world.bringToTop(PrisonBreak.playerGroup);
    PrisonBreak.game.world.bringToTop(PrisonBreak.trapGroup);
    PrisonBreak.game.world.bringToTop(PrisonBreak.keyGroup);


    var mapArray = checkLayer.getTiles(0, 0, PrisonBreak.game.world.width, PrisonBreak.game.world.height);
    this.checkArr = [];

    for (var i = 0; i < mapArray.length; i++) {
      var myTile = mapArray[i];
      if (myTile.index == 114) {
        this.checkArr.push(myTile);
      }
    }

    var mapEndArray = endLayer.getTiles(0, 0, PrisonBreak.game.world.width, PrisonBreak.game.world.height);
    this.endArr = [];

    for (var i = 0; i < mapEndArray.length; i++) {
      var myEndTile = mapEndArray[i];
      if (myEndTile.index == 114) {
        this.endArr.push(myEndTile);
      }
    }

    function fadePlayer() {
      PrisonBreak.game.add.tween(stage6State.player.sprite).to({
        alpha: 0
      }, 100, Phaser.Easing.Linear.None, true);
      PrisonBreak.game.time.events.add(Phaser.Timer.SECOND * 0.5, rePosition, this);
    };

    function rePosition() {
      stage6State.player.sprite.body.x = stage6State.startingX;
      stage6State.player.sprite.body.y = stage6State.startingY;
      PrisonBreak.game.add.tween(stage6State.player.sprite).to({
        alpha: 1
      }, 100, Phaser.Easing.Linear.None, true);

      PrisonBreak.keyGroup.removeAll(true, false);
      PrisonBreak.key = [];
      PrisonBreak.key.push(new Key(743 + 48 * 2, 500));
      PrisonBreak.key.push(new Key(552 + 48 * 2, 500));
      PrisonBreak.key.push(new Key(166 + 48 * 2, 500));
      PrisonBreak.key.push(new Key(360 + 48 * 2, 500));
      stage6State.player.alive = true;

    };


    var playerContact = function(body, bodyB, shapeA, shapeB, equation) { //https://phaser.io/examples/v2/p2-physics/contact-events
      if (body) {
        if (this.player.alive) {
          if (PrisonBreak.keyGroup.children.indexOf(body.sprite) > -1) {
            body.sprite.destroy();
            PrisonBreak.coinSound.play();

          }
          if (PrisonBreak.trapGroup.children.indexOf(body.sprite) > -1) { //trapGroup contains body's sprite
            this.player.alive = false;
            PrisonBreak.sawSound.play();
            PrisonBreak.deathSound.play();
            fadePlayer();
            PrisonBreak.deathCount++;
            updateDeath(this.deathLabel, PrisonBreak.deathCount);
          }
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
          PrisonBreak.game.state.start('stage7');
        }
      }
    }

    for (var myTile of this.checkArr) {
      if (this.player.sprite.body.x > myTile.worldX && this.player.sprite.body.x < myTile.worldX + 48 &&
        this.player.sprite.body.y > myTile.worldY && this.player.sprite.body.y < myTile.worldY + 48) {
        this.startingX = myTile.worldX + myTile.centerX; //Tile X ở góc trái trong khi anchor của player ở giữa nên phải cộng thêm để cho player vào giữa tile
        this.startingY = myTile.worldY + myTile.centerY;
      }
    }
  },
  render() {

  }

}

function updateDeath(deathLabel, deathCount) {
  deathLabel.setText(deathCount.toString());
}
