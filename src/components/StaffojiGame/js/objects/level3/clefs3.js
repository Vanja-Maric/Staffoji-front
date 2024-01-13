/**
 * Creates the clefs in the scene.
 * @param {Phaser.Scene} scene - The Phaser scene.
 * @param {string} selectedClef - The selected clef (treble, bas or C).
 * @returns {Phaser.Physics.Arcade.StaticGroup} The group of clefs.
 */
let clefs
export function createClefs3(scene, selectedClef) {
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
  createClef(1243, 284, { jumpDirection: 'right' }, selectedClef) // On first flying platform
  createClef(
    1798,
    440,
    { jumpDirection: 'right', noDirection: 'right' },
    selectedClef
  ) // On second platform
  createClef(
    2576,
    440,
    { jumpDirection: 'right', noDirection: 'left' },
    selectedClef
  ) // On second platform after stairs
  createClef(
    2944,
    302,
    { jumpDirection: 'left', noDirection: 'left' },
    selectedClef
  ) // On second flying platform
  createClef(3262, 502, { jumpDirection: 'left' }, selectedClef) // On third platform
  createClef(3772, 502, { jumpDirection: 'right' }, selectedClef) // On third platform
  createClef(4274, 502, { jumpDirection: 'right' }, selectedClef) // On fourth platform
  createClef(4978, 502, { jumpDirection: 'right' }, selectedClef) // On fourth platform
  createClef(5616, 502, { jumpDirection: 'right' }, selectedClef) // On fourth platform - end
  createClef(6193, 308, { jumpDirection: 'right' }, selectedClef) // On fourth platform - end

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
