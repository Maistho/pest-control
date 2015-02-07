(function () {
	'use strict';
	var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update, render: render});


	var movespeed = 250;

	var player,
	map,
	walls,
	layer1,
	cursors
	;


	function preload() {
		game.load.image('player', 'player.png');
		game.load.image('ground', 'ground_1x1.png');
	};

	function create() {

		game.stage.backgroundColor = "#3d3d3d";

		//create blank map
		map = game.add.tilemap();

		//Add an image to the map
		map.addTilesetImage('ground')


		layer1 = map.create('level1', 30, 30, 32, 32);

		layer1.resizeWorld();
		cursors = game.input.keyboard.createCursorKeys();

		map.fill(0, 0, 0, map.width, map.height, layer1);
		map.fill(-1, Math.floor(map.width/4), Math.floor(map.height/4), Math.floor(map.width/4*3), Math.floor(map.height/4*3), layer1);
		map.setCollisionBetween(0,1,true,layer1);

		walls = game.add.group();

		player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');

		// Set sprite "position" to the middle of the sprite
		player.anchor.set(0.5);

		// enable physics for player
		game.physics.arcade.enable(player);

		player.body.collideWorldBounds = true;

		player.body.allowRotation = true;



		// Camera follows player
		game.camera.follow(player,Phaser.Camera.FOLLOW_LOCKON);



		// Set custom player body size
		//player.body.setSize(110,90,15,10);


	};

	function update() {
		game.physics.arcade.collide(player, walls);
		game.physics.arcade.collide(player, layer1);

		player.body.velocity.x = 0;
		player.body.velocity.y = 0;


		//Movement
		if (cursors.left.isDown) {
			player.body.velocity.x = -movespeed;
		} else if (cursors.right.isDown) {
			player.body.velocity.x = movespeed;
		}
		if (cursors.up.isDown) {
			player.body.velocity.y = -movespeed;
		} else if ( cursors.down.isDown) {
			player.body.velocity.y = movespeed;
		}

	};

	function render() {

		game.debug.cameraInfo(game.camera, 32, 32);
		game.debug.spriteCoords(player, 32, 500);
		game.debug.body(player);


	};
})();
