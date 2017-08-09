var menuState = {
  create: function() {
    var nameLabel = PrisonBreak.game.add.text(250, 80, 'PRISON BREAK', {
      font: "50px Arial",
      fill: "#ffffff"
    });

    PrisonBreak.deathCount = 0;
    var startLabel = PrisonBreak.game.add.text(150, PrisonBreak.configs.GAME_HEIGHT - 300, 'Play Game', {
      font: "50px Arial",
      fill: "#ffffff"
    });
    startLabel.inputEnabled = true;
    startLabel.events.onInputUp.addOnce(this.start, this);

    var menuLevelLable = PrisonBreak.game.add.text(450, PrisonBreak.configs.GAME_HEIGHT - 300, 'Select Level', {
      font: "50px Arial",
      fill: "#ffffff"
    })
    menuLevelLable.inputEnabled = true;
    menuLevelLable.events.onInputUp.addOnce(this.menuLevel, this);

  },
  start: function(){
    PrisonBreak.game.state.start('stage1');
  },
  menuLevel: function(){
    PrisonBreak.game.state.start('menuLevel');
  }
}
