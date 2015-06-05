var Title = function(game) {
    console.log('title state called');
};

Title.prototype = {
    create: function() {
        this.game.stage.backgroundColor = '#87CEEB';

        this.style = {
            font: '100px Arial',
            fill: '#222222',
            algin: 'center'
        };
        this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, 'CubeJumper', this.style);
        this.text.anchor.set(0.5);

        this.button = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 150, 'startButton', this.startClick, this);
        this.button.anchor.set(0.5);
    },

    startClick: function() {
        // Start button click handler
        this.game.state.start('Main');
    }
};