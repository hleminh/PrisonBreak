var menuLevelState = {
  create: function(){
    var levelLable = PrisonBreak.game.add.text(150, 80, 'Select level which you want to play !',{
      font: '40px Arial',
      fill: '#fff'
    });
    var level1 = PrisonBreak.game.add.text(150, 250, 'Level 1',{
      font: '30px Arial',
      fill: '#fff'
    });
    level1.inputEnabled = true;
    level1.events.onInputUp.addOnce(function(){
      PrisonBreak.game.state.start('stage1')
    }, this);

    var level2 = PrisonBreak.game.add.text(300, 250, 'Level 2', {
      font: '30px Arial',
      fill: '#fff'
    });
    level2.inputEnabled = true;
    level2.events.onInputUp.addOnce(function(){
      // TODO PrisonBreak.game.state.start('stage2')
    }, this);
  }
}
