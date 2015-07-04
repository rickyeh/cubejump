// This state is used for the level select screen. It is called when button is pressed from title screen.
var LevelSelect = function(game) {
    console.log('Level Select loaded');
};


LevelSelect.prototype = {
    create: function() {
        var cX = this.game.world.centerX;
        var cY = this.game.world.centerY;

        // Button for stage One
        var stageOneButton = this.game.add.button(cX, cY - 225, 'stageBanner', this.startLevelOne, this);
        stageOneButton.anchor.set(0.5);

        var stageOneText = game.add.text(0, 0, 'Stage : 1', {
            font: 'Aldrich',
            fontSize: '72px',
            fill: '#000'
        });
        stageOneText.anchor.set(0.5);
        stageOneButton.addChild(stageOneText);

        // Button for stage Two
        var stageTwoButton = this.game.add.button(cX, cY, 'stageBanner', this.startLevelTwo, this);
        stageTwoButton.anchor.set(0.5);

        var stageTwoText = game.add.text(0, 0, 'Stage : 2', {
            font: 'Aldrich',
            fontSize: '72px',
            fill: '#000'
        });
        stageTwoText.anchor.set(0.5);
        stageTwoButton.addChild(stageTwoText);

        // Button to return to Title screen
        var backButton = this.game.add.button(cX, cY + 225, 'stageBanner', this.backToMenu, this);
        backButton.anchor.set(0.5);

        var backText = game.add.text(0, 0, 'Back', {
            font: 'Aldrich',
            fontSize: '72px',
            fill: '#000'
        });
        backText.anchor.set(0.5);
        backButton.addChild(backText);
    },

    startLevelOne: function() {
        globals.stage = 1;
        console.log('Loading stage 1');
        this.game.state.start('Main');
    },

    startLevelTwo: function() {
        globals.stage = 2;
        console.log('Loading stage 2');
        this.game.state.start('Main');
    },

    backToMenu: function() {
        this.game.state.start('Title');
    },
};