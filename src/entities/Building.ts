import Phaser from 'phaser';
import { BuildingType, BuildingConfig } from '../utils/Types';

/**
 * Building - Classe base per tutti gli edifici
 */
export class Building extends Phaser.GameObjects.Sprite {
  public buildingType: BuildingType;
  public maxHealth: number;
  public currentHealth: number;
  public isConstructed: boolean = false;
  public constructionProgress: number = 0;

  private healthBar?: Phaser.GameObjects.Graphics;
  private progressBar?: Phaser.GameObjects.Graphics;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    config: BuildingConfig
  ) {
    super(scene, x, y, config.type);

    this.buildingType = config.type;
    this.maxHealth = config.health;
    this.currentHealth = config.health;

    // Aggiungi alla scena
    scene.add.existing(this);

    // Rendi interattivo
    this.setInteractive();
    this.setupInputHandlers();

    // Crea UI
    this.createHealthBar();
    this.createProgressBar();

    // Inizia costruzione
    this.startConstruction();
  }

  private setupInputHandlers(): void {
    this.on('pointerdown', () => {
      this.onSelect();
    });

    this.on('pointerover', () => {
      this.setTint(0xcccccc);
    });

    this.on('pointerout', () => {
      this.clearTint();
    });
  }

  private createHealthBar(): void {
    this.healthBar = this.scene.add.graphics();
    this.updateHealthBar();
  }

  private createProgressBar(): void {
    this.progressBar = this.scene.add.graphics();
    this.updateProgressBar();
  }

  private updateHealthBar(): void {
    if (!this.healthBar || !this.isConstructed) return;

    this.healthBar.clear();

    const barWidth = this.width;
    const barHeight = 6;
    const offsetY = -this.height / 2 - 10;

    // Background
    this.healthBar.fillStyle(0x000000, 0.5);
    this.healthBar.fillRect(
      this.x - barWidth / 2,
      this.y + offsetY,
      barWidth,
      barHeight
    );

    // Health
    const healthPercentage = this.currentHealth / this.maxHealth;
    this.healthBar.fillStyle(0x00ff00, 0.8);
    this.healthBar.fillRect(
      this.x - barWidth / 2,
      this.y + offsetY,
      barWidth * healthPercentage,
      barHeight
    );
  }

  private updateProgressBar(): void {
    if (!this.progressBar || this.isConstructed) return;

    this.progressBar.clear();

    const barWidth = this.width;
    const barHeight = 8;
    const offsetY = -this.height / 2 - 15;

    // Background
    this.progressBar.fillStyle(0x000000, 0.5);
    this.progressBar.fillRect(
      this.x - barWidth / 2,
      this.y + offsetY,
      barWidth,
      barHeight
    );

    // Progress
    this.progressBar.fillStyle(0xffc107, 1);
    this.progressBar.fillRect(
      this.x - barWidth / 2,
      this.y + offsetY,
      barWidth * this.constructionProgress,
      barHeight
    );

    // Testo
    const text = `Costruzione: ${Math.floor(this.constructionProgress * 100)}%`;
    if (!this.scene.children.getByName('construction-text')) {
      const textObj = this.scene.add.text(
        this.x,
        this.y + offsetY - 15,
        text,
        {
          fontSize: '12px',
          color: '#ffffff'
        }
      );
      textObj.setName('construction-text');
      textObj.setOrigin(0.5);
    }
  }

  private startConstruction(): void {
    // Simula costruzione graduale (3 secondi)
    this.setAlpha(0.5); // Semi-trasparente durante costruzione

    const constructionTime = 3000; // 3 secondi
    const updateInterval = 100; // Aggiorna ogni 100ms

    const timer = this.scene.time.addEvent({
      delay: updateInterval,
      callback: () => {
        this.constructionProgress += updateInterval / constructionTime;

        if (this.constructionProgress >= 1) {
          this.constructionProgress = 1;
          this.finishConstruction();
          timer.destroy();
        }

        this.updateProgressBar();
      },
      loop: true
    });
  }

  private finishConstruction(): void {
    this.isConstructed = true;
    this.setAlpha(1); // Opaco

    // Rimuovi barra progresso
    if (this.progressBar) {
      this.progressBar.clear();
    }

    // Rimuovi testo costruzione
    const textObj = this.scene.children.getByName('construction-text');
    if (textObj) {
      textObj.destroy();
    }

    this.updateHealthBar();
    this.scene.events.emit('building-constructed', this);
  }

  public onSelect(): void {
    this.scene.events.emit('building-selected', this);
    console.log(`Building selezionato: ${this.buildingType}`);
  }

  public takeDamage(amount: number): void {
    if (!this.isConstructed) return;

    this.currentHealth = Math.max(0, this.currentHealth - amount);
    this.updateHealthBar();

    if (this.currentHealth <= 0) {
      this.destroy();
    }
  }

  public repair(amount: number): void {
    this.currentHealth = Math.min(this.maxHealth, this.currentHealth + amount);
    this.updateHealthBar();
  }

  public update(): void {
    if (this.isConstructed) {
      this.updateHealthBar();
    } else {
      this.updateProgressBar();
    }
  }

  public destroy(fromScene?: boolean): void {
    if (this.healthBar) {
      this.healthBar.destroy();
    }
    if (this.progressBar) {
      this.progressBar.destroy();
    }
    super.destroy(fromScene);
  }
}

