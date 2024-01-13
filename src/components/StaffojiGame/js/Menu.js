import Phaser from 'phaser'

class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'Menu' })
  }

  create() {
    this.initializeScene()
    this.createBackground()
    this.createChooseInstrumentButtons()
    this.createGameTitle()
    this.createPlayButton()
    this.createInfoButton()
    this.createAttributionsButton()
  }

  update() {
    this.updateButtonImages()
    this.setSelectedInstrument()
  }

  initializeScene() {
    if (this.musicMenu) {
      this.musicMenu.stop()
    }
    this.musicMenu = this.sound.add('menuMusic', { volume: 0.2, loop: true })
    this.registry.set('musicMenu', this.musicMenu)
    this.musicMenu.play()
    this.selectedInstrument = 'violin'
  }

  createBackground() {
    this.add.image(540, 335, 'menuBg') // Background
  }

  createChooseInstrumentButtons() {
    const buttonPositions = [
      { x: 210, y: 561, texture: 'smallDisabledButton' },
      { x: 320, y: 561, texture: 'smallDisabledButton' },
      { x: 430, y: 561, texture: 'smallDisabledButton' },
      { x: 540, y: 561, texture: 'smallEmptyButton' },
      { x: 650, y: 561, texture: 'smallDisabledButton' },
      { x: 760, y: 561, texture: 'smallDisabledButton' },
      { x: 870, y: 561, texture: 'smallDisabledButton' },
    ]

    this.radioButtons = buttonPositions.map(({ x, y, texture, scale }, index) =>
      this.createButton(x, y, texture, scale, index)
    )

    this.radioButtons.forEach((button) => {
      button.resolution = 2
    })

    this.radioButtons[3].selected = true // Set initial selection

    this.radioButtons.forEach((button, index) => {
      button.on('pointerdown', () =>
        this.handleChooseInstrumentButtonClick(index)
      )
    })
    // Images for radio buttons
    this.add.image(210, 558, 'piano').resolution = 2
    this.add.image(320, 558, 'flute').resolution = 2
    this.add.image(430, 558, 'blockFl').resolution = 2
    this.add.image(540, 558, 'violin').resolution = 2
    this.add.image(655, 558, 'cello').resolution = 4
    this.add.image(769, 558, 'bassInstrument').resolution = 4
    this.add.image(870, 558, 'guitar').resolution = 2
  }

  handleChooseInstrumentButtonClick(index) {
    this.radioButtons.forEach((button) => {
      button.selected = button.index === index
    })
  }

  setSelectedInstrument() {
    const instruments = [
      'piano',
      'flute',
      'blockFl',
      'violin',
      'cello',
      'bassInstrument',
      'guitar',
    ]
    this.radioButtons.forEach((button) => {
      if (button.selected) {
        this.selectedInstrument = instruments[button.index]
      }
    })
    this.registry.set('instrument', this.selectedInstrument)
  }

  updateButtonImages() {
    this.radioButtons.forEach((button) => {
      const texture = button.selected
        ? 'smallEmptyButton'
        : 'smallDisabledButton'
      button.setTexture(texture)
    })
  }

  createGameTitle() {
    this.add.image(540, 150, 'logo')
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

  createPlayButton() {
    this.playButton = this.createButton(540, 408, 'playButton', 0.7)
    this.playButton.on('pointerover', () => this.playButton.setScale(0.8))
    this.playButton.on('pointerout', () => this.playButton.setScale(0.7))
    this.playButton.on('pointerdown', () => this.handlePlayButtonClick())
  }

  handlePlayButtonClick() {
    this.cameras.main.fadeOut(500)
    this.cameras.main.on('camerafadeoutcomplete', () => {
      this.scene.start('Options')
      this.cameras.main.fadeIn(500)
    })
  }

  createInfoButton() {
    this.infoButton = this.createButton(1005, 75, 'infoButton')
    // Change cursor on hover with light shade
    this.infoButton.on('pointerover', () => this.infoButton.setTint(0xcccccc))
    this.infoButton.on('pointerout', () => this.infoButton.setTint(0xffffff))
    this.infoButton.on('pointerdown', () => this.handleInstructionButtonClick())
  }

  handleInstructionButtonClick() {
    this.infowindow = this.add.image(540, 335, 'window').setScale(1.1)
    this.menuButton = this.createButton(540, 460, 'menuButton')
    this.menuButton.on('pointerdown', () => this.handleReturnToMenuButton())

    this.instructionText = this.add
      .text(
        278,
        217,
        `Play the first note to make the character start
moving. Once you stop playing, the character 
will advance towards the next musical clef. 
After collecting the next clef, New notes will appear 
indicating the available directions. Play the correct 
note corresponding to the desired direction to move. 
Make sure to tune your instrument A = 442.`,
        {
          fontSize: '24px',
          fill: '#000',
          fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
          resolution: 2.9,
        }
      )
      .setDepth(101)
  }

  createAttributionsButton() {
    this.attributionsButton = this.createButton(75, 75, 'attributionsButton')
    // Change cursor on hover with light shade
    this.attributionsButton.on('pointerover', () =>
      this.attributionsButton.setTint(0xcccccc)
    )
    this.attributionsButton.on('pointerout', () =>
      this.attributionsButton.setTint(0xffffff)
    )
    this.attributionsButton.on('pointerdown', () =>
      this.handleAttributionsButtonClick()
    )
  }

  handleAttributionsButtonClick() {
    // TODO: Add attributions
  }

  handleReturnToMenuButton() {
    this.infowindow.destroy()
    this.menuButton.destroy()
    this.instructionText.destroy()
  }
}

export default Menu
