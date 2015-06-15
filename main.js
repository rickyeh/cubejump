var X_GAMESPEED = -400;

var Main = function(game) {
    console.log('main state called');

    this.jumpCount = 0;
    this.score = 0;
    this.scoreText = '';
};

Main.prototype = {

    create: function() {
        // Set background color, start physics engine
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Add the player to the game
        this.player = this.game.add.sprite(75, this.game.world.height - 150, 'ninja');
        this.player.anchor.setTo(0.4);

        // Enable physics to the player
        this.game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 4000;
        this.player.body.collideWorldBounds = false;

        // Add the jump button
        this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.jumpButton.onDown.add(this.jump, this);

        // Added mouse / touch functionality for jumping
        this.input.onDown.add(this.jump, this);

        // Initialize Physics for obstacles
        this.platforms = this.add.physicsGroup();
        this.spikes = this.add.physicsGroup();

        // Initialize floor
        this.floor = this.game.add.group();
        this.floor.enableBody = true;

        this.coins = this.game.add.group();
        this.coins.enableBody = true;

        // Initialize Scoreboard
        this.scoreText = this.game.add.text(1165, 16, 'Score: 0' , { fontSize: '32px', fill: '#000'});

        // Iniitialize audio
        this.coinSound = this.game.add.audio('coin');
        this.deathSound = this.game.add.audio('death');
        this.jumpSound = this.game.add.audio('jump');
        this.music = this.game.add.audio('music');

        this.music.play();

        // Create the world objects depending on stage selected
        switch(stageSelect) {
            case 0:
                this.startEndless();
                break;
            case 1:
                this.startLevel1();
                break;
            default:
                this.startEndless();
                break;
        }

        this.platforms.setAll('body.allowGravity', false);
        this.platforms.setAll('body.immovable', true);
        this.platforms.setAll('body.velocity.x', X_GAMESPEED);
        this.platforms.setAll('body.friction.x', 0);
        this.floor.setAll('body.allowGravity', false);
        this.floor.setAll('body.immovable', true);
        this.floor.setAll('body.velocity.x', X_GAMESPEED);
        this.floor.setAll('body.friction.x', 0);
        this.spikes.setAll('body.allowGravity', true);
        this.spikes.setAll('body.immovable', false);
        this.spikes.setAll('body.velocity.x', X_GAMESPEED);
        this.spikes.setAll('body.gravity.y', 4000);
        this.coins.setAll('body.velocity.x', X_GAMESPEED);
    },

    update: function() {

        this.player.body.velocity.x = 0;

        // Collide player with floor (or the ground)
        this.game.physics.arcade.collide(this.player, this.floor);
        this.game.physics.arcade.collide(this.player, this.platforms);

        this.game.physics.arcade.collide(this.spikes, this.floor);

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
        } else if (this.player.y > this.game.world.height + 1000) {
            this.die();
        }

        // Collision for coins
        this.game.physics.arcade.collide(this.coins, this.platforms);
        this.game.physics.arcade.collide(this.coins, this.floor);
        this.game.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, this);

    },

    jump: function() {
        if(this.jumpCount === 0) {
            this.jumpSound.play();  // play sound on first jump
        }
        if (this.jumpCount < 2) {
            ++this.jumpCount;
            this.player.body.velocity.y = -1000;
        }
        if (this.jumpCount === 2) {
            this.game.add.tween(this.player).to( { angle: 360 }, 400, Phaser.Easing.Linear.None, true);
        }
    },

    die: function() {
        console.log('Player has died');
        this.deathSound.play();
        this.resetGame();
    },

    resetGame: function() {
        this.score = 0;
        this.game.state.start('Main');
    },

    createRandomGround: function(numOfGround) {
        var x = 0;
        var gap = 0;

        // Creates the ground
        for ( var i = 0; i < numOfGround; i++) {
            this.floor.create(x + gap, this.game.world.height-112, 'grass');
            x += 1328 + gap;
            gap = this.game.rnd.integerInRange(100, 350);
        }
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


    },

    createRandomSpikes: function(numOfSpikes) {
        var x = 600;
        var y = 605;
        var spikeCount = 0;
        var gap = 0;

        while (spikeCount < numOfSpikes) {
            this.spikes.create(x + gap, y, 'spike');
            x += gap;
            gap = this.game.rnd.integerInRange(100,600);
            spikeCount++;
        }
    },

    createRandomCoins: function(numOfCoins) {
        var x = 500;
        var y = 100;
        var gap = 0;

        // Create 12 stars efvenly spaced apart
        for (var i = 0; i < numOfCoins; i++) {
            //Create a star inside of the 'stars' group
            var coin = this.coins.create(x + gap, y, 'coin');

            x += gap;
            gap = this.game.rnd.integerInRange(200,500);
        }
        this.coins.setAll('body.gravity.y', 4000);
    },
    collectCoin: function (player, coin) {
        coin.kill();
        this.coinSound.play();

        // Add and update the score
        this.score += 1;
        this.scoreText.text = 'Score: ' + this.score;
    },
    startEndless: function() {
        this.createRandomGround(20);
        this.createRandomPlatforms(40);
        this.createRandomSpikes(80);
        this.createRandomCoins(70);
    },
    startLevel1: function() {
        this.createFloor(0, 20);
        this.createBrick(1000, 500, 2);
        this.createBrick(1400, 500, 2);
        this.createBrick(1800, 500, 2);
        this.createBrick(2200, 500, 2);
        this.createCoin(500, 600, 3);
        this.createSpike(900, 600, 30);
    },
    createBrick: function(x, y, length) {
        if(length === undefined) {
            length = 1;
        }
        this.platforms.create(x, y, 'brick').scale.setTo(length, 1);
    },
    createFloor: function(x, length) {
        if(length === undefined) {
            length = 1;
        }

        for(var i = 0; i < length; i++) {
            this.floor.create(x, this.game.world.height-112, 'grass');
            x += 1300;
        }
    },
    createSpike: function(x, y, num) {
        if(num === undefined) {
            num = 1;
        }

        for(var i = 0; i < num; i++) {
            this.spikes.create(x, y, 'spike');
            x += 32;
        }
    },
    createCoin: function(x, y, num) {
        if(num === undefined) {
            num = 1;
        }
        for(var i = 0; i < num; i++) {
            this.coins.create(x, y, 'coin');
            x += 50;
        }
    }
};