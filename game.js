var game = new Phaser.Game(800, 600, Phaser.AUTO, '',
    { preload: preload, create: create, update: update });

var player;
var platforms;
var ground;

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
    player.body.gravity.y = 500;
    player.body.collideWorldBounds = true;
}

function update() {
    // Collide player with platforms (or the ground)
    game.physics.arcade.collide(player, platforms);
}