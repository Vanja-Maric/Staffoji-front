/**
 * Creates and configures the coins in the scene.
 * @param {Phaser.Scene} scene - The Phaser scene.
 * @returns {Phaser.Physics.Arcade.StaticGroup} The group of coins.
 */
export function createCoins1(scene) {
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
  createCoin(coins, 837, 296) // Platform y - 62 ( + 8 / 9 if flying pl)

  createCoin(coins, 1814, 160)
  createCoin(coins, 1864, 190)
  createCoin(coins, 1902, 232)
  createCoin(coins, 1921, 283)

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
