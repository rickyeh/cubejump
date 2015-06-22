var Level1 = {
    
    // 'this' is bound to Main (see main.js)
    start: function() {

        // 0
        this.createFloor(0, 10);
        this.createSpike(2, 600, 2);
        this.createSpike(4, 600, 4);
        this.createSpike(6, 600, 6);
        this.createSpike(8, 600, 8);

        // 10
        //this.createFloor(10, 1);
        this.createFloor(11, 12);
        this.createBrick(11.5, 500, 2);
        this.createBrick(12.5, 500, 4);
        this.createBrick(15, 500, 8);
        this.createSpike(15, 600, 30);
        this.createBrick(16, 500, 6);
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
        this.createFloor(32, 3); // Close one
        this.createSpike(33, 600, 2);
        this.createSpike(33.5, 600, 5);
        this.createSpike(34.25, 600, 2);
        this.createSpike(34.75, 600, 5);
        this.createFloor(35);
        this.createBrick(36, 500, 4);
        this.createBrick(36.75, 400, 4);
        this.createBrick(37.5, 300, 4);
        this.createBrick(38.25, 200, 4);
        this.createBrick(39, 100, 4);

        // 40
        this.createBrick(40, 200, 4);
        this.createBrick(41, 300, 4);
        this.createBrick(42, 400, 4);
        this.createBrick(43, 500, 10);
        this.createSpike(43.25, 400, 2);
        this.createFloor(44, 3);
        this.createSpike(44.5, 600);
        this.createSpike(45, 600);
        this.createSpike(45.5, 600);
        this.createSpike(46, 600);
        this.createSpike(46.5, 600, 3);

        this.createBrick(47.5, 500, 4);
        this.createBrick(48.25, 400, 4);
        this.createBrick(49, 300, 4);

        // 50
        this.createBrick(50, 400, 4);
        this.createBrick(51, 400, 4);
        this.createBrick(52, 400, 10);
        this.createSpike(52.3, 300, 2);
        this.createBrick(53.5, 500, 4);
        this.createBrick(54.25, 400, 3);
        this.createBrick(55, 350, 3);
        this.createBrick(55.75, 300, 2);
        this.createBrick(56.5, 250, 8);
        this.createBrick(58, 400, 2);
        this.createFloor(59, 5);

        // 60
        this.placeFlag(60, 200);
    }
};