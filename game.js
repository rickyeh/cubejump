// Create the Phaser game
var game = new Phaser.Game(800, 600, Phaser.AUTO, '',
    { preload: preload, create: create, update: update });

var X_GAMESPEED = -500;
var player;
var floor;
var platforms;
var spikes;
var ground;
var jumpCount = 0;
var cursors;
var jumpButton;

function preload() {
    game.load.image('platform', 'assets/platform.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('ninja', 'assets/ninja.png');
    game.load.image('spike', 'assets/spike.png');
}

function create() {
    // Set background color, start physics engine
    game.stage.backgroundColor = '#87CEEB';
    game.physics.startSystem(Phaser.Physics.ARCADE);

    floor = game.add.group();
    floor.enableBody = true;

    // Creates the ground
    ground = floor.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2,2);
    ground.body.immovable = true;

    // Add the player to the game
    player = game.add.sprite(75, game.world.height - 150, 'ninja');

    // Enable physics to the player
    game.physics.arcade.enable(player);
    player.body.gravity.y = 4000;
    player.body.collideWorldBounds = true;

    // Add the jump button
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    jumpButton.onDown.add(jump, this);

    // Initialize Physics for obstacles
    platforms = this.add.physicsGroup();
    spikes = this.add.physicsGroup();

    // Create the platforms
    createRandomPlatforms(20);
    createRandomSpikes(40);
}

function update() {

    // Collide player with floor (or the ground)
    game.physics.arcade.collide(player, floor);
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(player, spikes);

    player.body.velocity.x = 0;

    if (player.body.touching.down  && jumpCount > 0) {
        jumpCount = 0;
    }
}

function jump() {
    if (jumpCount < 2) {
        ++jumpCount;
        player.body.velocity.y = -1000;
    }
}

function createRandomPlatforms(numOfPlatforms) {
    console.log(platformCount);
    // platforms.create(400, 400, 'platform');

    var gap = 500;
    var x = 0;
    var platformCount = 0;

    while (platformCount < numOfPlatforms) {
        platforms.create( x + gap, game.rnd.integerInRange(100,400), 'platform');
        platformCount++;
        x +=  gap;
        gap = game.rnd.integerInRange(450, 700);
    }

    platforms.setAll('body.allowGravity', false);
    platforms.setAll('body.immovable', true);
    platforms.setAll('body.velocity.x', X_GAMESPEED);
    platforms.setAll('body.friction.x', 0);
}

function createRandomSpikes(numOfSpikes) {
    var x = 600;
    var y = 505;
    var spikeCount = 0;
    var gap = 0;

    while (spikeCount < numOfSpikes) {
        spikes.create(x + gap, y, 'spike');
        x += gap;
        gap = game.rnd.integerInRange(100,600);
        spikeCount++;
    }

    spikes.setAll('body.allowGravity', true);
    spikes.setAll('body.immovable', true);
    spikes.setAll('body.velocity.x', X_GAMESPEED);
    spikes.setAll('body.friction.x', 0);
}