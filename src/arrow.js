define([
	'require',
	'game'
], function(require, game) {

	function Arrow(x, y) {
		this.game = require('game');
		console.log(this.game);
		this.sprite = this.game.add.sprite(x, y, 'arrow');

	}
/*
	var self = this;
	self.game = Game;
	var arrow = Game.add.sprite(
	arrow.anchor.set(0.5);

	// enable physics for arrow
	game.physics.arcade.enable(arrow);

	arrow.body.allowRotation = true;

	arrow.body.rotation = game.physics.arcade.angleToPointer(arrow, game.input.activePointer) + 0.5*Math.PI;
	arrow.body.velocity.set(10,10);

	self.sprite = self.game.add.sprite(player.x+50, player.y+50, 'arrow');
	*/

  Arrow.prototype = {

  };

  return Arrow;
});
