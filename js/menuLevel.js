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
       PrisonBreak.game.state.start('stage2');
    }, this);

    var level5 = PrisonBreak.game.add.text(450, 250, 'Level 5', {
      font: '30px Arial',
      fill: '#fff'
    });
    level5.inputEnabled = true;
    level5.events.onInputUp.addOnce(function(){
       PrisonBreak.game.state.start('stage5');
    }, this);

    var level6 = PrisonBreak.game.add.text(600, 250, 'Level 6', {
      font: '30px Arial',
      fill: '#fff'
    });
    level6.inputEnabled = true;
    level6.events.onInputUp.addOnce(function(){
       PrisonBreak.game.state.start('stage6');
    }, this);
  }
}
