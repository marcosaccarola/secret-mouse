import Phaser from 'phaser';
import { UnitType, UnitConfig } from '../utils/Types';
import { UNIT_SPEED } from '../utils/Constants';

/**
 * Unit - Classe base per tutte le unità del gioco
 */
export class Unit extends Phaser.Physics.Arcade.Sprite {
  public unitType: UnitType;
  public maxHealth: number;
  public currentHealth: number;
  public speed: number;
  public damage: number;
  public range: number;
  public isSelected: boolean = false;
  
  private target: Phaser.Math.Vector2 | null = null;
  private selectionCircle?: Phaser.GameObjects.Graphics;
  private healthBar?: Phaser.GameObjects.Graphics;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    config: UnitConfig
  ) {
    super(scene, x, y, config.type);

    this.unitType = config.type;
    this.maxHealth = config.health;
    this.currentHealth = config.health;
    this.speed = config.speed || UNIT_SPEED;
    this.damage = config.damage || 10;
    this.range = config.range || 50;

    // Aggiungi alla scena e alla fisica
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Configura fisica
    this.setCollideWorldBounds(true);

    // Rendi interattivo
    this.setInteractive();
    this.setupInputHandlers();

    // Crea elementi UI
    this.createHealthBar();
  }

  private setupInputHandlers(): void {
    this.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (pointer.leftButtonDown()) {
        this.onSelect();
      }
    });
  }

  private createHealthBar(): void {
    this.healthBar = this.scene.add.graphics();
    this.updateHealthBar();
  }

  private updateHealthBar(): void {
    if (!this.healthBar) return;

    this.healthBar.clear();

    // Background (rosso)
    this.healthBar.fillStyle(0xff0000, 0.8);
    this.healthBar.fillRect(this.x - 16, this.y - 25, 32, 4);

    // Health attuale (verde)
    const healthPercentage = this.currentHealth / this.maxHealth;
    this.healthBar.fillStyle(0x00ff00, 0.8);
    this.healthBar.fillRect(this.x - 16, this.y - 25, 32 * healthPercentage, 4);
  }

  public onSelect(): void {
    this.isSelected = true;
    this.showSelectionCircle();
    this.scene.events.emit('unit-selected', this);
  }

  public onDeselect(): void {
    this.isSelected = false;
    this.hideSelectionCircle();
  }

  private showSelectionCircle(): void {
    if (!this.selectionCircle) {
      this.selectionCircle = this.scene.add.graphics();
    }
    this.updateSelectionCircle();
  }

  private hideSelectionCircle(): void {
    if (this.selectionCircle) {
      this.selectionCircle.clear();
    }
  }

  private updateSelectionCircle(): void {
    if (!this.selectionCircle || !this.isSelected) return;

    this.selectionCircle.clear();
    this.selectionCircle.lineStyle(2, 0x00ff00, 1);
    this.selectionCircle.strokeCircle(this.x, this.y, 20);
  }

  public moveTo(x: number, y: number): void {
    this.target = new Phaser.Math.Vector2(x, y);
  }

  public stop(): void {
    this.target = null;
    this.setVelocity(0, 0);
  }

  public takeDamage(amount: number): void {
    this.currentHealth = Math.max(0, this.currentHealth - amount);
    this.updateHealthBar();

    if (this.currentHealth <= 0) {
      this.die();
    }
  }

  public heal(amount: number): void {
    this.currentHealth = Math.min(this.maxHealth, this.currentHealth + amount);
    this.updateHealthBar();
  }

  private die(): void {
    this.scene.events.emit('unit-died', this);
    this.destroy();
  }

  public update(time: number, delta: number): void {
    // Movimento verso target
    if (this.target) {
      this.moveTowardsTarget(delta);
    }

    // Aggiorna UI
    this.updateHealthBar();
    if (this.isSelected) {
      this.updateSelectionCircle();
    }
  }

  private moveTowardsTarget(delta: number): void {
    if (!this.target) return;

    const distance = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      this.target.x,
      this.target.y
    );

    // Se siamo vicini al target, fermati
    if (distance < 5) {
      this.stop();
      return;
    }

    // Calcola direzione
    const angle = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      this.target.x,
      this.target.y
    );

    // Imposta velocità
    const velocityX = Math.cos(angle) * this.speed;
    const velocityY = Math.sin(angle) * this.speed;
    this.setVelocity(velocityX, velocityY);

    // Ruota sprite (opzionale)
    this.rotation = angle;
  }

  public destroy(fromScene?: boolean): void {
    if (this.healthBar) {
      this.healthBar.destroy();
    }
    if (this.selectionCircle) {
      this.selectionCircle.destroy();
    }
    super.destroy(fromScene);
  }
}

