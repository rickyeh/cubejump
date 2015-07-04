var Level1 = {
    // 'this' is bound to Main (see main.js)
    start: function () {
        // 0
        this.createFloor(0, 10);
        this.createSpike(2, 606, 2);
        this.createSpike(4, 606, 4);
        this.createSpike(6, 606, 6);
        this.createSpike(8.03, 606, 8);
        // 10
        //this.createFloor(10, 1);
        this.createFloor(11, 12);
        this.createBrick(12, 500, 4);
        this.createBrick(12.5, 500, 4);
        this.createBrick(15, 500, 8);
        this.createSpike(15, 606, 30);
        this.createBrick(16, 500, 8);
        this.createSpike(18.5, 606, 16);
        this.createBrick(18.75, 500, 3);
        this.createBrick(19.25, 500, 3);
        // 20
        this.createSpike(20.5, 606, 1);
        this.createSpike(21.1, 606, 2);
        this.createSpike(21.75, 606, 3);
        this.createSpike(22.5, 606, 4);
        this.createBrick(23.25, 500, 6);
        this.createBrick(24, 400, 6);
        this.createFloor(25, 3);
        this.createSpike(26, 606, 4);
        this.createSpike(27, 606, 4);
        this.createBrick(28.25, 500, 8);
        this.createBrick(29.25, 400, 6);
        this.createBrick(30, 300, 4);
        // 30
        this.createBrick(30.75, 200, 3);

        // END OF LEVEL
        this.createFloor(32, 3);
        this.placeFlag(32.5);

        // Coins
        this.createCoin(2.03, 500, 1);
        this.createCoin(4.06, 400, 2);

        this.createCoin(6.03, 480, 2);
        this.createCoin(6.18, 400, 2);

        this.createCoin(8.00, 500, 1);
        this.createCoin(8.125, 430, 1);
        this.createCoin(8.25, 400, 1);
        this.createCoin(8.385, 430, 1);
        this.createCoin(8.50, 500, 1);

        this.createCoin(10.10, 640, 1);
        this.createCoin(10.6, 640, 1);
        this.createCoin(12.35, 375, 1);
        this.createCoin(15.6, 400, 1);
        this.createCoin(15.84, 400, 1);
        this.createCoin(19.07, 375, 1);
        this.createCoin(20.505, 500, 1);
        this.createCoin(21.13, 500, 1);
        this.createCoin(21.81, 500, 1);
        this.createCoin(22.85, 605, 1);
        this.createCoin(24.6, 240, 1);
        this.createCoin(25.0, 240, 1);
        this.createCoin(26.34, 605, 6);
        this.createCoin(28.87, 370, 1);
        this.createCoin(29.10, 270, 1);

        this.createCoin(29.7, 270, 1);
        this.createCoin(29.84, 200, 1);
        this.createCoin(30.37, 170, 1);
        this.createCoin(30.54, 100, 1);

        this.createCoin(32.01, 605, 5);
    }
};
