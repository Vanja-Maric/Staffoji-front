/**
 * Creates and configures the other objects in the scene.
 * @param {Phaser.Scene} scene - The Phaser scene.
 * @returns {Phaser.Physics.Arcade.StaticGroup} The group of other objects.
 */
export function createOtherObjects1(scene) {
  const otherObjects = scene.physics.add.staticGroup()

  otherObjects.create(60, 460, 'bush1')
  otherObjects.create(40, 454, 'sign2')
  otherObjects.create(450, 343, 'tree3') // y = platform y - 171
  // otherObjects.create(332, 333, 'tree2') // y = platform y - 182
  otherObjects.create(333, 459, 'bush3') // y = platform y - 55
  otherObjects.create(483, 459, 'bush3') // y = platform y - 55 ( + 8 / 9 if flying pl)
  otherObjects.create(408, 450, 'bush2') // y = platform y - 65

  // On second platform
  otherObjects.create(1050, 460, 'tree1')
  otherObjects.create(1010, 459, 'bush3')

  otherObjects.create(1455, 260, 'bush2')
  otherObjects.create(1444, 284, 'mushroom2').setScale(0.5) // y - 45
  otherObjects.create(1401, 267, 'bush3')

  otherObjects.create(2528, 406, 'tree3')

  return otherObjects
}
