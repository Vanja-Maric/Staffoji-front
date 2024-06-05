import Phaser from 'phaser'
import Character from './Character'
import LevelConfigurations from './objects/LevelConfigurations'

import eventEmitter from './eventEmitter'
import { createNoteImages } from './functions/createNoteImages'

/**
 * Play scene where the game is played.
 */
class Play extends Phaser.Scene {
  /**
   * Constructs the Play scene.
   */
  constructor() {
    super({ key: 'Play' })
  }

  /**
   * Creates the Play scene.
   */
  create() {
    this.selectedClef = this.registry.get('selectedClef')
    this.level = this.registry.get('level')
    this.particleEmitters = []
    this.noteImages = []
    this.musicNotStarted = true
    this.score = 0
    this.lastVisitedClef = null
    this.audio = this.registry.get('audio')
    this.instrument = this.registry.get('instrument')
    this.cameras.main.setBounds(0, 0, 7238, 670)
    this.restartButton = null
    this.menuButton = null
    this.returningToSameClefCharacterDied = false

    // Music
    this.music = this.sound.add('bgMusic', { volume: 0.2, loop: true })
    this.coinSound = this.sound.add('coinSound', { volume: 0.8 })
    // this.deathSound = this.sound.add('deathSound', { volume: 0.1 })

    // logo
    let logoSerz = this.add
      .image(1050, 647, 'serzLogo')
      .setDepth(10)
      .setScale(0.4)
    logoSerz.resolution = 2
    // Backgrund
    this.createBackgroundImages()

    // Get objects for the right level
    this.levelConfig = LevelConfigurations.getConfig(this.level)

    this.water = this.levelConfig.createWater(this)
    this.water.setDepth(2)

    // Other objects
    this.otherObjects = this.levelConfig.createOtherObjects(this)

    // Platforms
    this.platforms = this.levelConfig.createPlatforms(this)

    this.platforms.setDepth(2)

    // Character
    this.createCharacter()

    this.cameras.main.startFollow(this.character, false, 1, 0)

    // World bounds
    this.worldBounds()

    // Text
    this.createTexts()

    // Menu button
    this.createMenuButton()

    // Notes
    this.noteImages = createNoteImages(this.instrument)

    // console.log('note images', this.noteImages)

    // Coins
    this.coins = this.levelConfig.createCoins(this)

    // Clefs
    this.clefs = this.levelConfig.createClefs(this, this.selectedClef)
    // console.log('selected clef', this.selectedClef)
    this.clefs.getChildren().forEach(function (clef) {
      // Shining
      this.createEmitterForClef(clef)
    }, this)

    // Fire
    this.fire = this.levelConfig.createFire(this)

    // End sign
    this.endSign = this.levelConfig.createEndSign(this)

    // Start idle animation
    this.character.anims.play('idle')

    // Overlaps
    this.setUpOverlaps()

    // Colliders
    this.setUpColliders()

    // Listener
    this.setUpListener()
  }

  createBackgroundImages() {
    const positions = [500, 1500, 2500, 3500, 4500, 5500, 6500, 7500]
    positions.forEach((x) => this.add.image(x, 335, 'background'))
  }

  createCharacter() {
    this.character = new Character(
      {
        scene: this,
        x: 100, // Start 100
        y: 426,
        audio: this.audio,
      },
      eventEmitter
    )
    this.character.body.setCollideWorldBounds(true)
  }

  createTexts() {
    this.scoreText = this.addText(16, 16, 'Scores: 0', '32px')
    this.scoreText.setScrollFactor(0)

    this.livesText = this.addText(
      900,
      16,
      `Lives: ${this.character.lives}`,
      '32px'
    )
    this.livesText.setScrollFactor(0)

    this.startText = this.addText(214, 100, `Play any tone to start!`, '64px')
  }

  addText(x, y, text, fontSize) {
    return this.add.text(x, y, text, {
      fontSize: fontSize,
      fill: '#000',
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      resolution: 2.3,
    })
  }

