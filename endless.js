var EndlessLevel = {
    // 'this' is bound to Main (see main.js)
    start: function () {
        this.createFloor(0,3);
        game.world.setBounds(0, 0, 100000, 750);

        // Creates the floor with gaps every three platforms.
        for (var i = 0; i < 200; i += 4) {
            this.createFloor(i, 3);
        }

        // Creates random platforms
        this.createBrick(2, 500, 4);
        for (i = 3; i < 200; i++) {
            this.createBrick(i, game.rnd.integerInRange(275, 500), game.rnd.integerInRange(2,6));
        }

        for (i = 2; i< 200; i++) {
            this.createSpike(i+ Math.random(), 550, game.rnd.integerInRange(2,4));
        }
    }
};
