import Phaser from 'phaser';
import { SCENES } from '../utils/Constants';

/**
 * PreloadScene - Carica tutti gli asset del gioco
 */
export class PreloadScene extends Phaser.Scene {
  private loadingBar!: Phaser.GameObjects.Graphics;
  private progressBar!: Phaser.GameObjects.Graphics;

  constructor() {
    super({ key: SCENES.PRELOAD });
  }

  preload(): void {
    this.createLoadingBar();

    // Carica asset (per ora placeholder)
    // TODO: Sostituire con asset reali
    this.loadPlaceholderAssets();

    // Eventi di caricamento
    this.load.on('progress', this.updateLoadingBar, this);
    this.load.on('complete', this.onLoadComplete, this);
  }

  private createLoadingBar(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Testo
    const loadingText = this.add.text(width / 2, height / 2 - 50, 'Caricamento...', {
      fontSize: '32px',
      color: '#ffffff'
    }).setOrigin(0.5);

    // Barra di caricamento
    this.progressBar = this.add.graphics();
    this.loadingBar = this.add.graphics();
    this.loadingBar.fillStyle(0x222222, 0.8);
    this.loadingBar.fillRect(width / 2 - 200, height / 2, 400, 30);
  }

  private updateLoadingBar(value: number): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.progressBar.clear();
    this.progressBar.fillStyle(0x4a90e2, 1);
    this.progressBar.fillRect(width / 2 - 200, height / 2, 400 * value, 30);
  }

  private onLoadComplete(): void {
    this.progressBar.destroy();
    this.loadingBar.destroy();
  }

  private loadPlaceholderAssets(): void {
    // Genera placeholder grafici temporanei
    // Questo permette di testare il gioco senza asset grafici
    this.createPlaceholderTextures();
  }

  private createPlaceholderTextures(): void {
    // Unità Warrior (cerchio blu)
    const warrior = this.add.graphics();
    warrior.fillStyle(0x4a90e2, 1);
    warrior.fillCircle(16, 16, 16);
    warrior.generateTexture('warrior', 32, 32);
    warrior.destroy();

    // Unità Archer (cerchio verde)
    const archer = this.add.graphics();
    archer.fillStyle(0x4caf50, 1);
    archer.fillCircle(16, 16, 16);
    archer.generateTexture('archer', 32, 32);
    archer.destroy();

    // Unità Worker (cerchio giallo)
    const worker = this.add.graphics();
    worker.fillStyle(0xffc107, 1);
    worker.fillCircle(16, 16, 16);
    worker.generateTexture('worker', 32, 32);
    worker.destroy();

    // Building Town Hall (quadrato marrone)
    const townHall = this.add.graphics();
    townHall.fillStyle(0x8b4513, 1);
    townHall.fillRect(0, 0, 64, 64);
    townHall.generateTexture('town_hall', 64, 64);
    townHall.destroy();

    // Building Barracks (quadrato rosso)
    const barracks = this.add.graphics();
    barracks.fillStyle(0xd32f2f, 1);
    barracks.fillRect(0, 0, 48, 48);
    barracks.generateTexture('barracks', 48, 48);
    barracks.destroy();

    // Cerchio di selezione
    const selection = this.add.graphics();
    selection.lineStyle(2, 0x00ff00, 1);
    selection.strokeCircle(16, 16, 18);
    selection.generateTexture('selection_circle', 32, 32);
    selection.destroy();

    // Tile terreno (verde)
    const grassTile = this.add.graphics();
    grassTile.fillStyle(0x4a7c4e, 1);
    grassTile.fillRect(0, 0, 32, 32);
    grassTile.generateTexture('tile_grass', 32, 32);
    grassTile.destroy();
  }

  create(): void {
    console.log('PreloadScene: Assets caricati');
    
    // Vai al menu principale
    this.time.delayedCall(500, () => {
      this.scene.start(SCENES.MAIN_MENU);
    });
  }
}

