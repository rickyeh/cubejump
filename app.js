(function() {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, "gameScreen", {});
    game.state.add("Preload", Preload);
    game.state.add("Title", Title);
    game.state.add("Main", Main);
    game.state.start("Preload");
})();