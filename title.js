var title = function(game){
    console.log('title state called');
}

title.prototype = {
    create: function() {
        this.game.state.start("Main");
    }
}