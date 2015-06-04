var X_GAMESPEED = -400;

var Main = function(game) {
    console.log('main state called');

    // this.player;
    // this.floor;
    // this.platforms;
    // this.spikes;
    // this.ground;
    // this.cursors;
    // this.jumpButton;
    this.jumpCount = 0;
};

Main.prototype = {

    create: function() {

        // Set background color, start physics engine
        this.game.stage.backgroundColor = '#87CEEB';
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Add the player to the game
        this.player = this.game.add.sprite(75, this.game.world.height - 150, 'ninja');
        this.player.anchor.setTo(0.4);

        // Enable physics to the player
        this.game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 4000;
        this.player.body.collideWorldBounds = true;

        // Add the jump button
        this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.jumpButton.onDown.add(this.jump, this);

        // Added mouse / touch functionality for jumping
        this.input.onDown.add(this.jump, this);

        // Initialize Physics for obstacles
        this.platforms = this.add.physicsGroup();
        this.spikes = this.add.physicsGroup();

        // Create the world objects
        this.createRandomGround();
        this.createRandomPlatforms(20);
        this.createRandomSpikes(40);
    },

    update: function() {

        this.player.body.velocity.x = 0;

        // Collide player with floor (or the ground)
        this.game.physics.arcade.collide(this.player, this.floor);
        this.game.physics.arcade.collide(this.player, this.platforms);

        // Collide player with spikes, and call die function
        this.game.physics.arcade.collide(this.player, this.spikes, this.die, null, this);

        if (this.player.body.touching.down  && this.jumpCount > 0) {
            this.jumpCount = 0;
        }

        // If player gets pushed back, slowly move cube back to starting position.
        if (this.player.x < 0) {
            this.die();
        } else if (this.player.x < 75  && this.player.body.velocity.x === 0) {
            this.player.body.velocity.x = 10;
        }
    },

    jump: function() {
        if (this.jumpCount < 2) {
            ++this.jumpCount;
            this.player.body.velocity.y = -1000;
        }
        //this.player.body.sprite.angle = 45;
        if (this.jumpCount === 2) {
            this.game.add.tween(this.player).to( { angle: 360 }, 400, Phaser.Easing.Linear.None, true);
        }
    },

    die: function() {
        console.log('Player has died');
        this.resetGame();
    },

    resetGame: function() {
        this.game.state.start('Main');
    },

    createRandomGround: function() {
        var x = 0;
        var gap = 0;
        var groundCount = 10;

        this.floor = this.game.add.group();
        this.floor.enableBody = true;

        // Creates the ground
        for ( var i = 0; i < groundCount; i++) {
            this.floor.create(x + gap, this.game.world.height-112, 'grass');
            x += 1328 + gap;
            gap = this.game.rnd.integerInRange(100, 350);
        }
        
        this.floor.setAll('body.allowGravity', false);
        this.floor.setAll('body.immovable', true);
        this.floor.setAll('body.velocity.x', X_GAMESPEED);
        this.floor.setAll('body.friction.x', 0);
    },

    createRandomPlatforms: function(numOfPlatforms) {

        var gap = 500;
        var x = 500;
        var platformCount = 0;

        this.platforms.create(450, 450, 'platform');

        while (platformCount < numOfPlatforms) {
            this.platforms.create( x + gap, this.game.rnd.integerInRange(200,450), 'platform');
            platformCount++;
            x +=  gap;
            gap = this.game.rnd.integerInRange(450, 800);
        }

        this.platforms.setAll('body.allowGravity', false);
        this.platforms.setAll('body.immovable', true);
        this.platforms.setAll('body.velocity.x', X_GAMESPEED);
        this.platforms.setAll('body.friction.x', 0);
    },

    createRandomSpikes: function(numOfSpikes) {
        var x = 600;
        var y = 606;
        var spikeCount = 0;
        var gap = 0;

        while (spikeCount < numOfSpikes) {
            this.spikes.create(x + gap, y, 'spike');
            x += gap;
            gap = this.game.rnd.integerInRange(100,600);
            spikeCount++;
        }

        this.spikes.setAll('body.allowGravity', true);
        this.spikes.setAll('body.immovable', true);
        this.spikes.setAll('body.velocity.x', X_GAMESPEED);
        this.spikes.setAll('body.friction.x', 0);
    }
};