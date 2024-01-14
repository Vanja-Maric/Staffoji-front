/**
 * Creates and configures the water in the scene.
 * @param {Phaser.Scene} scene - The Phaser scene.
 * @returns {Phaser.Physics.Arcade.StaticGroup} The group of water.
 */
export function createWater2(scene) {
  const water = scene.physics.add.staticGroup()

  // W1
  water.create(2616, 638, 'water')
  water.create(2616, 584, 'waterCurly')
  water.create(2680, 638, 'water')
  water.create(2680, 584, 'waterCurly')
  water.create(2744, 638, 'water')
  water.create(2744, 584, 'waterCurly')

  return water
}
