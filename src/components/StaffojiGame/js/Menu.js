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
    this.createHighScoresButton()
    this.createMusicOnButton()
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
    this.infowindow = this.add.image(540, 335, 'window').setScale(1.1)
    this.menuButton = this.createButton(540, 460, 'menuButton')
    this.menuButton.on('pointerdown', () => this.handleReturnToMenuButton())

    this.attributionsText = this.add.text(
      278,
      180,
      ` 
        Attributions (You can find the attributions at home page as well):
        Cello, Bass: "https://www.flaticon.com/free-icons/cello"; 
        Violin: "https://www.flaticon.com/free-icons/violin";
        Guitar: "https://www.flaticon.com/free-icons/guitar";
        Piano, Flute: "https://www.flaticon.com/free-icons/piano";
        Recorder: "https://www.flaticon.com/free-icons/flute";
        Menu music: "https://opengameart.org/content/woodland-fantasy";
        Menu background image: "https://pixabay.com/sv/vectors/bakgrund
        -m%C3%B6nster-l%C3%B6v-l%C3%B6vverk-gr%C3%B6n-6642882/"
        Game music: "https://opengameart.org/content/crystal-cave-song18">
        Coin sound: "https://opengameart.org/content/completion-sound">`,
      {
        fontSize: '16px',
        fill: '#000',
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        resolution: 1.9,
      }
    )
  }

  createMusicOnButton() {
    // TODO: ADD FUNCTIONALITI HERE
    this.musicOnButton = this.createButton(1005, 200, 'musicOnButton')
  }

  createHighScoresButton() {
    this.highScoresButton = this.createButton(75, 200, 'highScoresButton')
    // Change cursor on hover with light shade
    this.highScoresButton.on('pointerover', () =>
      this.highScoresButton.setTint(0xcccccc)
    )
    this.highScoresButton.on('pointerout', () =>
      this.highScoresButton.setTint(0xffffff)
    )
    this.highScoresButton.on('pointerdown', () => this.handleLeaderbord())
  }

  async handleLeaderbord() {
    this.infowindow = this.add.image(540, 335, 'window').setScale(1.1)
    this.menuButton = this.createButton(540, 460, 'menuButton')
    this.menuButton.on('pointerdown', () => this.handleReturnToMenuButton())
    this.menuButton.setVisible(false)

    // Fetch leaderboard data from the server
    const response = await fetch('https://oyster-app-e4o6y.ondigitalocean.app/leaderboard/')
    //TODO:  change to the following line when deploying
    /*const response = await fetch(
      'https://staffoji-game-last.onrender.com/leaderboard/'
    )*/
    if (!response.ok) {
      console.error('Failed to fetch leaderboard data:', response.statusText)
      return
    }

    const highScoresData = await response.json()

    // Limit the number of entries to 10
    const limitedHighScoresData = highScoresData.slice(0, 9)

    // Format leaderboard data as a string
    const highScoresText = limitedHighScoresData
      .map(
        (entry, index) =>
          `${index + 1}. ${entry.userName.padEnd(22, '.')} ${entry.totalScore}`
      )
      .join('\n')

    this.highScoresText = this.add.text(278, 200, highScoresText, {
      fontSize: '30px',
      fill: '#ff6347', // Red color
      fontStyle: 'bold italic',
      fontFamily: 'Courier, monospace', // Use a monospaced font
      stroke: '#000000', // Black stroke
      strokeThickness: 2,
      shadow: {
        offsetX: 2,
        offsetY: 2,
        color: '#000000',
        blur: 2,
        stroke: true,
        fill: true,
      },
      resolution: 1.9,
    })
    // Add input listener to the entire game scene
    this.input.on('pointerdown', (pointer) => {
      // Check if clicked position is outside the leaderboard window
      if (
        !Phaser.Geom.Rectangle.Contains(
          this.infowindow.getBounds(),
          pointer.x,
          pointer.y
        )
      ) {
        // Close the leaderboard window
        this.infowindow.destroy()
        this.highScoresText.destroy()
        // Remove this input listener
        this.input.off('pointerdown')
      }
    })
  }

  handleReturnToMenuButton() {
    this.infowindow.destroy()
    this.menuButton.destroy()
    if (this.instructionText) {
      this.instructionText.destroy()
    }
    if (this.attributionsText) {
      this.attributionsText.destroy()
    }
    if (this.highScoresText) {
      this.highScoresText.destroy()
    }
  }
}

export default Menu
