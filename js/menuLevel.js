var menuLevelState = {
  create: function(){

    PrisonBreak.background = PrisonBreak.game.add.sprite(0, 0, 'background_menuLvl');
    PrisonBreak.player = PrisonBreak.game.add.sprite(325, PrisonBreak.configs.GAME_HEIGHT - 238, 'player' );


    var levelLable = PrisonBreak.game.add.text(250, 100, 'Select level which you want to play !',{
      font: '40px Arial',
      fill: '#ffae67'
    });
    var level1 = PrisonBreak.game.add.text(225, 250, 'Level 1',{
      font: '30px Arial',
      fill: '#fff'
    });
    level1.inputEnabled = true;
    level1.events.onInputUp.addOnce(function(){
      PrisonBreak.game.state.start('stage1')
    }, this);

    var level2 = PrisonBreak.game.add.text(425, 250, 'Level 2', {
      font: '30px Arial',
      fill: '#fff'
    });
    level2.inputEnabled = true;
    level2.events.onInputUp.addOnce(function(){
       PrisonBreak.game.state.start('stage2');
    }, this);

    var level3 = PrisonBreak.game.add.text(625, 250, 'Level 3', {
      font: '30px Arial',
      fill: '#fff'
    });
    level3.inputEnabled = true;
    level3.events.onInputUp.addOnce(function(){
       PrisonBreak.game.state.start('stage3');
    }, this);

    var level4 = PrisonBreak.game.add.text(825, 250, 'Level 4', {
      font: '30px Arial',
      fill: '#fff'
    });
    level4.inputEnabled = true;
    level4.events.onInputUp.addOnce(function(){
       PrisonBreak.game.state.start('stage4');
    }, this);

    var level5 = PrisonBreak.game.add.text(325, 400, 'Level 5', {
      font: '30px Arial',
      fill: '#fff'
    });
    level5.inputEnabled = true;
    level5.events.onInputUp.addOnce(function(){
       PrisonBreak.game.state.start('stage5');
    }, this);

    var level6 = PrisonBreak.game.add.text(525, 400, 'Level 6', {
      font: '30px Arial',
      fill: '#fff'
    });
    level6.inputEnabled = true;
    level6.events.onInputUp.addOnce(function(){
       PrisonBreak.game.state.start('stage6');
    }, this);

    var level7 = PrisonBreak.game.add.text(725, 400, 'Level 7', {
      font: '30px Arial',
      fill: '#fff'
    });
    level7.inputEnabled = true;
    level7.events.onInputUp.addOnce(function(){
       PrisonBreak.game.state.start('stage7');
    }, this);
  },
  update(){
    if(PrisonBreak.player.position.x >= PrisonBreak.configs.GAME_WIDTH - 325) this.DIRECT = false;
    if(PrisonBreak.player.position.x <= 300) this.DIRECT = true;

    if(this.DIRECT) PrisonBreak.player.position.x += 2;
    else PrisonBreak.player.position.x -= 2;
  }
}
