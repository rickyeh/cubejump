var Title = function(game) {
    console.log('Title State Loaded');

    this.BACKGROUND_COLOR = '#87CEEB';
};


Title.prototype = {
    create: function() {
        // Set world size of title menu
        game.world.setBounds(0, 0, 1344, 750);
        
        var cX = this.game.world.centerX;
        var cY = this.game.world.centerY;

        // Use scalemanager to scale the game
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.refresh();


        this.game.stage.backgroundColor = this.BACKGROUND_COLOR;

        // Add title image
        var title = this.game.add.sprite(cX, cY, 'title');
        title.anchor.set(0.5);

        // Add animating cube
        var cube = this.game.add.sprite(cX - 63, cY - 55, 'ninja');
        cube.anchor.set(0.5);

        // Add tween animation to the cube
        this.game.add.tween(cube)
            .to({
                y: 180
            }, 250, Phaser.Easing.Exponential.Out, false, 1500)
            .to({
                y: 320
            }, 400, Phaser.Easing.Exponential.In, true).loop().start();

        // Add button to start normal levels game
        var stageSelectButton = this.game.add.button(cX - 200, cY + 200, 'stageSelectButton', this.startLevelSelect, this);
        stageSelectButton.anchor.set(0.5);
        stageSelectButton.scale.set(0.7, 0.7);

        // Add button to start normal levels game
        var playButton = this.game.add.button(cX, cY + 200, 'playButton', this.startNormal, this);
        playButton.anchor.set(0.5);
        playButton.scale.set(0.7, 0.7);

        // REPLACE CODE FOR ENDLESS
        var endlessButton = this.game.add.button(cX + 200, cY + 200, 'endlessButton', this.startEndless, this);
        endlessButton.anchor.set(0.5);
        endlessButton.scale.set(0.7, 0.7);

        // Has to load invisible font usage so that main can have webfont loaded instantly
        this.preloadWebFont();

    },

    // "Preloads" the google web font at the title invisibly so it's ready for use in game
    preloadWebFont: function() {
        game.add.text(1, 1, 'Hi', {
            font: 'Aldrich',
            fontSize: '1px',
            fill: this.BACKGROUND_COLOR
        });
    },

    startNormal: function() {
        this.game.state.start('Main');
    },

    startEndless: function() {
        globals.stage = 0;
        this.game.state.start('Main');
    },
    
    startLevelSelect: function() {
        this.game.state.start('LevelSelect');
    }
};