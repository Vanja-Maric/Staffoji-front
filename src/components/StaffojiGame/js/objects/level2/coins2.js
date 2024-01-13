/**
 * Creates and configures the coins in the scene.
 * @param {Phaser.Scene} scene - The Phaser scene.
 * @returns {Phaser.Physics.Arcade.StaticGroup} The group of coins.
 */
export function createCoins2(scene) {
  // Check if the animation with the key "coinanim" already exists
  if (!scene.anims.exists('coinanim')) {
    scene.anims.create({
      key: 'coinanim',
      frames: scene.anims.generateFrameNumbers('coin', {
        start: 0,
        end: 5,
      }),
      frameRate: 6,
      repeat: -1,
      repeatDelay: 3000,
    })
  }

  const coins = scene.physics.add.staticGroup()

  // Create coins at specific positions
  createCoin(coins, 1050, 296)
  createCoin(coins, 1100, 296)
  createCoin(coins, 1150, 296)
  createCoin(coins, 1350, 150)

  // Stairs
  createCoin(coins, 1930, 260)
  createCoin(coins, 2120, 324)
  createCoin(coins, 2310, 388)
  createCoin(coins, 2500, 452)

  // Rotate animation
  scene.tweens.add({
    targets: coins.getChildren(),
    angle: -10,
    duration: 1000,
    yoyo: true,
    repeat: -1,
  })

  // Animation for moving coins
  scene.tweens.add({
    targets: coins.getChildren(),
    y: '+=1',
    x: '+=1',
    duration: 2000,
    ease: 'Sine.easeInOut',
    yoyo: true,
    repeat: -1,
  })

  return coins
}

// Helper function to create a coin with animation
function createCoin(coins, x, y) {
  const coin = coins.create(x, y).setScale(0.8)
  coin.anims.play('coinanim', true)
}
