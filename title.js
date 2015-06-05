var Title = function(game) {
    console.log('title state called');
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
        console.log(this.game.world.centerY);

        // Add tween animation to the cube
        this.tween = this.game.add.tween(this.cube)
        .to({ y: 180}, 250, Phaser.Easing.Exponential.Out, false, 3000)
        .to({ y: 320}, 400, Phaser.Easing.Exponential.In, true).loop().start();

        // Add button to start game
        this.button = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 200, 'startButton', this.startClick, this);
        this.button.anchor.set(0.5);
        this.button.scale.set(0.7, 0.7);
    },

    startClick: function() {
        // Start button click handler
        this.game.state.start('Main');
    }
};