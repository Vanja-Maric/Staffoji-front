/**
 * Creates the clefs in the scene.
 * @param {Phaser.Scene} scene - The Phaser scene.
 * @param {string} selectedClef - The selected clef (treble, bas or C).
 * @returns {Phaser.Physics.Arcade.StaticGroup} The group of clefs.
 */
let clefs
export function createClefs2(scene, selectedClef) {
  clefs = scene.physics.add.staticGroup()
  createClef(
    30,
    440,
    {
      jumpDirection: 'right',
      noDirection: 'left',
    },
    selectedClef
  ).setVisible(false)
  createClef(716, 440, { jumpDirection: 'right' }, selectedClef) // On first platform
  createClef(1229, 284, { jumpDirection: 'right' }, selectedClef) // On first flying platform
  createClef(
    1774,
    440,
    { jumpDirection: 'right', noDirection: 'right' },
    selectedClef
  ) // On second platform
  createClef(
    2562,
    440,
    { jumpDirection: 'right', noDirection: 'left' },
    selectedClef
  ) // On second platform after stairs

  const tweenConfig = {
    targets: clefs.getChildren(),
    y: '+=10',
    duration: 2000,
    ease: 'Sine.easeInOut',
    yoyo: true,
    repeat: -1,
  }

  scene.tweens.add(tweenConfig)

  return clefs
}

function createClef(x, y, directionInfo, selectedClef) {
  const newClef = clefs.create(x, y, selectedClef).setScale(0.75).setDepth(2)
  if (directionInfo) newClef.directionInfo = directionInfo
  return newClef
}
