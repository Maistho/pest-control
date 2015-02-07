define([
], function() {
	'use strict';

	function Player(game) {
		this.game = game;
		console.log('MAKING PLAYER');
	}

	Player.prototype = {
		constructor: Player

	};

	return Player;
});
