var Level2 = {
    // 'this' is bound to Main (see main.js)
    start: function () {

        this.createFloor(0, 3);
        this.createSpike(2, 600, 3);
        this.createFloor(4);
        this.createSpike(4.4, 600, 3);
        this.createFloor(6);
        this.createBrick(7.5, 500, 4);
        this.createBrick(8.25,500, 4);
        this.createFloor(9, 6);
        this.createBrick(9.7, 375, 4, 4);
        this.createSpike(9.75, 600, 2);

        this.createBrick(10.45, 375, 4, 4);
        this.createSpike(10.5, 600, 2);
        this.createBrick(11.2, 375, 4, 4);
        this.createSpike(11.25, 600, 2);
        this.createSpike(12, 600, 2);
        this.createSpike(12.55, 600, 5);
        this.createSpike(13.35, 600, 2);
        this.createSpike(13.9, 600, 5);
        this.createFloor(14.5);
        this.createBrick(16, 500, 4);
        this.createBrick(16.75, 400, 4);
        this.createBrick(17.5, 300, 4);
        this.createBrick(18.25, 200, 4);
        this.createBrick(19, 100, 4);

        this.createBrick(20, 200, 4);
        this.createBrick(21, 300, 4);
        this.createBrick(22, 400, 4);
        this.createBrick(23, 500, 10);
        this.createSpike(23.25, 400, 2);
        this.createFloor(24, 3);
        this.createSpike(24.5, 600);
        this.createSpike(25, 600);
        this.createSpike(25.5, 600);
        this.createSpike(26, 600);
        this.createSpike(26.5, 600, 3);
        this.createBrick(27.5, 500, 4);
        this.createBrick(28.25, 400, 4);
        this.createBrick(29, 300, 4);
        
        this.createBrick(30, 400, 4);
        this.createBrick(31, 400, 4);
        this.createBrick(32, 400, 10);
        this.createSpike(32.3, 300, 2);
        this.createBrick(33.5, 500, 4);
        this.createBrick(34.25, 400, 3);
        this.createBrick(35, 350, 3);
        this.createBrick(35.75, 300, 2);
        this.createBrick(36.5, 250, 8);
        this.createBrick(38, 400, 2);
        this.createFloor(39, 5);
        
        this.placeFlag(40);

        // Coin Placement
        this.createCoin(1.92, 530, 1);
        this.createCoin(2.07, 490, 1);
        this.createCoin(2.22, 530, 1);
        this.createCoin(3.06, 640, 9);
        this.createCoin(4.33, 530, 1);
        this.createCoin(4.47, 490, 1);
        this.createCoin(4.61, 530, 1);
        this.createCoin(5.08, 640, 9);

        this.createCoin(7.81, 390, 1);
        this.createCoin(7.96, 340, 1);
        this.createCoin(8.11, 390, 1);

        this.createCoin(9.73, 510, 1);
        this.createCoin(9.83, 510, 1);
        this.createCoin(10.48, 510, 1);
        this.createCoin(10.58, 510, 1);
        this.createCoin(11.23, 510, 1);
        this.createCoin(11.33, 510, 1);

        this.createCoin(12.45, 510, 1);
        this.createCoin(12.56, 460, 1);
        this.createCoin(12.70, 410, 1);
        this.createCoin(12.84, 460, 1);
        this.createCoin(12.95, 510, 1);

        this.createCoin(13.80, 510, 1);
        this.createCoin(13.91, 460, 1);
        this.createCoin(14.05, 410, 1);
        this.createCoin(14.19, 460, 1);
        this.createCoin(14.30, 510, 1);

        this.createCoin(15.63, 500, 1);
        this.createCoin(15.83, 400, 1);
        this.createCoin(16.39, 375, 1);
        this.createCoin(16.59, 275, 1);
        this.createCoin(17.10, 300, 1);
        this.createCoin(17.30, 200, 1);
        this.createCoin(17.85, 200, 1);
        this.createCoin(18.05, 100, 1);
        this.createCoin(18.62, 120, 1);
        this.createCoin(18.82, 20, 1);

        this.createCoin(20.048, 100, 2);
        this.createCoin(21.045, 200, 2);
        this.createCoin(22.061, 300, 2);

        this.createCoin(23.282, 370, 1);

        this.createCoin(24.51, 500, 1);
        this.createCoin(25, 500, 1);
        this.createCoin(25.505, 500, 1);
        this.createCoin(25.997, 500, 1);
        this.createCoin(26.565, 500, 1);

        this.createCoin(27.1, 430, 3);
        this.createCoin(27.81, 300, 3);
        this.createCoin(28.58, 200, 3);
        this.createCoin(29.46, 130, 3);
        this.createCoin(30.5, 250, 3);
        this.createCoin(31.45, 250, 3);
        this.createCoin(32.9, 240, 3);
        this.createCoin(33.82, 310, 3);
        this.createCoin(34.55, 220, 3);
        this.createCoin(35.30, 180, 3);
        this.createCoin(36.04, 110, 3);
        this.createCoin(37.5, 250, 1);
    }
};
