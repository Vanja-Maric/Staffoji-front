import Phaser from 'phaser'
import AudioFrequencyDetector from './AudioFrequencyDetector'

class Options extends Phaser.Scene {
  constructor() {
    super({ key: 'Options' })
  }

  create() {
    this.createBackground()
    this.createPlayButton()
    this.initializeScene()
    this.createBackToMainMenuButton()
    this.createLevelButtons()
    this.createGameTitle()

    if (this.instrument === 'violin') {
      this.createViolinOrViolaButtons()
    } else {
      this.setClefIfNotVIolinOrViola()
    }
  }

  update() {
    // console.log(this.instrument)
    this.setLevel()
    this.updateLevelButtonImages()
    if (this.instrument === 'violin' || this.instrument === 'viola') {
      this.updateViolinOrViolaButtonImages()
      this.setViolinOrViola()
    }
  }

  initializeScene() {
    this.instrument = this.registry.get('instrument')
    this.level = 3
    this.audio = new AudioFrequencyDetector(this.getToneVolumenLowerBorder())
    // console.log(this.audio)
    this.musicMenu = this.registry.get('musicMenu')
    this.selectedClef = 'treble'
  }

  getToneVolumenLowerBorder() {
    //0.013 - violin
    //0.005 - guitar
    // Change this to adjust the sensitivity! Adjust sendPitch - volumen if you change this
    // PIano note od E veliko do e2
    if (this.instrument === 'piano' || this.instrument === 'guitar') {
      return 0.005
    }
    return 0.013
  }

  createBackground() {
    this.add.image(540, 335, 'menuBg') // Background
  }

  createGameTitle() {
    this.add.image(540, 150, 'logo')
  }

  createPlayButton() {
    this.playButton = this.createButton(540, 408, 'playButton', 0.7)
    this.playButton.on('pointerover', () => this.playButton.setScale(0.8))
    this.playButton.on('pointerout', () => this.playButton.setScale(0.7))
    this.playButton.on('pointerdown', () => this.handlePlayButtonClick())
  }

  handlePlayButtonClick() {
    this.cameras.main.fadeOut(500)
    const event = new Event('startAudioContext')
    document.dispatchEvent(event)
    this.tweens.add({
      targets: this.musicMenu,
      volume: 0.0001,
      duration: 400,
      onComplete: function () {
        this.musicMenu.stop()
      },
      callbackScope: this,
    })
    this.registry.set('audio', this.audio)
    this.cameras.main.on('camerafadeoutcomplete', () => {
      this.scene.start('Play')
      this.cameras.main.fadeIn(500)
    })
  }

  createBackToMainMenuButton() {
    this.backToMenuButton = this.createButton(1005, 75, 'menuButton')
    // Change cursor on hover with light shade
    this.backToMenuButton.on('pointerover', () =>
      this.backToMenuButton.setTint(0xcccccc)
    )
    this.backToMenuButton.on('pointerout', () =>
      this.backToMenuButton.setTint(0xffffff)
    )

    this.backToMenuButton.on('pointerdown', () =>
      this.handleBackToMenuButtonClick()
    )
  }

  handleBackToMenuButtonClick() {
    this.cameras.main.fadeOut(500)
    this.cameras.main.on('camerafadeoutcomplete', () => {
      this.scene.start('Menu')
      this.cameras.main.fadeIn(500)
    })
  }

  setClefIfNotVIolinOrViola() {
    if (this.instrument === 'cello' || this.instrument === 'bassInstrument') {
      this.selectedClef = 'bass'
    } else {
      this.selectedClef = 'treble'
    }
    this.registry.set('instrument', this.instrument)
    this.registry.set('selectedClef', this.selectedClef)
  }

  createViolinOrViolaButtons() {
    const buttonPositions = [
      { x: 75, y: 75, texture: 'smallEmptyButton' },
      { x: 195, y: 75, texture: 'smallDisabledButton' },
    ]

    this.violinOrViolaRadioButtons = buttonPositions.map(
      ({ x, y, texture, scale }, index) =>
        this.createButton(x, y, texture, scale, index)
    )

    this.violinOrViolaRadioButtons.forEach((button) => {
      button.resolution = 2
    })

    this.violinOrViolaRadioButtons[0].selected = true // Set initial selection to violin

    this.violinOrViolaRadioButtons.forEach((button, index) => {
      button.on('pointerdown', () => this.handleViolinOrViolaButtons(index))
    })
    // Images for radio buttons
    this.add.image(75, 72, 'treble').setScale(0.6)
    this.add.image(195, 72, 'alto').setScale(0.6)
  }

  handleViolinOrViolaButtons(index) {
    this.violinOrViolaRadioButtons.forEach((button) => {
      button.selected = button.index === index
    })
    this.updateViolinOrViolaButtonImages()
    this.setViolinOrViola()
  }

  setViolinOrViola() {
    if (this.violinOrViolaRadioButtons[0].selected) {
      this.instrument = 'violin'
      this.selectedClef = 'treble'
    } else if (this.violinOrViolaRadioButtons[1].selected) {
      this.instrument = 'viola'
      this.selectedClef = 'alto'
    }
    this.registry.set('instrument', this.instrument)
    this.registry.set('selectedClef', this.selectedClef)
  }

  updateViolinOrViolaButtonImages() {
    this.violinOrViolaRadioButtons.forEach((button) => {
      const texture = button.selected
        ? 'smallEmptyButton'
        : 'smallDisabledButton'
      button.setTexture(texture)
    })
  }

  createButton(x, y, texture, scale, index) {
    const button = this.add
      .image(x, y, texture)
      .setInteractive()
      .setScale(scale)

    button.on('pointerover', () => (this.game.canvas.style.cursor = 'pointer'))
    button.on('pointerout', () => (this.game.canvas.style.cursor = 'default'))

    button.index = index // Attach the index for easy reference
    return button
  }

  createLevelButtons() {
    const buttonPositions = [
      { x: 420, y: 561, texture: 'smallEmptyButton' },
      { x: 540, y: 561, texture: 'smallEmptyButton' },
      { x: 660, y: 561, texture: 'smallEmptyButton' },
    ]

    this.levelRadioButtons = buttonPositions.map(
      ({ x, y, texture, scale }, index) =>
        this.createButton(x, y, texture, scale, index)
    )

    this.levelRadioButtons.forEach((button) => {
      button.resolution = 2
    })

    this.levelRadioButtons[2].selected = true // Set initial selection to level 1

    this.levelRadioButtons.forEach((button, index) => {
      button.on('pointerdown', () => this.handleLevelButtons(index))
    })

    // Images for radio buttons
    this.add.image(420, 561, 'levelNumber1').setScale(0.6)
    this.add.image(540, 561, 'levelNumber2').setScale(0.6)
    this.add.image(660, 561, 'levelNumber3').setScale(0.6)
  }

  handleLevelButtons(index) {
    this.levelRadioButtons.forEach((button) => {
      button.selected = button.index === index
    })
  }

  setLevel() {
    if (this.levelRadioButtons[0].selected) {
      this.level = 1
    } else if (this.levelRadioButtons[1].selected) {
      this.level = 2
    } else if (this.levelRadioButtons[2].selected) {
      this.level = 3
    }
    this.registry.set('level', this.level)
  }

  updateLevelButtonImages() {
    this.levelRadioButtons.forEach((button) => {
      const texture = button.selected
        ? 'smallEmptyButton'
        : 'smallDisabledButton'
      button.setTexture(texture)
    })
  }
}

export default Options
