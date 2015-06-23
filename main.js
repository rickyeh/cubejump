var X_GAMESPEED = 500; // pixels per second
var DEBUG_MODE = true;

var Main = function(game) {
    console.log('Main State Loaded');

    this.jumpCount = 0;
    this.score = 0;
    this.scoreText = '';
    this.blockType = 1; // 1 = brick, 2: spike, 3: coin, 4: floor
    this.quantity = 1;
};

Main.prototype = {

    create: function() {
        game.world.setBounds(0, 0, 35000, 750);

        // Set background color, start physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Add the player to the game
        this.player = game.add.sprite(100, game.world.height - 150, 'ninja');
        this.player.anchor.setTo(0.4);

        // Enable physics to the player
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 4000;
        this.player.body.collideWorldBounds = false;
        this.player.body.velocity.x = X_GAMESPEED;

        // Added mouse / touch functionality for jumping
        this.input.onDown.add(this.onMouseOrTouch, this);

        var keyboard = game.input.keyboard;

        // Add scroll buttons for level editor
        this.cursors = keyboard.createCursorKeys();

        keyboard.addKey(Phaser.Keyboard.UP).onDown.add(this.jump, this);
        keyboard.addKey(Phaser.Keyboard.TILDE).onDown.add(this.debugToggle, this);


        if (DEBUG_MODE) {
            keyboard.addKey(Phaser.Keyboard.A).onDown.add(this.brickToggle, this);
            keyboard.addKey(Phaser.Keyboard.S).onDown.add(this.spikeToggle, this);
            keyboard.addKey(Phaser.Keyboard.D).onDown.add(this.coinToggle, this);
            keyboard.addKey(Phaser.Keyboard.F).onDown.add(this.floorToggle, this);
            keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.placeItem, this);
            keyboard.addKey(Phaser.Keyboard.ONE).onDown.add(this.oneSwitch, this);
            keyboard.addKey(Phaser.Keyboard.TWO).onDown.add(this.twoSwitch, this);
            keyboard.addKey(Phaser.Keyboard.THREE).onDown.add(this.threeSwitch, this);
            keyboard.addKey(Phaser.Keyboard.FOUR).onDown.add(this.fourSwitch, this);
            keyboard.addKey(Phaser.Keyboard.FIVE).onDown.add(this.fiveSwitch, this);
            keyboard.addKey(Phaser.Keyboard.SIX).onDown.add(this.sixSwitch, this);
            keyboard.addKey(Phaser.Keyboard.SEVEN).onDown.add(this.sevenSwitch, this);
            keyboard.addKey(Phaser.Keyboard.EIGHT).onDown.add(this.eightSwitch, this);
            keyboard.addKey(Phaser.Keyboard.NINE).onDown.add(this.nineSwitch, this);
        }


        // Initialize Physics for obstacles
        this.platforms = this.add.physicsGroup();
        this.spikes = this.add.physicsGroup();
        this.flag = this.add.physicsGroup();

        // Initialize floor
        this.floor = game.add.group();
        this.floor.enableBody = true;

        this.coins = game.add.group();
        this.coins.enableBody = true;

        // Initialize Scoreboard
        this.scoreText = game.add.text(1165, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#000'
        });
        this.scoreText.fixedToCamera = true;

        if (DEBUG_MODE) {
            this.player.body.velocity.x = 0;

            game.add.text(50, 50, 'DEBUG MODE').fixedToCamera = true;

            this.xText = game.add.text(1165, 50, 'X Secs: ', {
                fontSize: '20px',
                fill: '#000'
            });
            this.yText = game.add.text(1165, 70, 'Y: 0' + this.yPos, {
                fontSize: '20px',
                fill: '#000'
            });
            this.qtyText = game.add.text(1165, 90, 'Qty: 0' + this.quantity, {
                fontSize: '20px',
                fill: '#000'
            });
            this.blockText = game.add.text(1165, 110, 'Type: ' + this.blockType, {
                fontSize: '20px',
                fill: '#000'
            });

            this.xText.fixedToCamera = true;
            this.yText.fixedToCamera = true;
            this.qtyText.fixedToCamera = true;
            this.blockText.fixedToCamera = true;
        }


        // Iniitialize audio
        this.coinSound = game.add.audio('coin');
        this.deathSound = game.add.audio('death');
        this.jumpSound = game.add.audio('jump');

        if (!this.music && !DEBUG_MODE) {
            this.music = game.add.audio('music');
            this.music.loopFull();
        }

        // Create the world objects depending on stage selected
        switch (stageSelect) {
            case 0:
                this.startEndless();
                break;
            case 1:
                Level1.start.call(this); // bind the 'this' argument to Main
                break;
            case 2:
                Level2.start.call(this);
                break;
            case 3:
                // Level3.start.call(this);
            default:
                this.startEndless();
                break;
        }

        this.platforms.setAll('body.allowGravity', false);
        this.platforms.setAll('body.immovable', true);
        this.platforms.setAll('body.friction.x', 0);
        this.floor.setAll('body.allowGravity', false);
        this.floor.setAll('body.immovable', true);
        this.floor.setAll('body.friction.x', 0);
        this.spikes.setAll('body.allowGravity', true);
        this.spikes.setAll('body.immovable', false);
        this.spikes.setAll('body.gravity.y', 4000);
        this.flag.setAll('body.immovable', false);
        this.flag.setAll('body.gravity.y', 4000);

        //this.platforms.setAll('body.velocity.x', -X_GAMESPEED);
        //this.flag.setAll('body.velocity.x', -X_GAMESPEED);
        //this.coins.setAll('body.velocity.x', -X_GAMESPEED);
        //this.spikes.setAll('body.velocity.x', -X_GAMESPEED);
        //this.floor.setAll('body.velocity.x', -X_GAMESPEED);
    },

    update: function() {
        // Camera to follow player with offset
        if (!DEBUG_MODE) {
            game.camera.focusOnXY(this.player.x + 400, this.player.y);
        }

        // Collide player with floor (or the ground)
        game.physics.arcade.collide(this.player, this.floor);
        game.physics.arcade.collide(this.player, this.platforms);

        game.physics.arcade.collide(this.spikes, this.floor);
        game.physics.arcade.collide(this.spikes, this.platforms);

        game.physics.arcade.collide(this.flag, this.floor);
        game.physics.arcade.collide(this.flag, this.player, this.victory, null, this);

        // Collide player with spikes, and call die function
        game.physics.arcade.collide(this.player, this.spikes, this.die, null, this);

        if (this.player.body.touching.down && this.jumpCount > 0) {
            this.jumpCount = 0;
        }

        // If player gets stopped, set speed back to default
        if (this.player.body.velocity.x < 500 && !DEBUG_MODE) {
            this.player.body.velocity.x = 500;
        } else if (this.player.y > game.world.height + 500) {
            this.die();
        }

        // Collision for coins
        game.physics.arcade.collide(this.coins, this.platforms);
        game.physics.arcade.collide(this.coins, this.floor);
        game.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, this);

        // Scrolling keybinds for level editor
        if (this.cursors.left.isDown) {
            game.camera.x -= 50;
        } else if (this.cursors.right.isDown) {
            game.camera.x += 50;
        }

        //  In debug, display X, Y, Qty, Type for level editing
        if (DEBUG_MODE) {
            this.xText.text = 'X Secs : ' + (game.camera.x + game.input.x) / 500;
            this.yText.text = 'Y : ' + game.input.y;
            this.qtyText.text = 'Qty : ' + this.quantity;
            this.blockText.text = 'Type: ' + this.blockType;
        }
    },

    onMouseOrTouch: function() {

        if (DEBUG_MODE) {

            var itemX = (game.camera.x + game.input.x) / 500;
            var itemY = game.input.y;

            switch (this.blockType) {
                case 1:
                    console.log('this.createBrick(' + itemX + ', ' + itemY + ', ' + this.quantity + ');');
                    this.createBrick(itemX, itemY, this.quantity);
                    break;
                case 2:
                    console.log('this.createSpike(' + itemX + ', ' + itemY + ', ' + this.quantity + ');');
                    this.createSpike(itemX, itemY, this.quantity);
                    break;
                case 3:
                    console.log('this.createCoin(' + itemX + ', ' + itemY + ', ' + this.quantity + ');');
                    this.createCoin(itemX, itemY, this.quantity);
                    break;
                case 4:
                    console.log('this.createFloor(' + itemX + ', ' + itemY + ', ' + this.quantity + ');');
                    this.createFloor(itemX, this.quantity);
                    break;
            }
        } else {
            this.jump();
        }

    },

    jump: function() {
        if (this.jumpCount === 0) {
            this.jumpSound.play(); // play sound on first jump
        }
        if (this.jumpCount < 2) {
            ++this.jumpCount;
            this.player.body.velocity.y = -1000;
        }
        if (this.jumpCount === 2) {
            game.add.tween(this.player).to({
                angle: 360
            }, 400, Phaser.Easing.Linear.None, true);
        }
    },

    die: function() {
        console.log('Player has died');
        this.deathSound.play();
        this.resetGame();
    },

    resetGame: function() {
        this.score = 0;
        game.state.start('Main');
    },

    createRandomGround: function(numOfGround) {
        var x = 0;
        var gap = 0;

        // Creates the ground
        for (var i = 0; i < numOfGround; i++) {
            this.floor.create(x + gap, game.world.height - 112, 'grass');
            x += 1328 + gap;
            gap = game.rnd.integerInRange(100, 350);
        }
    },

    createRandomPlatforms: function(numOfPlatforms) {
        var gap = 500;
        var x = 500;
        var platformCount = 0;

        this.platforms.create(450, 450, 'platform');

        while (platformCount < numOfPlatforms) {
            this.platforms.create(x + gap, game.rnd.integerInRange(200, 450), 'platform');
            platformCount++;
            x += gap;
            gap = game.rnd.integerInRange(450, 800);
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
            gap = game.rnd.integerInRange(100, 600);
            spikeCount++;
        }
    },

    createRandomCoins: function(numOfCoins) {
        var x = 500;
        var y = 100;
        var gap = 0;

        for (var i = 0; i < numOfCoins; i++) {
            this.coins.create(x + gap, y, 'coin');

            x += gap;
            gap = game.rnd.integerInRange(200, 500);
        }
        this.coins.setAll('body.gravity.y', 4000);
    },

    collectCoin: function(player, coin) {
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

    createBrick: function(seconds, y, length) {
        var x = seconds * X_GAMESPEED;

        if (length === undefined) {
            length = 1;
        }
        this.platforms.create(x, y, 'brick').scale.setTo(length, 1);
    },

    createFloor: function(seconds, length) {
        var x = seconds * X_GAMESPEED;

        if (length === undefined) {
            length = 1;
        }

        for (var i = 0; i < length; i++) {
            this.floor.create(x, game.world.height - 112, 'grass');
            x += 500; // each floor tile is 500px wide
        }
    },

    createSpike: function(seconds, y, num) {
        var x = seconds * X_GAMESPEED;

        if (num === undefined) {
            num = 1;
        }

        for (var i = 0; i < num; i++) {
            this.spikes.create(x, y, 'spike');
            x += 32;
        }
    },

    createCoin: function(seconds, y, num) {
        var x = seconds * X_GAMESPEED;

        if (num === undefined) {
            num = 1;
        }
        for (var i = 0; i < num; i++) {
            this.coins.create(x, y, 'coin');
            x += 50;
        }
    },

    placeFlag: function(seconds, y) {
        var x = seconds * X_GAMESPEED;
        this.flag.create(x, y, 'flagpole');
    },

    victory: function() {
        this.player.body.velocity.x = 0;

        // Display win message, go to next level
    },
    debugToggle: function() {
        if (DEBUG_MODE) {
            console.log('Debug Mode : OFF');
            DEBUG_MODE = false;
        } else {
            console.log('Debug Mode : ON');
            DEBUG_MODE = true;
        }
    },

    brickToggle: function() {
        this.blockType = 1;
    },

    spikeToggle: function() {
        this.blockType = 2;
    },

    coinToggle: function() {
        this.blockType = 3;
    },

    floorToggle: function() {
        this.blockType = 4;
    },

    placeItem: function() {
        console.log('Spacebar');
    },

    oneSwitch: function() {
        this.quantity = 1;
    },
    twoSwitch: function() {
        this.quantity = 2;
    },
    threeSwitch: function() {
        this.quantity = 3;
    },
    fourSwitch: function() {
        this.quantity = 4;
    },
    fiveSwitch: function() {
        this.quantity = 5;
    },
    sixSwitch: function() {
        this.quantity = 6;
    },
    sevenSwitch: function() {
        this.quantity = 7;
    },
    eightSwitch: function() {
        this.quantity = 8;
    },
    nineSwitch: function() {
        this.quantity = 9;
    },
};