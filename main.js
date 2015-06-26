var X_GAMESPEED = 500; // pixels per second
var ACCELERATION_FACTOR = 10 / X_GAMESPEED;
var DEBUG_MODE = false; 
var victoryFlag = false; // Flag to keep track of victory on level
var endlessMode = false; // Flag to toggle endless mode differences
var start;
var end;
var totalTime = 0;
var loopCount = 0;

var Main = function(game) {
    console.log('Main State Loaded');

    this.jumpCount = 0; // Tracks current amount of jumps, for double jumping
    this.score = 0;
    this.scoreText = '';
    this.lastScoreText = ''; // Text display for last score
    this.bestScoreText = ''; // Text display for best score
    this.timer;
    this.timerText = ''; // Text display for the timer
    this.blockType = 1; // 1 = brick, 2: spike, 3: coin, 4: floor
    this.quantity = 1; // Quantity for the level editor
    this.secondsElapsed = 0; // Keeps track of the seconds elapsed on a level
    this.lastScore = 0; // Variable that stores the last score for display
    this.bestScore = 0; // Variable that stores / retrieves the best score from localStorage
};

Main.prototype = {

    create: function() {
        game.time.advancedTiming = false;

        // Bounds of the world defined
        game.world.setBounds(0, 0, 35000, 750);

        // Start physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Add the player to the game, set its anchor
        this.player = game.add.sprite(100, game.world.height - 150, 'ninja');
        this.player.anchor.setTo(0.4);

        // Enable physics to the player
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 4000;
        this.player.body.collideWorldBounds = false;
        this.player.body.velocity.x = X_GAMESPEED;

        // INPUT

        // Added mouse / touch functionality for jumping
        var keyboard = game.input.keyboard;  // local variable for convenience

        this.input.onDown.add(this.onMouseOrTouch, this);


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
        // this.scoreText = game.add.text(1165, 16, 'Score: 0', {
        //     fontSize: '32px',
        //     fill: '#000'
        // });
        if(localStorage.getItem(stageSelect) !== null) {
            this.bestScore = localStorage.getItem(stageSelect);
        }
        this.bestScoreText = game.add.text(1165, 60, 'Best: ' + this.bestScore, {
            fontSize: '20px',
            fill: '#000'
        });
        this.lastScoreText = game.add.text(1165, 84, 'Last: ' + this.lastScore, {
            fontSize: '20px',
            fill: '#000'
        });

        this.scoreText.fixedToCamera = true;
        this.bestScoreText.fixedToCamera = true;
        this.lastScoreText.fixedToCamera = true;

        // Initialize Timer
        this.timerText = game.add.text(1165, 16, 'Time: 0', {
            fontSize: '32px',
            fill: '#000'
        });


        this.timerText.fixedToCamera = true;

        if (DEBUG_MODE) {
            this.player.body.velocity.x = 0;

            game.add.text(50, 10, 'DEBUG MODE').fixedToCamera = true;

            this.xText = game.add.text(50, 50, 'X Secs: ', {
                fontSize: '20px',
                fill: '#000'
            });
            this.yText = game.add.text(50, 70, 'Y: 0' + this.yPos, {
                fontSize: '20px',
                fill: '#000'
            });
            this.qtyText = game.add.text(50, 90, 'Qty: 0' + this.quantity, {
                fontSize: '20px',
                fill: '#000'
            });
            this.blockText = game.add.text(50, 110, 'Type: ' + this.blockType, {
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
                endlessMode = true;
                EndlessLevel.start.call(this);
                break;
            case 1:
                Level1.start.call(this); // bind the 'this' argument to Main
                break;
            case 2:
                Level2.start.call(this);
                break;
            case 3:
                // Level3.start.call(this);
                break;
            default:
                EndlessLevel.start.call(this);
                break;
        }

        victoryFlag = false;

        this.platforms.setAll('body.allowGravity', false);
        this.platforms.setAll('body.immovable', true);
        this.platforms.setAll('body.friction.x', 0);
        this.floor.setAll('body.allowGravity', false);
        this.floor.setAll('body.immovable', true);
        this.floor.setAll('body.friction.x', 0);
        this.spikes.setAll('body.allowGravity', true);
        this.spikes.setAll('body.immovable', false);
        this.spikes.setAll('body.gravity.y', 4000);
        this.flag.setAll('body.immovable', true);
        this.flag.setAll('body.gravity.y', 4000);
        this.flag.setAll('body.moves', false);

        if (endlessMode && !DEBUG_MODE) {
            this.player.body.acceleration.x = 10; 
        }

        if (!DEBUG_MODE) {
            this.timer = this.game.time.create();
            this.timer.loop(1000, this.updateTimer, this);
            this.timer.start();
        }

    },

    update: function() {

        var arcade = game.physics.arcade;
        var player = this.player;
        var playerBody = player.body;
        var coins = this.coins;
        var spikes = this.spikes;
        var floor = this.floor;
        var platforms = this.platforms;

        //  In debug, display X, Y, Qty, Type for level editing
        if (DEBUG_MODE) {
            this.xText.text = 'X Secs : ' + (game.camera.x + game.input.x) / 500;
            this.yText.text = 'Y : ' + game.input.y;
            this.qtyText.text = 'Qty : ' + this.quantity;
            this.blockText.text = 'Type: ' + this.blockType;

            // Scrolling keybinds for level editor
            if (this.cursors.left.isDown) {
                game.camera.x -= 50;
            } else if (this.cursors.right.isDown) {
                game.camera.x += 50;
            }
        } else { // Camera to follow player with offset
            game.camera.focusOnXY(player.x + 400, player.y);

            // If player gets stopped by brick
            if (playerBody.velocity.x < 500 && !victoryFlag) {
                if (endlessMode) { // Endless mode, uses current x position to recalculate approx speed
                    playerBody.velocity.x = X_GAMESPEED + (playerBody.x * ACCELERATION_FACTOR);
                } else { // Normal mode sets player speed back to default.
                    playerBody.velocity.x = X_GAMESPEED;
                }
            } else if (player.y > game.world.height + 500) {
                this.die();
            }
        }

        // Collide player with world objects
        arcade.collide(player, floor);
        arcade.collide(player, platforms);
        arcade.collide(player, this.flag, this.victory, null, this);
        arcade.collide(player, spikes, this.die, null, this);
        arcade.overlap(player, coins, this.collectCoin, null, this);

        arcade.collide(spikes, floor);
        arcade.collide(spikes, platforms);

        // Collision for coins
        arcade.collide(coins, platforms);
        arcade.collide(coins, floor);

        // Check for player touching an object on bottom, reset jump counter
        if (playerBody.touching.down) {
            this.jumpCount = 0;
        }

        // Debugging FPS display
        //console.log(game.time.fps);
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
        this.lastScore = this.secondsElapsed;
        if (this.lastScore > this.bestScore) {
            localStorage.setItem(stageSelect, this.lastScore);
        }
        this.deathSound.play();
        this.resetGame();
    },

    resetGame: function() {
        this.score = 0;
        this.secondsElapsed = 0;
        game.state.start('Main');
    },

    collectCoin: function(player, coin) {
        coin.kill();
        this.coinSound.play();

        // Add and update the score
        this.score += 1;
        this.scoreText.text = 'Score: ' + this.score;
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

    placeFlag: function(seconds) {
        var x = seconds * X_GAMESPEED;
        this.flag.create(x, 256, 'flagpole');
    },

    victory: function() {
        console.log('Victory!');
        victoryFlag = true;

        this.player.body.velocity.x = 0;
        this.timer.stop();

        // Display win message, go to next level
    },

    updateTimer: function() {
        this.secondsElapsed++;
        this.timerText.text = 'Time: ' + this.secondsElapsed;
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