  createMenuButton() {
    this.menuButton = this.addButton(25, 645, 'menuButton')
      .setScrollFactor(0)
      .setScale(0.5)
      .setDepth(10)
    this.menuButton.on('pointerdown', () => {
      this.handleMenuButton()
      this.scene.stop('Play')
    })
    this.menuButton.on(
      'pointerover',
      () => (this.game.canvas.style.cursor = 'pointer')
    )
    this.menuButton.on(
      'pointerout',
      () => (this.game.canvas.style.cursor = 'default')
    )
  }

  createEmitterForClef(clef) {
    const emitter = this.add.particles(0, 0, 'flare', {
      speed: 2,
      livespan: 1500,
      quantity: 1,
      scale: { start: 0.4, end: 0 },
      emitting: true,
      emitZone: { type: 'random', source: clef.getBounds() },
      duration: null,
    })
    emitter.start()
    if (!clef.visible) {
      emitter.setVisible(false)
    }
    this.particleEmitters.push(emitter)
  }

  /**
   * Sets the world bounds. The right boundary is the same as the camera bounds.
   * This is done to prevent the character from moving outside the camera.
   * The left boundary is the same as the default world bounds.
   * The bottom and top boundaries are the same as the default world bounds.
   */
  worldBounds() {
    const worldBounds = this.physics.world.bounds
    const rightBound = 7238 // Same as camera bounds
    this.physics.world.setBounds(
      worldBounds.x, // Left boundary (default)
      worldBounds.y, // Top boundary (default)
      rightBound, // Right boundary
      worldBounds.height // Bottom boundary (default)
    )
  }

  /**
   * Sets up the overlaps between the character and other objects.
   */
  setUpOverlaps() {
    this.physics.add.overlap(
      this.character,
      this.clefs,
      this.handleClefInteraction,
      null,
      this
    )

    this.physics.add.overlap(
      this.character,
      this.water,
      this.characterDied,
      null,
      this
    )

    this.physics.add.overlap(
      this.character,
      this.coins,
      this.collectCoin,
      null,
      this
    )

    this.physics.add.overlap(
      this.character,
      this.fire,
      this.characterBurnedInFire,
      null,
      this
    )

    this.physics.add.overlap(
      this.character,
      this.endSign,
      this.characterWin,
      null,
      this
    )
  }

  /**
   * Sets up the colliders between the character and other objects.
   */
  setUpColliders() {
    this.physics.add.collider(this.character, this.platforms)
  }

  setUpListener() {
    eventEmitter.on('wrongTone', this.dropTheStone, this)
    eventEmitter.once('shutdown', this.shutDownListener, this)
  }

  /**
   * Updates the Play scene on every frame.
   */
  update() {
    this.character.update()
    if (this.character.readyForMusic && this.musicNotStarted) {
      this.music.play()
      this.startText.destroy() // When music starts for the first time, destroy the text
      this.musicNotStarted = false
    }
  }

  // HELP FUNCTIONS /--------------------------------/

  /**
   * Shows and hides the notes for a specific clef.
   * @param {Phaser.GameObjects.GameObject} character - The character object.
   * @param {Phaser.GameObjects.GameObject} clef - The clef object.
   */
  handleClefInteraction(character, clef) {
    if (this.lastVisitedClef === clef) {
      // // Do this so the character do not activate clef that it just left walking towards left
      if (!this.returningToSameClefCharacterDied) {
        // console.log('NEEEEEEEEEEEEEEEE')
        return
      }
    }
    if (!this.character.isDead) {
      this.stopMusicAndHideClef(clef)
      // console.log('hiding the clef')

      // Show the note directions, note images, and play the music again after 1.5 seconds
      this.showDirections(
        clef.directionInfo.jumpDirection,
        clef.directionInfo.noDirection
      )

      const associatedEmitter = this.findAssociatedEmitter(clef)
      this.removeAssociatedEmitterWhenCharacterTouchesClef(associatedEmitter)
      this.returningToSameClefCharacterDied = false // Do this so the character do not activate clef that it just left walking towards left
      this.time.delayedCall(
        1500,
        () => this.showClefAgain(character, clef, associatedEmitter),
        [],
        this
      )
    }
  }

