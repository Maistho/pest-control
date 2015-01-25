var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update, render: render});

function preload() {
	game.load.image('player', 'player.png');
};

function create() {
	cursors = game.input.keyboard.createCursorKeys();
	walls = game.add.group();
	game.world.setBounds(0,0,2000,2000);

	game.physics.startSystem(Phaser.Physics.P2JS);

	player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');

	game.physics.p2.enable(player);

	game.camera.follow(player);


};

function update() {
	game.physics.arcade.collide(player, walls);

	player.body.velocity.x = 0;
	player.body.velocity.y = 0;


	if (cursors.left.isDown) {
		player.body.velocity.x = -150;
	} else if (cursors.right.isDown) {
		player.body.velocity.x = 150;
	}
	if (cursors.up.isDown) {
		player.body.velocity.y = -150;
	} else if ( cursors.down.isDown) {
		player.body.velocity.y = 150;
	}

};

function render() {

	game.debug.cameraInfo(game.camera, 32, 32);
	game.debug.spriteCoords(player, 32, 500);


};
