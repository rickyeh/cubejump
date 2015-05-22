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

        this.floor = this.game.add.group();
        this.floor.enableBody = true;

        // Creates the ground
        this.ground = this.floor.create(0, this.game.world.height - 64, 'ground');
        this.ground.scale.setTo(2,2);
        this.ground.body.immovable = true;

        // Add the player to the game
        this.player = this.game.add.sprite(75, this.game.world.height - 150, 'ninja');

        // Enable physics to the player
        this.game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 4000;
        this.player.body.collideWorldBounds = true;

        // Add the jump button
        this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.jumpButton.onDown.add(this.jump, this);

        // Initialize Physics for obstacles
        this.platforms = this.add.physicsGroup();
        this.spikes = this.add.physicsGroup();

        // Create the platforms
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
    },

    jump: function() {
        if (this.jumpCount < 2) {
            ++this.jumpCount;
            this.player.body.velocity.y = -1000;
        }
    },

    die: function() {
        console.log('Player has died');
        this.resetGame();
    },

    resetGame: function() {
        this.game.state.start("Main");
    },

    createRandomPlatforms: function(numOfPlatforms) {
        console.log(platformCount);
        // platforms.create(400, 400, 'platform');

        var gap = 500;
        var x = 0;
        var platformCount = 0;

        while (platformCount < numOfPlatforms) {
            this.platforms.create( x + gap, this.game.rnd.integerInRange(100,400), 'platform');
            platformCount++;
            x +=  gap;
            gap = this.game.rnd.integerInRange(450, 700);
        }

        this.platforms.setAll('body.allowGravity', false);
        this.platforms.setAll('body.immovable', true);
        this.platforms.setAll('body.velocity.x', X_GAMESPEED);
        this.platforms.setAll('body.friction.x', 0);
    },

    createRandomSpikes: function(numOfSpikes) {
        var x = 600;
        var y = 504;
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