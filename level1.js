var Level1 = {
    // 'this' is bound to Main (see main.js)
    start: function () {
        // 0
        this.createFloor(0, 10);
        this.createSpike(2, 600, 2);
        this.createSpike(4, 600, 4);
        this.createSpike(6, 600, 6);
        this.createSpike(8, 600, 8);
        // 10
        //this.createFloor(10, 1);
        this.createFloor(11, 12);
        this.createBrick(12, 500, 4);
        this.createBrick(12.5, 500, 4);
        this.createBrick(15, 500, 8);
        this.createSpike(15, 600, 30);
        this.createBrick(16, 500, 8);
        this.createSpike(18.5, 600, 16);
        this.createBrick(18.75, 500, 3);
        this.createBrick(19.25, 500, 3);
        // 20
        this.createSpike(20.5, 600, 1);
        this.createSpike(21.1, 600, 2);
        this.createSpike(21.75, 600, 3);
        this.createSpike(22.5, 600, 4);
        this.createBrick(23.25, 500, 6);
        this.createBrick(24, 400, 6);
        this.createFloor(25, 3);
        this.createSpike(26, 600, 4);
        this.createSpike(27, 600, 4);
        this.createBrick(28.25, 500, 8);
        this.createBrick(29.25, 400, 6);
        this.createBrick(30, 300, 4);
        // 30
        this.createBrick(30.75, 200, 3);

        // END OF LEVEL
        this.createFloor(32, 3);
        this.placeFlag(32.5);
    }
};
