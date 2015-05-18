var game = new Phaser.Game(800, 600, Phaser.AUTO, '',
    { preload: preload, create: create, update: update });

var player;
var platforms;
var ground;
var jumpCount = 0;
var cursors;
var jumpButton;

function preload() {
    game.load.image('ground', 'assets/platform.png');
    game.load.image('ninja', 'assets/ninja.png');
}

function create() {
    // Set background color, start physics engine
    game.stage.backgroundColor = '#87CEEB';
    game.physics.startSystem(Phaser.Physics.ARCADE);

    platforms = game.add.group();
    platforms.enableBody = true;

    // Creates the ground
    ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2,2);
    ground.body.immovable = true;

    // Add the player to the game
    player = game.add.sprite(32, game.world.height - 150, 'ninja');

    // Enable physics to the player
    game.physics.arcade.enable(player);
    player.body.gravity.y = 2000;
    player.body.collideWorldBounds = true;

    //this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    jumpButton.onDown.add(jump, this);
}

function update() {

    // Collide player with platforms (or the ground)
    game.physics.arcade.collide(player, platforms);

    player.body.velocity.x = 0;

    if (player.body.touching.down  && jumpCount > 0) {
        jumpCount = 0;
    }
}

function jump() {
    if (jumpCount < 2) {
        ++jumpCount;
        player.body.velocity.y = -750;
    }
}