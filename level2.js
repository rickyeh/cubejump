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
        this.createBrick(9.7, 470, 4);
        this.createBrick(9.7, 440, 4);
        this.createBrick(9.7, 410, 4);
        this.createBrick(9.7, 380, 4);
        this.createSpike(9.75, 600, 2);

        this.createBrick(10.45, 470, 4);
        this.createBrick(10.45, 440, 4);
        this.createBrick(10.45, 410, 4);
        this.createBrick(10.45, 380, 4);
        this.createSpike(10.5, 600, 2);
        this.createBrick(11.2, 470, 4);
        this.createBrick(11.2, 440, 4);
        this.createBrick(11.2, 410, 4);
        this.createBrick(11.2, 380, 4);
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
    }
};
