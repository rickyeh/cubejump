var stageSelect = 1;

var Title = function(game) {
    console.log('Title State Loaded');
};


Title.prototype = {
    create: function() {
        this.game.stage.backgroundColor = '#87CEEB';

        // Add title image
        this.title = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'title');
        this.title.anchor.set(0.5);

        // Add animating cube
        this.cube = this.game.add.sprite(this.game.world.centerX - 60, this.game.world.centerY - 55, 'ninja');
        this.cube.anchor.set(0.5);

        // Add tween animation to the cube
        this.tween = this.game.add.tween(this.cube)
        .to({ y: 180}, 250, Phaser.Easing.Exponential.Out, false, 1500)
        .to({ y: 320}, 400, Phaser.Easing.Exponential.In, true).loop().start();

        // Add button to start normal levels game
        this.stageSelectButton = this.game.add.button(this.game.world.centerX - 200, this.game.world.centerY + 200, 'stageSelectButton', this.stageSelect, this);
        this.stageSelectButton.anchor.set(0.5);
        this.stageSelectButton.scale.set(0.7, 0.7);

        // Add button to start normal levels game
        this.button = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 200, 'playButton', this.startNormal, this);
        this.button.anchor.set(0.5);
        this.button.scale.set(0.7, 0.7);

        // REPLACE CODE FOR ENDLESS
        this.endlessButton = this.game.add.button(this.game.world.centerX + 200, this.game.world.centerY + 200, 'endlessButton', this.startEndless, this);
        this.endlessButton.anchor.set(0.5);
        this.endlessButton.scale.set(0.7, 0.7);

    },
    startNormal: function() {
        this.game.state.start('Main');
    },
    startEndless: function() {
        stageSelect = 0;
        this.game.state.start('Main');
    },
    stageSelect: function() {
        if (stageSelect === 1) {
            stageSelect++;
            console.log('Stage 2 Selected');
        } else if (stageSelect === 2) {
            stageSelect--;
            console.log('Stage 1 Selected');
        }
    }
};