/**
 * Creates and configures the fire in the scene.
 * @param {Phaser.Scene} scene - The Phaser scene.
 * @returns {Phaser.Physics.Arcade.StaticGroup} The group of fire.
 */
export function createFire3(scene) {
  const fireGroup = scene.physics.add.staticGroup()

  const fireAnimationKey = 'fireanim'

  // Check if the animation with the key "fireanim" already exists
  if (!scene.anims.exists(fireAnimationKey)) {
    createFireAnimation(scene, fireAnimationKey)
  }

  // Create fires on the 4th platform
  createFireInstance(fireGroup, 4438, 493)
  createFireInstance(fireGroup, 4498, 493)

  return fireGroup
}

/**
 * Creates the fire animation if it doesn't exist.
 * @param {Phaser.Scene} scene - The Phaser scene.
 * @param {string} key - The animation key.
 */
function createFireAnimation(scene, key) {
  scene.anims.create({
    key,
    frames: scene.anims.generateFrameNumbers('campFire', { start: 0, end: 59 }),
    frameRate: 10,
    repeat: -1,
  })
}

/**
 * Creates a fire instance at the specified position with scaling.
 * @param {Phaser.Physics.Arcade.StaticGroup} fireGroup - The fire group.
 * @param {number} x - The x-coordinate.
 * @param {number} y - The y-coordinate.
 */
function createFireInstance(fireGroup, x, y) {
  const fire = fireGroup.create(x, y).setScale(2)
  fire.anims.play('fireanim', true)
}
