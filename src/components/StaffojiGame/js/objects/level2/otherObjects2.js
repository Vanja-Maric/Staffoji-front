/**
 * Creates and configures the other objects in the scene.
 * @param {Phaser.Scene} scene - The Phaser scene.
 * @returns {Phaser.Physics.Arcade.StaticGroup} The group of other objects.
 */
export function createOtherObjects2(scene) {
  const otherObjects = scene.physics.add.staticGroup()

  otherObjects.create(60, 460, 'bush1')
  otherObjects.create(40, 454, 'sign2')
  otherObjects.create(450, 343, 'tree3') // y = platform y - 171
  // otherObjects.create(332, 333, 'tree2') // y = platform y - 182
  otherObjects.create(333, 459, 'bush3') // y = platform y - 55
  otherObjects.create(483, 459, 'bush3') // y = platform y - 55 ( + 8 / 9 if flying pl)
  otherObjects.create(408, 450, 'bush2') // y = platform y - 65

  // On second platform
  otherObjects.create(1555, 449, 'bush2')
  otherObjects.create(1544, 473, 'mushroom2').setScale(0.5) // y - 45
  otherObjects.create(1501, 459, 'bush3')

  // On 1stvflying platform
  otherObjects.create(950, 308, 'tree1')
  otherObjects.create(910, 308, 'bush3')

  // On 3rd platform
  otherObjects.create(2960, 519, 'tree1') // y - 55
  otherObjects.create(2940, 519, 'bush3')
  otherObjects.create(3006, 519, 'bush4')

  otherObjects.create(3517, 527, 'mushroom2').setScale(0.5).setAngle(-10) // y - 45
  otherObjects.create(3549, 404, 'tree3')
  otherObjects.create(3596, 519, 'bush4')

  return otherObjects
}
