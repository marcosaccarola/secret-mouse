import { Unit } from '../entities/Unit';

/**
 * SelectionManager - Gestisce la selezione di unità
 */
export class SelectionManager {
  private scene: Phaser.Scene;
  private selectedUnits: Set<Unit> = new Set();
  private selectionBox?: Phaser.GameObjects.Graphics;
  private selectionStart?: Phaser.Math.Vector2;
  private isDragging: boolean = false;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.setupInputHandlers();
  }

  private setupInputHandlers(): void {
    // Click sinistro per selezione
    this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (pointer.leftButtonDown()) {
        this.startSelection(pointer);
      }
    });

    this.scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (this.isDragging) {
        this.updateSelectionBox(pointer);
      }
    });

    this.scene.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      if (pointer.leftButtonReleased()) {
        this.endSelection(pointer);
      }
    });
  }

  private startSelection(pointer: Phaser.Input.Pointer): void {
    // Deseleziona tutte le unità precedenti (a meno che non si tenga Shift)
    if (!pointer.event.shiftKey) {
      this.deselectAll();
    }

    this.selectionStart = new Phaser.Math.Vector2(
      pointer.worldX,
      pointer.worldY
    );
    this.isDragging = true;

    // Crea box di selezione
    if (!this.selectionBox) {
      this.selectionBox = this.scene.add.graphics();
    }
  }

  private updateSelectionBox(pointer: Phaser.Input.Pointer): void {
    if (!this.selectionBox || !this.selectionStart) return;

    const x = Math.min(this.selectionStart.x, pointer.worldX);
    const y = Math.min(this.selectionStart.y, pointer.worldY);
    const width = Math.abs(pointer.worldX - this.selectionStart.x);
    const height = Math.abs(pointer.worldY - this.selectionStart.y);

    this.selectionBox.clear();
    this.selectionBox.lineStyle(2, 0x00ff00, 1);
    this.selectionBox.fillStyle(0x00ff00, 0.1);
    this.selectionBox.fillRect(x, y, width, height);
    this.selectionBox.strokeRect(x, y, width, height);
  }

  private endSelection(pointer: Phaser.Input.Pointer): void {
    if (!this.selectionStart) return;

    const width = Math.abs(pointer.worldX - this.selectionStart.x);
    const height = Math.abs(pointer.worldY - this.selectionStart.y);

    // Se è un click singolo (non drag)
    if (width < 5 && height < 5) {
      // La selezione di singola unità è gestita dalla classe Unit
    } else {
      // Selezione multipla tramite box
      this.selectUnitsInBox(
        this.selectionStart.x,
        this.selectionStart.y,
        pointer.worldX,
        pointer.worldY
      );
    }

    // Reset
    this.isDragging = false;
    this.selectionStart = undefined;
    if (this.selectionBox) {
      this.selectionBox.clear();
    }
  }

  private selectUnitsInBox(
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): void {
    const left = Math.min(x1, x2);
    const right = Math.max(x1, x2);
    const top = Math.min(y1, y2);
    const bottom = Math.max(y1, y2);

    const rect = new Phaser.Geom.Rectangle(left, top, right - left, bottom - top);

    // Trova tutte le unità nel rettangolo
    this.scene.events.emit('select-units-in-box', rect);
  }

  public selectUnit(unit: Unit): void {
    this.selectedUnits.add(unit);
    unit.onSelect();
  }

  public deselectUnit(unit: Unit): void {
    this.selectedUnits.delete(unit);
    unit.onDeselect();
  }

  public deselectAll(): void {
    this.selectedUnits.forEach(unit => unit.onDeselect());
    this.selectedUnits.clear();
  }

  public getSelectedUnits(): Unit[] {
    return Array.from(this.selectedUnits);
  }

  public hasSelection(): boolean {
    return this.selectedUnits.size > 0;
  }

  public getSelectionCount(): number {
    return this.selectedUnits.size;
  }

  public moveSelectedUnits(x: number, y: number): void {
    const units = Array.from(this.selectedUnits);

    units.forEach((unit, index) => {
      // Forma una formazione quando si muovono più unità
      if (units.length > 1) {
        const offsetX = (index % 3) * 40 - 40;
        const offsetY = Math.floor(index / 3) * 40 - 40;
        unit.moveTo(x + offsetX, y + offsetY);
      } else {
        unit.moveTo(x, y);
      }
    });
  }

  public update(): void {
    // Rimuovi unità morte dalla selezione
    this.selectedUnits.forEach(unit => {
      if (!unit.active) {
        this.selectedUnits.delete(unit);
      }
    });
  }

  public destroy(): void {
    this.deselectAll();
    if (this.selectionBox) {
      this.selectionBox.destroy();
    }
  }
}

