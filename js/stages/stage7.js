var stage7State = {
  preload: function() {
    PrisonBreak.game.load.tilemap('stage7', 'assets/stages/stage7.json', null, Phaser.Tilemap.TILED_JSON);
    PrisonBreak.game.load.image('tiles', 'assets/tiles.png');
  },
  create: function() {
    if (!PrisonBreak.backgroundSound.isPlaying) {
      PrisonBreak.backgroundSound.play();
    }
    this.startingX = 180;
    this.startingY = 220;

    // PrisonBreak.game.physics.p2.setImpactEvents(true);
    PrisonBreak.game.physics.p2.restitution = 0.0;

    // PrisonBreak.game.physics.p2.updateBoundsCollisionGroup();

    map = this.game.add.tilemap('stage7');
    map.addTilesetImage('tiles', 'tiles');

    groundLayer = map.createLayer('Tile Layer 1', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);
    wallLayer = map.createLayer('Tile Layer 2', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);
    startLayer = map.createLayer('Tile Layer 3', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);
    endLayer = map.createLayer('Tile Layer 4', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);
    checkLayer = map.createLayer('Tile Layer 5', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);
    trapLayer = map.createLayer('Tile Layer 6', PrisonBreak.configs.GAME_WIDTH, PrisonBreak.configs.GAME_HEIGHT);


    map.setCollision([1, 3, 2, 4, 35, 36, 115, 116], true, wallLayer);
    PrisonBreak.game.physics.p2.convertTilemap(map, wallLayer);

    groundLayer.resizeWorld();

    PrisonBreak.keyboard = PrisonBreak.game.input.keyboard;
    PrisonBreak.playerGroup = PrisonBreak.game.add.physicsGroup(Phaser.Physics.P2JS);
    PrisonBreak.trapGroup = PrisonBreak.game.add.physicsGroup(Phaser.Physics.P2JS);
    PrisonBreak.keyGroup = PrisonBreak.game.add.physicsGroup(Phaser.Physics.P2JS);
    PrisonBreak.keyTrapGroup = PrisonBreak.game.add.physicsGroup(Phaser.Physics.P2JS);
    PrisonBreak.lightGroup = PrisonBreak.game.add.group();



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

    PrisonBreak.game.add.text(PrisonBreak.configs.GAME_WIDTH / 2 - 45, 18, 'STAGE 7', {
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
    }, true);

    PrisonBreak.game.camera.follow(this.player.sprite);

    PrisonBreak.saw = [];
    // trap move in rectangle
    PrisonBreak.saw.push(new Saw6(168, 360, 168, 216, 312, 360, 'left'));
    PrisonBreak.saw.push(new Saw6(168 + 48 * 12, 360 - 48 * 2, 168 + 48 * 12, 216 + 48 * 12, 312 - 48 * 2, 360 - 48 * 2, 'left'));
    PrisonBreak.saw.push(new Saw6(168 + 48 * 12, 360 + 48 * 4, 168 + 48 * 12, 216 + 48 * 12, 312 + 48 * 4, 360 + 48 * 4, 'left'));


    PrisonBreak.saw.push(new Saw6(360, 312, 360, 408, 312, 360, 'left'));
    PrisonBreak.saw.push(new Saw6(360, 312 + 48 * 6, 360, 408, 312 + 48 * 6, 360 + 48 * 6, 'left'));
    PrisonBreak.saw.push(new Saw6(360 - 48 * 4, 312 + 48 * 6, 360 - 48 * 4, 408 - 48 * 4, 312 + 48 * 6, 360 + 48 * 6, 'left'));
    PrisonBreak.saw.push(new Saw6(360 + 48 * 4, 312 - 48 * 2, 360 + 48 * 4, 408 + 48 * 4, 312 - 48 * 2, 360 - 48 * 2, 'left'));
    PrisonBreak.saw.push(new Saw6(360 + 48 * 12, 312 - 48 * 2, 360 + 48 * 12, 408 + 48 * 12, 312 - 48 * 2, 360 - 48 * 2, 'left'));

    // trap move in motion path
    PrisonBreak.saw.push(new Saw7_1(360 + 48 * 4, 312 + 48 * 3, 48, 48 * 2));
    PrisonBreak.saw.push(new Saw7_1(360 + 48 * 9, 312 + 48 * 7, 48 * 2, 48));

    // trap standing
    PrisonBreak.saw.push(new Saw7_2(168 + 48, 360 + 48 + 24));
    PrisonBreak.saw.push(new Saw7_2(168, 360 + 48 * 3 + 24));
    PrisonBreak.saw.push(new Saw7_2(168 + 48 * 2 + 24, 360 - 48));
    PrisonBreak.saw.push(new Saw7_2(168 + 48 * 4, 360 - 48 * 2 - 24));
    PrisonBreak.saw.push(new Saw7_2(168 + 48 * 6 + 24, 360 - 48 * 2));
    PrisonBreak.saw.push(new Saw7_2(168 + 48 * 8, 360 - 48 + 24));
    PrisonBreak.saw.push(new Saw7_2(168 + 48 * 2 + 24, 360 + 48 * 5));
    PrisonBreak.saw.push(new Saw7_2(168 + 48 * 4, 360 + 48 * 3 + 24));
    PrisonBreak.saw.push(new Saw7_2(168 + 48 * 5 + 24, 360 + 48 * 3));
    PrisonBreak.saw.push(new Saw7_2(168 + 48 * 7, 360 + 48 * 4));
    PrisonBreak.saw.push(new Saw7_2(168 + 48 * 12, 360 + 48 * 5 + 24));
    PrisonBreak.saw.push(new Saw7_2(168 + 48 * 12, 360 + 48 + 24));
    PrisonBreak.saw.push(new Saw7_2(168 + 48 * 13, 360 - 48 + 24));
    PrisonBreak.saw.push(new Saw7_2(168 + 48 * 14 + 24, 360 - 48 * 2));
    PrisonBreak.saw.push(new Saw7_2(168 + 48 * 16, 360 - 48 + 24));


    PrisonBreak.key = [];
    PrisonBreak.key.push(new Key(360 + 48 * 12, 310 + 48 * 6));
    PrisonBreak.key.push(new Key(408 + 48 * 12, 358 + 48 * 6));
    PrisonBreak.key.push(new Key(360 + 48 * 12, 358 + 48 * 6));
    PrisonBreak.key.push(new Key(360 + 48 * 5 , 358 - 48 * 3 ));

    PrisonBreak.keyTrap = [];
    PrisonBreak.keyTrap.push(new KeyTrap(408 + 48 * 12, 310 + 48 * 6));
    PrisonBreak.keyTrap.push(new KeyTrap(360 - 48 * 4, 358 + 48 * 6));

    PrisonBreak.game.world.bringToTop(PrisonBreak.playerGroup);
    PrisonBreak.game.world.bringToTop(PrisonBreak.trapGroup);
    PrisonBreak.game.world.bringToTop(PrisonBreak.keyGroup);
    PrisonBreak.game.world.bringToTop(PrisonBreak.lightGroup);

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

    var mapTrapArray = trapLayer.getTiles(0, 0, PrisonBreak.game.world.width, PrisonBreak.game.world.height);
    this.trapArr = [];

    for (var i = 0; i < mapTrapArray.length; i++) {
      var myTrapTile = mapTrapArray[i];
      if (myTrapTile.index == 407) {
        this.trapArr.push(myTrapTile);
      }
    }

    this.fadePlayer = function() {
      PrisonBreak.game.add.tween(stage7State.player.sprite).to({
        alpha: 0
      }, 100, Phaser.Easing.Linear.None, true);
      PrisonBreak.game.time.events.add(Phaser.Timer.SECOND * 0.5, rePosition, this);
    };

    function rePosition() {
      stage7State.player.sprite.body.x = stage7State.startingX;
      stage7State.player.sprite.body.y = stage7State.startingY;
      PrisonBreak.game.add.tween(stage7State.player.sprite).to({
        alpha: 1
      }, 100, Phaser.Easing.Linear.None, true);

      PrisonBreak.keyGroup.removeAll(true, false);
      PrisonBreak.key = [];
      PrisonBreak.key.push(new Key(360 + 48 * 12, 310 + 48 * 6));
      PrisonBreak.key.push(new Key(408 + 48 * 12, 358 + 48 * 6));
      PrisonBreak.key.push(new Key(360 + 48 * 12, 358 + 48 * 6));
      PrisonBreak.key.push(new Key(360 + 48 * 5 , 358 - 48 * 3 ));
      stage7State.player.alive = true;
      this.emitter.on = false;
    };


    var playerContact = function(body, bodyB, shapeA, shapeB, equation) { //https://phaser.io/examples/v2/p2-physics/contact-events
      if (body) {
        if (this.player.alive) {
          if (PrisonBreak.keyGroup.children.indexOf(body.sprite) > -1) {
            body.sprite.destroy();
            PrisonBreak.coinSound.play();
          }
          if (PrisonBreak.keyTrapGroup.children.indexOf(body.sprite) > -1){
            body.sprite.loadTexture('saw_evil', 0, false);
            this.player.alive = false;
            this.emitter = PrisonBreak.game.add.emitter(this.player.sprite.x, this.player.sprite.y, 4);
            this.emitter.makeParticles(['blood1', 'blood2', 'blood3', 'blood4', 'blood5']);
            this.emitter.on = true;
            this.emitter.start(true, 500, 20);
            PrisonBreak.sawSound.play();
            PrisonBreak.deathSound.play();
            this.fadePlayer();
            PrisonBreak.deathCount++;
            updateDeath(this.deathLabel, PrisonBreak.deathCount);
          }
          if (PrisonBreak.trapGroup.children.indexOf(body.sprite) > -1) { //trapGroup contains body's sprite
            this.player.alive = false;
            this.emitter = PrisonBreak.game.add.emitter(this.player.sprite.x, this.player.sprite.y, 4);
            this.emitter.makeParticles(['blood1', 'blood2', 'blood3', 'blood4', 'blood5']);
            this.emitter.on = true;
            this.emitter.start(true, 500, 20);
            PrisonBreak.sawSound.play();
            PrisonBreak.deathSound.play();
            this.fadePlayer();
            PrisonBreak.deathCount++;
            updateDeath(this.deathLabel, PrisonBreak.deathCount);
          }
        }
      }
    }

    this.player.sprite.body.onBeginContact.add(playerContact, this);

    this.killTrap = function() {
      this.sprite.destroy();
    }

  },
  update() {
    if (PrisonBreak.keyGroup.countLiving() == 0) {
      for (var myEndTile of this.endArr) {
        if (this.player.sprite.body.x > myEndTile.worldX && this.player.sprite.body.x < myEndTile.worldX + 48 &&
          this.player.sprite.body.y > myEndTile.worldY && this.player.sprite.body.y < myEndTile.worldY + 48 && this.player.alive) {
          PrisonBreak.game.state.start('win');
        }
      }
    }

    for (var myTile of this.checkArr) {
      if (this.player.sprite.body.x > myTile.worldX && this.player.sprite.body.x < myTile.worldX + 48 &&
        this.player.sprite.body.y > myTile.worldY && this.player.sprite.body.y < myTile.worldY + 48 && this.player.alive) {
        this.startingX = myTile.worldX + myTile.centerX; //Tile X ở góc trái trong khi anchor của player ở giữa nên phải cộng thêm để cho player vào giữa tile
        this.startingY = myTile.worldY + myTile.centerY;
      }
    }

    for (var myTrapTile of this.trapArr) {
      if (this.player.sprite.body.x > myTrapTile.worldX && this.player.sprite.body.x < myTrapTile.worldX + 48 &&
        this.player.sprite.body.y > myTrapTile.worldY && this.player.sprite.body.y < myTrapTile.worldY + 48) {
        if (this.player.alive) {
          this.player.alive = false;
          this.emitter = PrisonBreak.game.add.emitter(this.player.sprite.x, this.player.sprite.y, 4);
          this.emitter.makeParticles(['blood1', 'blood2', 'blood3', 'blood4', 'blood5']);
          this.emitter.on = true;
          this.emitter.start(true, 500, 20);
          this.sprite = PrisonBreak.game.add.sprite(myTrapTile.worldX, myTrapTile.worldY, 'collapse');
          this.fadePlayer();
          PrisonBreak.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.killTrap, this);
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
