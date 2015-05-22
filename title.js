var Title = function(game){
    console.log('title state called');
};

Title.prototype = {
    create: function() {
        this.game.state.start('Main');
    }
};