define([
	'phaser',
	'arrow'
], function(Phaser, Arrow) {
	'use strict';

	var Game = (function() {
		function Game() {
			console.log('MAKING GAME');
		}

			Game.prototype = {
				constructor: Game,

				start: function() {
					this.game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
						preload: this.preload,
						create: this.create,
						update: this.update,
						render: this.render
					});
				},

				preload: function() {
					this.game.load.image('player', 'assets/player.png');
					this.game.load.image('ground', 'assets/ground_1x1.png');
					this.game.load.image('arrow', 'assets/arrow.png');
				},

				create: function() {
					this.movespeed = 250;

					this.game.stage.backgroundColor = "#3d3d3d";

					//create blank map
					this.map = this.game.add.tilemap();

					//Add an image to the map
					this.map.addTilesetImage('ground');


					this.layer1 = this.map.create('level1', 30, 30, 32, 32);

					this.layer1.resizeWorld();
					this.cursors = this.game.input.keyboard.createCursorKeys();

					this.map.fill(0, 0, 0, this.map.width, this.map.height, this.layer1);
					this.map.fill(-1, Math.floor(this.map.width/4), Math.floor(this.map.height/4), Math.floor(this.map.width/4*3), Math.floor(this.map.height/4*3), this.layer1);
					this.map.setCollisionBetween(0,1,true,this.layer1);

					this.walls = this.game.add.group();

					this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');

					// Set sprite "position" to the middle of the sprite
					this.player.anchor.set(0.5);

					// enable physics for player
					this.game.physics.arcade.enable(this.player);

					this.player.body.collideWorldBounds = true;

					this.player.body.allowRotation = true;



					// Camera follows player
					this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);



					// Set custom player body size
					//player.body.setSize(110,90,15,10);

				},
				update: function() {
					this.game.physics.arcade.collide(this.player, this.walls);
					this.game.physics.arcade.collide(this.player, this.layer1);

					this.player.body.velocity.x = 0;
					this.player.body.velocity.y = 0;


					//Movement
					if (this.cursors.left.isDown) {
						this.player.body.velocity.x = -this.movespeed;
					} else if (this.cursors.right.isDown) {
						this.player.body.velocity.x = this.movespeed;
					}
					if (this.cursors.up.isDown) {
						this.player.body.velocity.y = -this.movespeed;
					} else if ( this.cursors.down.isDown) {
						this.player.body.velocity.y = this.movespeed;
					}

					var that = this;
					this.game.input.mouse.mouseDownCallback = function(e) {
						console.log(that);
						var arrow = new Arrow(that.player.x, that.player.y);
						arrow.anchor.set(0.5);

						// enable physics for arrow
						this.game.physics.arcade.enable(arrow);

						arrow.body.allowRotation = true;

						arrow.body.rotation = this.game.physics.arcade.angleToPointer(arrow, this.game.input.activePointer) + 0.5*Math.PI;
						arrow.body.velocity.set(10,10);
					};

				},
				render: function () {

					this.game.debug.cameraInfo(this.game.camera, 32, 32);
					this.game.debug.spriteCoords(this.player, 32, 500);
					//this.game.debug.body(player);

					this.player.rotation = this.game.physics.arcade.angleToPointer(this.player, this.game.input.activePointer) + 0.5 * Math.PI;

				}

			};

			return Game;
	})();

	return Game;
});
