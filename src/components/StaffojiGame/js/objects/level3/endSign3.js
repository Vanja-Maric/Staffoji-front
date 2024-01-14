/**
 * Creates and configures the endSign in the scene.
 * @param {Phaser.Scene} scene - The Phaser scene.
 */
export function createEndSign3(scene) {
  return scene.physics.add.staticImage(6539, 519, 'sign1') //y =  Last platform - 55
}
