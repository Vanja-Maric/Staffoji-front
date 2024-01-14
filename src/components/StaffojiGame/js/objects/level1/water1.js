/**
 * Creates and configures the water in the scene.
 * @param {Phaser.Scene} scene - The Phaser scene.
 * @returns {Phaser.Physics.Arcade.StaticGroup} The group of water.
 */
export function createWater1(scene) {
  const water = scene.physics.add.staticGroup()

  // W1
  water.create(773, 638, 'water')
  water.create(773, 574, 'water')
  water.create(773, 520, 'waterCurly')
  water.create(837, 638, 'water')
  water.create(837, 574, 'water')
  water.create(837, 520, 'waterCurly')
  water.create(901, 638, 'water')
  water.create(901, 574, 'water')
  water.create(901, 520, 'waterCurly')

  return water
}