  /**
   * Stops the music and hides the clef after the character after the character has died.
   */
  stopMusicAndHideClef(clef) {
    this.fadeOutMusic()
    this.lastVisitedClef = clef
    clef.disableBody(true, true)
  }

  /**
   * Fades out the background music.
   */
  fadeOutMusic() {
    this.tweens.add({
      targets: this.music,
      volume: 0.0001,
      duration: 1000,
      onComplete: function () {
        this.music.pause()
      },
      callbackScope: this,
    })
  }

  /**
   * Shows the note directions for a specific clef.
   * @param {string} jumpDirection - The jump direction.
   * @param {string} noDirection - The no direction.
   */
  showDirections(jumpDirection, noDirection) {
    this.time.delayedCall(
      300,
      () => {
        this.stopCharacter()
        this.setRandomNotes(jumpDirection, noDirection)
        this.createArrows(jumpDirection, noDirection)
      },
      [],
      this
    )
  }

  /**
   * Stops the character.
   */
  stopCharacter() {
    this.character.madeFirstMove = true
    this.character.detectedTone = null
    this.character.body.setVelocityX(0)
    this.character.anims.play('idle')
    this.character.stopJump = false
  }

  /**
   * Finds the associated particle emitter for a clef.
   * @param {Phaser.GameObjects.GameObject} clef - The clef object.
   * @returns {Phaser.GameObjects.Particles.ParticleEmitter|null} The associated particle emitter, or null if not found.
   */
  findAssociatedEmitter(clef) {
    return this.particleEmitters.find(
      (emm) =>
        emm.emitting &&
        Phaser.Geom.Intersects.RectangleToRectangle(
          emm.emitZones[0].source,
          clef.getBounds()
        )
    )
  }

  removeAssociatedEmitterWhenCharacterTouchesClef(associatedEmitter) {
    if (associatedEmitter) {
      associatedEmitter.stop()
    }
  }

  showClefAgain(character, clef, associatedEmitter) {
    const isOverlapping = this.checkOverlap(character, clef)
    if (!isOverlapping) {
      if (!this.music.isPlaying) {
        this.fadeInMusic()
      }
      this.removeDirections()
      clef.enableBody(true, clef.x, clef.y, true, true)
      // console.log('showing the clef')
      this.returnAssociatedEmitter(associatedEmitter)
    } else {
      // console.log('still overlapping. cannot show the clef')
      this.time.delayedCall(
        300,
        () => this.showClefAgain(character, clef),
        [],
        this
      )
    }
  }

  /**
   * Checks if the character overlaps with a clef.
   * @param {Phaser.GameObjects.GameObject} character - The character object.
   * @param {Phaser.GameObjects.GameObject} clef - The clef object.
   * @returns {boolean} True if there is an overlap, false otherwise.
   */
  checkOverlap(character, clef) {
    const characterBounds = character.getBounds()
    const clefBounds = clef.getBounds()
    return Phaser.Geom.Intersects.RectangleToRectangle(
      characterBounds,
      clefBounds
    )
  }

  /**
   * Fades in the background music.
   */
  fadeInMusic() {
    this.music.resume()
    this.tweens.add({
      targets: this.music,
      volume: 0.2,
      duration: 1000,
      callbackScope: this,
    })
  }
  /**
   * Removes the note directions.
   */
  removeDirections() {
    this.notes.clear(true, true)
    this.arrow.clear(true, true)
  }

  returnAssociatedEmitter(associatedEmitter) {
    if (associatedEmitter) {
      associatedEmitter.start()
    }
  }

