var game = new Phaser.Game(800, 600, Phaser.AUTO, '',
    { preload: preload, create: create, update: update });

var player;
var floor;
var platforms;
var ground;
var jumpCount = 0;
var cursors;
var jumpButton;

function preload() {
    game.load.image('platform', 'assets/platform.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('ninja', 'assets/ninja.png');
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
    player = game.add.sprite(32, game.world.height - 150, 'ninja');

    // Enable physics to the player
    game.physics.arcade.enable(player);
    player.body.gravity.y = 2000;
    player.body.collideWorldBounds = true;

    // Add the jump button
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    jumpButton.onDown.add(jump, this);

    // Create the platforms
    platforms = this.add.physicsGroup();

    platforms.create(400, 400, 'platform');
    platforms.create(600, 300, 'platform');
    platforms.create(900, 200, 'platform');
    platforms.create(1200, 100, 'platform');

    platforms.setAll('body.allowGravity', false);
    platforms.setAll('body.immovable', true);
    platforms.setAll('body.velocity.x', -150);
}

function update() {

    // Collide player with floor (or the ground)
    game.physics.arcade.collide(player, floor);
    game.physics.arcade.collide(player, platforms, setFriction);

    player.body.velocity.x = 0;

    if (player.body.touching.down  && jumpCount > 0) {
        jumpCount = 0;
    }
}

function setFriction(player, platform) {
    player.body.x -= platform.body.x - platform.body.prev.x;
}

function jump() {
    if (jumpCount < 2) {
        ++jumpCount;
        player.body.velocity.y = -750;
    }
}