/**
 * Creates and configures the endSign in the scene.
 * @param {Phaser.Scene} scene - The Phaser scene.
 */
export function createEndSign2(scene) {
  return scene.physics.add.staticImage(3120, 519, 'sign1') // y = last platform - 55
}