  // -------------------Create notes for directions------------------- //
  /**
   * Sets random notes for the next move.
   * @param {string} jumpDirection - The jump direction.
   * @param {string} noDirection - The no direction.
   */
  setRandomNotes(jumpDirection, noDirection) {
    const numberOfNoteImages = this.numberOfNoteImages()
    const [randomNumber1, randomNumber2, randomNumber3] =
      this.generateRandomNumbersForNoteImages(numberOfNoteImages)

    this.notes = this.physics.add.staticGroup()
    this.addNoteImages(noDirection, randomNumber1, randomNumber2, randomNumber3)

    let rightNote = this.noteImages[randomNumber1].name
    if (noDirection === 'right') {
      rightNote = null
    }

    let leftNote = this.noteImages[randomNumber2].name
    if (noDirection === 'left') {
      leftNote = null
    }

    let upNote = this.noteImages[randomNumber3].name
    if (noDirection === 'up') {
      upNote = null
    }

    this.character.setTonesForDetection(
      leftNote,
      rightNote,
      upNote,
      jumpDirection
    )
  }

  /**
   * Returns the number of note images for the selected clef.
   */
  numberOfNoteImages() {
    let numberOfNoteImages = 0
    switch (this.instrument) {
      case 'violin':
        numberOfNoteImages = 17
        break
      case 'viola':
        numberOfNoteImages = 17
        break
      case 'cello':
        numberOfNoteImages = 16
        break
      case 'bassInstrument':
        numberOfNoteImages = 12
        break
      case 'piano':
        numberOfNoteImages = 22
        break
      case 'guitar':
        numberOfNoteImages = 25
        break
      case 'flute':
        numberOfNoteImages = 16
        break
      case 'blockFl':
        numberOfNoteImages = 16
        break
      default:
        numberOfNoteImages = 12
    }
    return numberOfNoteImages
  }

  /**
   * Creates random numbers for the note images.
   * @param {integer} numberOfNoteImages - The number of note images.
   * @returns {integer[]} The random numbers.
   */
  generateRandomNumbersForNoteImages(numberOfNoteImages) {
    // console.log('number of note images', numberOfNoteImages)
    const randomNumber1 = Math.floor(Math.random() * numberOfNoteImages)
    let randomNumber2 = Math.floor(Math.random() * numberOfNoteImages)
    let randomNumber3 = Math.floor(Math.random() * numberOfNoteImages)

    while (randomNumber2 === randomNumber1) {
      randomNumber2 = Math.floor(Math.random() * numberOfNoteImages)
    }

    while (randomNumber3 === randomNumber1 || randomNumber3 === randomNumber2) {
      randomNumber3 = Math.floor(Math.random() * numberOfNoteImages)
    }
    return [randomNumber1, randomNumber2, randomNumber3]
  }

  /**
   * Creates notes for the note directions.
   * @param {string} noDirection - The no direction.
   * @param {integer} randomNumber1 - The first random number.
   * @param {integer} randomNumber2 - The second random number.
   * @param {integer} randomNumber3 - The third random number.
   */
  addNoteImages(noDirection, randomNumber1, randomNumber2, randomNumber3) {
    if (noDirection !== 'right') {
      this.createNote(
        this.character.x + 92,
        this.character.y + 2,
        this.noteImages[randomNumber1].image
      )
    }

    if (noDirection !== 'left') {
      this.createNote(
        this.character.x - 92,
        this.character.y + 2,
        this.noteImages[randomNumber2].image
      )
      this.character.flipX = false
    }

    this.createNote(
      this.character.x,
      this.character.y - 106,
      this.noteImages[randomNumber3].image
    )
  }

  /**
   * Creates a note at the specified position.
   * @param {number} x - The x-coordinate of the note.
   * @param {number} y - The y-coordinate of the note.
   * @param {string} image - The image key of the note.
   */
  createNote(x, y, image) {
    const note = this.notes.create(x, y, image)
    note.resolution = 5
    note.setMask(this.createNoteMask(note))
  }

  /**
   * Creates a mask for a note.
   * @param {Phaser.GameObjects.Sprite} note - The note sprite.
   * @returns {Phaser.Display.Masks.GeometryMask} The note mask.
   */
  createNoteMask(note) {
    const width = note.width * 0.9
    const height = note.height * 0.9

    return this.make
      .graphics()
      .fillStyle(0xffffff)
      .fillRoundedRect(note.x - width / 2, note.y - height / 2, width, height, {
        tl: 10,
        tr: 10,
        bl: 10,
        br: 10,
      })
      .createGeometryMask()
  }

