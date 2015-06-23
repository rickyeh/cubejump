var Preload = function(game) {
    console.log('Preload State Loaded');
};

Preload.prototype = {
    preload: function() {
        game.load.image('platform', 'assets/platform.png');
        game.load.image('brick', 'assets/brick.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('ninja', 'assets/ninja.png');
        game.load.image('spike', 'assets/spikeO.png');
        game.load.image('coin', 'assets/coin.png');
        game.load.image('grass', 'assets/grass.png');
        game.load.image('title', 'assets/title.png');
        game.load.image('playButton', 'assets/playButton.png');
        game.load.image('endlessButton', 'assets/endlessButton.png');
        game.load.image('flagpole', 'assets/flagpole.png');

        this.load.audio('jump', 'assets/jump.wav');
        this.load.audio('coin', 'assets/coin.wav');
        this.load.audio('death', 'assets/death.wav');

        this.load.audio('music', ['assets/music_5th.mp3']);
    },
    create: function() {
        game.state.start('Title');
    }
};