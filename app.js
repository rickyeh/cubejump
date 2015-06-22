var game = null; // Make it global so that it can be accessed by other JS files.

(function() {
    game = new Phaser.Game(1334, 750, Phaser.AUTO, "gameScreen", {});
    game.state.add("Preload", Preload);
    game.state.add("Title", Title);
    game.state.add("Main", Main);
    game.state.start("Preload");
})();