  // ---------------- Arrows for directions ---------------- //
  /**
   * Creates arrows for the note directions.
   * @param {string} jumpDirection - The jump direction.
   * @param {string} noDirection - The no direction.
   */
  createArrows(jumpDirection, noDirection) {
    this.arrow = this.physics.add.staticGroup()
    this.createRightArrow(noDirection)
    this.createLeftArrow(noDirection)
    this.createUpArrows(jumpDirection)
  }

  /**
   *  Creates up arrows for the jump direction.
   */
  createUpArrows(jumpDirection) {
    const arrow = this.arrow.create(
      this.character.x,
      this.character.y - 182,
      'jumpRight'
    )

    if (jumpDirection === 'right') {
      arrow.setAngle(50)
    } else if (jumpDirection === 'left') {
      arrow.setAngle(-50)
      arrow.setFlipX(true)
    }
  }

  /**
   * Creates a right arrow. If the noDirection is right, no arrow is created.
   * @param {string} noDirection - The no direction.
   */
  createRightArrow(noDirection) {
    if (noDirection !== 'right') {
      this.arrow.create(
        this.character.x + 92,
        this.character.y - 62,
        'arrowRight'
      )
    }
  }

  /**
   * Creates a left arrow. If the noDirection is left, no arrow is created.
   */
  createLeftArrow(noDirection) {
    if (noDirection !== 'left') {
      this.arrow
        .create(this.character.x - 92, this.character.y - 62, 'arrowRight')
        .setFlipX(true)
    }
  }

  // -------------------Character death------------------- //
  /**
   * Drops a stone to punish the character for playing the wrong note.
   */
  dropTheStone() {
    if (this.character.isDead) {
      return
    }
    this.stone = this.physics.add.image(this.character.x, 0, 'stone')
    this.stone.setGravityY(300)
    this.physics.add.collider(this.stone, this.platforms)
    this.physics.add.overlap(
      this.character,
      this.stone,
      this.characterDeathOfStone,
      null,
      this
    )
  }

  /**
   * Handles the character's death when hit by a falling stone.
   */
  characterDeathOfStone() {
    this.stopCameraPLayerIsDead()
    this.character.setVisible(false)
    this.characterDied()
  }

  stopCameraPLayerIsDead() {
    // Storing the current camera position
    const cameraScrollX = this.cameras.main.scrollX
    const cameraScrollY = this.cameras.main.scrollY
    // Setting the camera to the stored position
    this.cameras.main.stopFollow(this.character)
    this.cameras.main.setScroll(cameraScrollX, cameraScrollY)
  }

  /**
   * Handles the character's death when burned in fire.
   */
  characterBurnedInFire() {
    this.time.delayedCall(
      500,
      () => {
        // Let  come into the fire
        this.character.detectedTone = null // Stop moving the character
        this.character.setVisible(false)
        this.characterDied()
      },
      [],
      this
    )
  }

  /**
   * Handles the character's death in water.
   */
  characterDied() {
    // DEATH IN GELERAL (WATER, ENEMY, FALLING)
    if (this.character.isDead) {
      return // The character is already dead
    }
    this.character.isDead = true
    this.returningToSameClefCharacterDied = true
    this.music.pause()
    this.character.detectedTone = null
    this.character.body.setVelocityX(0)
    this.character.body.setVelocityY(0)
    this.character.lives--
    this.livesText.setText(`Lives: ${this.character.lives}`)
    this.continueGameOrGameOver()
  }

  /**
   * Continues the game or handles the game over state depending on the character's lives.
   */
  continueGameOrGameOver() {
    if (this.character.lives > 0) {
      this.time.addEvent({
        delay: 2000,
        callback: this.returnCharacter,
        callbackScope: this,
      })
    } else {
      this.gameOver()
    }
  }

  /**
   * Returns the character to the last visited clef after death.
   */
  returnCharacter() {
    if (this.stone) {
      this.stone.destroy()
    }
    if (this.lastVisitedClef) {
      this.character.setPosition(this.lastVisitedClef.x, 100)
    }
    this.character.setVisible(true)
    this.cameras.main.startFollow(this.character)

    this.character.isDead = false // Set character status to alive
  }

