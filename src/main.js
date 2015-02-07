(function () {
	'use strict';

	requirejs.config({
		baseUrl: 'src/',

		paths: {
			phaser: 'libs/phaser/build/phaser.min'
		},
		shim: {
			'phaser': {
				exports: 'Phaser'
			}
		}
	});

	require(['phaser', 'game', 'arrow'], function(Phaser, Game, Arrow) {
		var game = new Game();
		var arrow = new Arrow(game);
		game.start();
	});
}());
