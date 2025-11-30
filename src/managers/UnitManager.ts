import { Unit } from '../entities/Unit';
import { UnitType, UnitConfig } from '../utils/Types';
import { UNIT_SPEED } from '../utils/Constants';

/**
 * UnitManager - Gestisce tutte le unità nel gioco
 */
export class UnitManager {
  private scene: Phaser.Scene;
  private units: Map<string, Unit> = new Map();
  private unitConfigs: Map<UnitType, UnitConfig>;
  private nextUnitId: number = 0;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.unitConfigs = this.initializeUnitConfigs();
  }

  private initializeUnitConfigs(): Map<UnitType, UnitConfig> {
    const configs = new Map<UnitType, UnitConfig>();

    // Warrior - Unità da mischia
    configs.set(UnitType.WARRIOR, {
      type: UnitType.WARRIOR,
      health: 100,
      speed: UNIT_SPEED,
      damage: 15,
      range: 30,
      cost: {
        gold: 50,
        food: 1
      }
    });

    // Archer - Unità a distanza
    configs.set(UnitType.ARCHER, {
      type: UnitType.ARCHER,
      health: 60,
      speed: UNIT_SPEED * 0.9,
      damage: 20,
      range: 150,
      cost: {
        gold: 60,
        wood: 20,
        food: 1
      }
    });

    // Worker - Unità da lavoro
    configs.set(UnitType.WORKER, {
      type: UnitType.WORKER,
      health: 50,
      speed: UNIT_SPEED * 0.8,
      damage: 5,
      range: 20,
      cost: {
        gold: 30,
        food: 1
      }
    });

    return configs;
  }

  public spawnUnit(type: UnitType, x: number, y: number): Unit | null {
    const config = this.unitConfigs.get(type);
    if (!config) {
      console.error(`Configurazione non trovata per unità: ${type}`);
      return null;
    }

    const unit = new Unit(this.scene, x, y, config);
    const unitId = `unit_${this.nextUnitId++}`;
    this.units.set(unitId, unit);

    // Ascolta evento morte
    this.scene.events.once('unit-died', (deadUnit: Unit) => {
      if (deadUnit === unit) {
        this.removeUnit(unitId);
      }
    });

    console.log(`Unità spawната: ${type} (ID: ${unitId})`);
    return unit;
  }

  public removeUnit(unitId: string): void {
    const unit = this.units.get(unitId);
    if (unit) {
      unit.destroy();
      this.units.delete(unitId);
    }
  }

  public getUnit(unitId: string): Unit | undefined {
    return this.units.get(unitId);
  }

  public getAllUnits(): Unit[] {
    return Array.from(this.units.values());
  }

  public getUnitsByType(type: UnitType): Unit[] {
    return this.getAllUnits().filter(unit => unit.unitType === type);
  }

  public getUnitCount(): number {
    return this.units.size;
  }

  public getUnitsInArea(x: number, y: number, radius: number): Unit[] {
    return this.getAllUnits().filter(unit => {
      const distance = Phaser.Math.Distance.Between(unit.x, unit.y, x, y);
      return distance <= radius;
    });
  }

  public getUnitsInRect(rect: Phaser.Geom.Rectangle): Unit[] {
    return this.getAllUnits().filter(unit => {
      return rect.contains(unit.x, unit.y);
    });
  }

  public updateAll(time: number, delta: number): void {
    this.units.forEach(unit => {
      unit.update(time, delta);
    });
  }

  public destroy(): void {
    this.units.forEach(unit => unit.destroy());
    this.units.clear();
  }
}