  /**
   * Handles the game over state.
   */
  gameOver() {
    this.music.stop()
    this.addGameOverWindow()
    this.addGameOverText()
    this.addRestartButtonInGameOver()
    this.addMenuButtonInGameOver()
  }

  /**
   * Adds the game over window after the character loses all lives.
   */
  addGameOverWindow() {
    this.gameOverWindow = this.add
      .image(500, 335, 'window')
      .setScrollFactor(0)
      .setDepth(100)
  }

  /**
   * Adds the game over text to game over window after the character loses all lives.
   */
  addGameOverText() {
    this.gameOverText = this.addText(
      500,
      335,
      `Game over! \nYour scores: ${this.score}`,
      '32px'
    ).setDepth(101)
    this.gameOverText.setOrigin(0.5).setScrollFactor(0)
  }

  /**
   * Adds the restart button to game over window after the character loses all lives.
   */
  addRestartButtonInGameOver() {
    this.restartButton = this.addButton(
      this.gameOverWindow.x - 80,
      this.gameOverWindow.y + 120,
      'restartButton'
    )
      .setScrollFactor(0)
      .setDepth(102)

    this.restartButton.on(
      'pointerover',
      () => (this.game.canvas.style.cursor = 'pointer')
    )

    this.restartButton.on(
      'pointerout',
      () => (this.game.canvas.style.cursor = 'default')
    )
    this.restartButton.on('pointerdown', () => {
      this.restartGame()
    })
  }

  /**
   * Adds the menu button to game over window after the character loses all lives.
   */
  addMenuButtonInGameOver() {
    this.menuButton = this.addButton(
      this.gameOverWindow.x + 80,
      this.gameOverWindow.y + 120,
      'menuButton'
    )
      .setScrollFactor(0)
      .setDepth(102)

    this.menuButton.on(
      'pointerover',
      () => (this.game.canvas.style.cursor = 'pointer')
    )
    this.menuButton.on(
      'pointerout',
      () => (this.game.canvas.style.cursor = 'default')
    )
    this.menuButton.on('pointerdown', () => {
      this.handleMenuButton()
    })
  }

  /**
   * Collects a coin and increases the score.
   * @param {Phaser.GameObjects.GameObject} character - The character object.
   * @param {Phaser.GameObjects.GameObject} coin - The coin object.
   */
  collectCoin(character, coin) {
    this.coinSound.play()
    this.score += 10
    this.scoreText.setText(`Scores: ${this.score}`)
    coin.disableBody(true, true)
  }

  /**
   * Handles the character's win state.
   */
  characterWin() {
    setTimeout(() => {
      // Wait for the character to pass the end sign
      this.stopCharacter()
      this.winText = this.addText(
        200,
        335,
        `You won! Your scores: ${this.score}`,
        '64px'
      )
      this.winText.setScrollFactor(0)
    }, 1000)
  }

  /**
   * Restarts the game.
   */
  restartGame() {
    // Do not reload because of side effect eith stone dropping multiple times.

    this.destroy()
    this.scene.start('Play')
  }

  /**
   * Handles the menu button click.
   */
  handleMenuButton() {
    this.audio.stop()
    this.destroy()
    this.scene.start('Menu')
  }

  /**
   * Creates a button at the specified position.
   * @param {number} x - The x-coordinate of the button.
   * @param {number} y - The y-coordinate of the button.
   * @param {string} texture - The texture key of the button.
   * @param {number} scale - The scale of the button.
   * @returns {Phaser.GameObjects.Image} The button object.
   */
  addButton(x, y, texture, scale) {
    const button = this.add
      .image(x, y, texture)
      .setInteractive()
      .setScale(scale)
    return button
  }

  /**
   * Shuts down the event listeners.
   */
  shutDownListener() {
    eventEmitter.off('wrongTone', this.dropTheStone, this)
  }

  /**
   * Cleans up and destroys the Play scene.
   */
  destroy() {
    this.shutDownListener()
    this.music.stop()
    // console.log('destroying')
  }
}

export default Play
