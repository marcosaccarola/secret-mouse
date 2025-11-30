import Phaser from 'phaser';
import { SCENES } from '../utils/Constants';

/**
 * BootScene - Prima scena che viene caricata
 * Gestisce configurazioni iniziali e passa a PreloadScene
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.BOOT });
  }

  preload(): void {
    // Qui si possono caricare asset minimi per splash screen
    console.log('BootScene: Initializing...');
  }

  create(): void {
    console.log('BootScene: Starting PreloadScene');
    this.scene.start(SCENES.PRELOAD);
  }
}

