import Phaser from 'phaser';
import { SCENES } from '../utils/Constants';

/**
 * MainMenuScene - Menu principale del gioco
 */
export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.MAIN_MENU });
  }

  create(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Titolo
    this.add.text(width / 2, height / 3, 'RTS GAME', {
      fontSize: '64px',
      color: '#4a90e2',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 3 + 70, 'Strategia in Tempo Reale', {
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5);

    // Bottone Start
    const startButton = this.add.text(width / 2, height / 2 + 50, 'INIZIA PARTITA', {
      fontSize: '32px',
      color: '#ffffff',
      backgroundColor: '#4a90e2',
      padding: { x: 20, y: 10 }
    })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    // Hover effect
    startButton.on('pointerover', () => {
      startButton.setStyle({ backgroundColor: '#6aa8e8' });
    });

    startButton.on('pointerout', () => {
      startButton.setStyle({ backgroundColor: '#4a90e2' });
    });

    // Click handler
    startButton.on('pointerdown', () => {
      this.startGame();
    });

    // Istruzioni
    this.add.text(width / 2, height - 100, 
      'Click Sinistro: Seleziona unità | Click Destro: Muovi unità\n' +
      'WASD: Muovi camera | Rotella: Zoom',
      {
        fontSize: '16px',
        color: '#aaaaaa',
        align: 'center'
      }
    ).setOrigin(0.5);
  }

  private startGame(): void {
    console.log('MainMenuScene: Starting game...');
    this.scene.start(SCENES.GAME);
  }
}

