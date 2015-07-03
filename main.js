var Main = function(game) {
    console.log('Main State Loaded');

    this.X_GAMESPEED = 500; // Speed of the game in pixels per second
    this.ACCELERATION_FACTOR = 10 / this.X_GAMESPEED;
    this.IS_DEBUG_MODE = false;

    this.isVictory = false; // Flag to keep track of victory on level
    this.jumpCount = 0; // Tracks current amount of jumps, for double jumping
    this.score = 0; // Keeps track of the player's score internally
    this.scoreText = ''; // Text display element of the score
    this.isEndlessMode = false; // Flag to toggle endless mode differences
    this.timer = null; // Stores the phaser timer created to increment the score
    this.blockType = 1; // 1 = brick, 2: spike, 3: coin, 4: floor
    this.quantity = 1; // Quantity for the level editor
    this.secondsElapsed = 0; // Keeps track of the seconds elapsed on a level
    this.lastScore = 0; // Variable that stores the last score for display
    this.bestScore = 0; // Variable that stores / retrieves the best score from localStorage
    this.banner = null; // Variable to store the flag's banner

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
        this.player.body.velocity.x = this.X_GAMESPEED;

        // INPUT

        // Added mouse / touch functionality for jumping
        var keyboard = game.input.keyboard;  // local variable for convenience

        this.input.onDown.add(this.onMouseOrTouch, this);


        // Add scroll buttons for level editor
        this.cursors = keyboard.createCursorKeys();

        keyboard.addKey(Phaser.Keyboard.UP).onDown.add(this.jump, this);
        keyboard.addKey(Phaser.Keyboard.TILDE).onDown.add(this.debugToggle, this);


        if (this.IS_DEBUG_MODE) {
            keyboard.addKey(Phaser.Keyboard.A).onDown.add(this.brickToggle, this);
            keyboard.addKey(Phaser.Keyboard.S).onDown.add(this.spikeToggle, this);
            keyboard.addKey(Phaser.Keyboard.D).onDown.add(this.coinToggle, this);
            keyboard.addKey(Phaser.Keyboard.F).onDown.add(this.floorToggle, this);
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
        this.scoreText = game.add.text(50, 16, 'Score: 0', {
            font: 'Aldrich',
            fontSize: '32px',
            fill: '#000'
        });

        if (localStorage.getItem(globals.stage) !== null) {
            this.bestScore = localStorage.getItem(globals.stage);
        }

        var bestScoreText = game.add.text(50, 60, 'Best: ' + this.bestScore, {
            font: 'Aldrich',
            fontSize: '20px',
            fill: '#000'
        });

        var lastScoreText = game.add.text(50, 84, 'Last: ' + this.lastScore, {
            font: 'Aldrich',
            fontSize: '20px',
            fill: '#000'
        });

        this.scoreText.fixedToCamera = true;
        bestScoreText.fixedToCamera = true;
        lastScoreText.fixedToCamera = true;

        // Back button
        this.backButton = this.game.add.button(1265, 50, 'xButton', this.backToMenu, this);
        this.backButton.anchor.set(0.5);
        this.backButton.scale.set(0.9, 0.9);
        this.backButton.fixedToCamera = true;

        if (this.IS_DEBUG_MODE) {
            this.player.body.velocity.x = 0;

            game.add.text(50, 130, 'DEBUG MODE').fixedToCamera = true;

            this.xText = game.add.text(50, 160, 'X Secs: ', {
                fontSize: '20px',
                fill: '#000'
            });
            this.yText = game.add.text(50, 180, 'Y: 0' + this.yPos, {
                fontSize: '20px',
                fill: '#000'
            });
            this.qtyText = game.add.text(50, 200, 'Qty: 0' + this.quantity, {
                fontSize: '20px',
                fill: '#000'
            });
            this.blockText = game.add.text(50, 220, 'Type: ' + this.blockType, {
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
        this.coinSound.volume = 0.2;
        this.deathSound = game.add.audio('death');
        this.jumpSound = game.add.audio('jump');
        this.jumpSound.volume = 0.5;

        if (!this.music && !this.IS_DEBUG_MODE) {
            this.music = game.add.audio('music');
            this.music.loopFull();
        }

        // Create the world objects depending on stage selected
        switch (globals.stage) {
            case 0:
                this.isEndlessMode = true;
                EndlessLevel.start.call(this);
                break;
            case 1:
                Level1.start.call(this); // bind the 'this' argument to Main
                break;
            case 2:
                Level2.start.call(this);
                break;
            default:
                EndlessLevel.start.call(this);
                break;
        }

        this.isVictory = false;

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

        if (this.isEndlessMode && !this.IS_DEBUG_MODE) {
            this.player.body.acceleration.x = 10; 
        }

        if (!this.IS_DEBUG_MODE) {
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
        if (this.IS_DEBUG_MODE) {
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
            if (playerBody.velocity.x < 500 && !this.isVictory) {
                if (this.isEndlessMode) { // Endless mode, uses current x position to recalculate approx speed
                    playerBody.velocity.x = this.X_GAMESPEED + (playerBody.x * this.ACCELERATION_FACTOR);
                } else { // Normal mode sets player speed back to default.
                    playerBody.velocity.x = this.X_GAMESPEED;
                }
            } else if (player.y > game.world.height + 500) {
                this.die();
            }
        }

        // Collide player with world objects
        arcade.collide(player, floor, this.resetJump, null, this);
        arcade.collide(player, platforms, this.resetJump, null, this);
        arcade.collide(player, this.flag, this.victory, null, this);
        arcade.collide(player, spikes, this.die, null, this);
        arcade.overlap(player, coins, this.collectCoin, null, this);

        arcade.collide(spikes, floor);
        arcade.collide(spikes, platforms);

        // Collision for coins
        arcade.collide(coins, platforms);
        arcade.collide(coins, floor);

        // Debugging FPS display
        //console.log(game.time.fps);

        //console.log(game.camera.x + ' vs ' + spikes.children[0].position.x);

        // var firstSpike = spikes.children[0];

        // if (firstSpike && firstSpike.position.x < game.camera.x + 150) {
        //     spikes.remove(firstSpike, false /* destroy */ , true /* silent */ );
        // }

    },

    onMouseOrTouch: function() {

        if (this.IS_DEBUG_MODE) {

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

        switch (this.jumpCount) {
            case 0:
                this.jumpSound.play();
                this.player.body.velocity.y = -1000;
                this.jumpCount++;
                break;
            case 1:
                this.player.body.velocity.y = -1000;
                this.jumpCount++;
                game.add.tween(this.player).to({
                    angle: 360
                }, 400, Phaser.Easing.Linear.None, true);
                break;
            default:
                break;
        }
    },

    resetJump: function() {

       if (this.player.body.touching.down) {
           this.jumpCount = 0;            
       }
    },

    die: function() {
        console.log('Player has died');
        this.lastScore = this.score;
        if (this.lastScore > this.bestScore) {
            localStorage.setItem(globals.stage, this.lastScore);
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
        this.score += 10;
        this.scoreText.text = 'Score: ' + this.score;
    },

    createBrick: function(seconds, y, length, height) {
        var x = seconds * this.X_GAMESPEED;

        if (length === undefined) {
            length = 1;
        }
        if (height === undefined) {
            height = 1;
        }
        this.platforms.create(x, y, 'brick').scale.setTo(length, height);
    },

    createFloor: function(seconds, length) {
        var x = seconds * this.X_GAMESPEED;

        if (length === undefined) {
            length = 1;
        }

        for (var i = 0; i < length; i++) {
            this.floor.create(x, game.world.height - 112, 'grass');
            x += 500; // each floor tile is 500px wide
        }
    },

    createSpike: function(seconds, y, num) {
        var x = seconds * this.X_GAMESPEED;

        if (num === undefined) {
            num = 1;
        }

        for (var i = 0; i < num; i++) {
            this.spikes.create(x, y, 'spike');
            x += 32;
        }
    },

    createCoin: function(seconds, y, num) {
        var x = seconds * this.X_GAMESPEED;

        if (num === undefined) {
            num = 1;
        }
        for (var i = 0; i < num; i++) {
            this.coins.create(x, y, 'coin');
            x += 50;
        }
    },

    placeFlag: function(seconds) {
        var x = seconds * this.X_GAMESPEED;
        this.flag.create(x, 256, 'flagpole');

        this.banner = game.add.sprite(x + 3, 270, 'banner');
        this.banner.anchor.setTo(1, 0);

    },

    victory: function() {

        var playerWalkTween = function() {
            var walkTo = this.player.body.x + 200;
            game.add.tween(this.player)
                .to({x : walkTo}, 1000, Phaser.Easing.Linear.In)
                .start()
                .onComplete.add(victoryJump, this);
        };

        var victoryJump = function() {
            var victoryText;
            var nextLevelButton;
            var cX = game.width/2;
            var cY = this.game.world.centerY;

            // Congratulatory text
            victoryText = game.add.text(cX, cY - 100, 'Level Complete!', {
                font: 'Aldrich',
                fontSize: '64px',
                fill: '#333'
            });
            victoryText.fixedToCamera = true;
            victoryText.anchor.setTo(0.5);

            // Sprite for the next level button
            globals.stage++;
            nextLevelButton = this.game.add.button(cX, cY + 150, 'playButton', game.state.states.Main.resetGame , this);
            nextLevelButton.fixedToCamera = true;
            nextLevelButton.anchor.set(0.5);
            nextLevelButton.scale.set(0.7);

            this.jump();
            game.time.events.add(Phaser.Timer.SECOND, this.jump, this);

        };

        this.isVictory = true;

        this.player.body.velocity.x = 0;
        this.timer.stop();

        var bannerTween = this.game.add.tween(this.banner)
            .to({y: 575}, 1500, Phaser.Easing.Linear.In).start();
        bannerTween.onComplete.add(playerWalkTween, this);

    },

    updateTimer: function() {
        this.score += 100;
        this.secondsElapsed++;
        this.scoreText.text = 'Score: ' + this.score;
    },

    backToMenu: function() {
        this.game.state.start('Title');
    },

    debugToggle: function() {
        if (this.IS_DEBUG_MODE) {
            console.log('Debug Mode : OFF');
            this.IS_DEBUG_MODE = false;
        } else {
            console.log('Debug Mode : ON');
            this.IS_DEBUG_MODE = true;
        }

        this.game.state.start('Main');
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
    }
};