/**
 * Creates and configures the water in the scene.
 * @param {Phaser.Scene} scene - The Phaser scene.
 * @returns {Phaser.Physics.Arcade.StaticGroup} The group of water.
 */
export function createWater3(scene) {
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
  water.create(965, 638, 'water')
  water.create(965, 574, 'water')
  water.create(965, 520, 'waterCurly')
  water.create(1029, 638, 'water')
  water.create(1029, 574, 'water')
  water.create(1029, 520, 'waterCurly')
  water.create(1093, 638, 'water')
  water.create(1093, 574, 'water')
  water.create(1093, 520, 'waterCurly')
  water.create(1157, 638, 'water')
  water.create(1157, 574, 'water')
  water.create(1157, 520, 'waterCurly')
  water.create(1221, 638, 'water')
  water.create(1221, 574, 'water')
  water.create(1221, 520, 'waterCurly')
  water.create(1285, 638, 'water')
  water.create(1285, 574, 'water')
  water.create(1285, 520, 'waterCurly')
  water.create(1349, 638, 'water')
  water.create(1349, 574, 'water')
  water.create(1349, 520, 'waterCurly')
  water.create(1413, 638, 'water')
  water.create(1413, 574, 'water')
  water.create(1413, 520, 'waterCurly')
  water.create(1477, 638, 'water')
  water.create(1477, 574, 'water')
  water.create(1477, 520, 'waterCurly')
  water.create(1541, 638, 'water')
  water.create(1541, 574, 'water')
  water.create(1541, 520, 'waterCurly')
  water.create(1605, 638, 'water')
  water.create(1605, 574, 'water')
  water.create(1605, 520, 'waterCurly')

  // W2
  water.create(2630, 638, 'water')
  water.create(2630, 584, 'waterCurly')
  water.create(2694, 638, 'water')
  water.create(2694, 584, 'waterCurly')
  water.create(2758, 638, 'water')
  water.create(2758, 584, 'waterCurly')

  // W3
  water.create(3832, 638, 'water')
  water.create(3832, 584, 'waterCurly')
  water.create(3896, 638, 'water')
  water.create(3896, 584, 'waterCurly')
  water.create(3960, 638, 'water')
  water.create(3960, 584, 'waterCurly')

  // w4
  water.create(5670, 638, 'water')
  water.create(5670, 584, 'waterCurly')
  water.create(5734, 638, 'water')
  water.create(5734, 584, 'waterCurly')
  water.create(5798, 638, 'water')
  water.create(5798, 584, 'waterCurly')

  return water
}
