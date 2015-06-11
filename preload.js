var Preload = function(game) {
    console.log('preload state called');

};

Preload.prototype = {
    preload: function() {
        this.game.load.image('platform', 'assets/platform.png');
        this.game.load.image('ground', 'assets/platform.png');
        this.game.load.image('ninja', 'assets/ninja.png');
        this.game.load.image('spike', 'assets/spikeO.png');
        this.game.load.image('coin', 'assets/coin.png');
        this.game.load.image('grass', 'assets/grass.png');
        this.game.load.image('title', 'assets/title.png');
        this.game.load.image('playButton', 'assets/playButton.png');

        this.load.audio('jump', 'assets/jump.wav');
        this.load.audio('coin', 'assets/coin.wav');
        this.load.audio('death', 'assets/death.wav');
    },
    create: function() {
        this.game.state.start('Title');
    }
};