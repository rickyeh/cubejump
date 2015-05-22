var Preload = function(game){
    console.log('preload state called');

};

Preload.prototype = {
    preload: function(){
        this.game.load.image('platform', 'assets/platform.png');
        this.game.load.image('ground', 'assets/platform.png');
        this.game.load.image('ninja', 'assets/ninja.png');
        this.game.load.image('spike', 'assets/spike.png');
    },
    create: function(){
        this.game.state.start('Title');
    }
};