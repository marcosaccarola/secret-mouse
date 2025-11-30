import { GameResources, ResourceType, ResourceCost } from '../utils/Types';
import { STARTING_GOLD, STARTING_WOOD, STARTING_FOOD } from '../utils/Constants';

/**
 * ResourceManager - Gestisce le risorse del giocatore
 */
export class ResourceManager {
  private resources: GameResources;
  private scene: Phaser.Scene;
  private resourceText?: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.resources = {
      gold: STARTING_GOLD,
      wood: STARTING_WOOD,
      food: STARTING_FOOD
    };

    this.createUI();
  }

  private createUI(): void {
    // Crea testo per mostrare risorse
    const textStyle = {
      fontSize: '18px',
      color: '#ffffff',
      backgroundColor: '#000000aa',
      padding: { x: 10, y: 5 }
    };

    this.resourceText = this.scene.add.text(10, 10, '', textStyle);
    this.resourceText.setScrollFactor(0); // Fisso sullo schermo
    this.updateUI();
  }

  private updateUI(): void {
    if (!this.resourceText) return;

    const text = `🪙 Oro: ${this.resources.gold}  🪵 Legno: ${this.resources.wood}  🌾 Cibo: ${this.resources.food}`;
    this.resourceText.setText(text);
  }

  public getResources(): GameResources {
    return { ...this.resources };
  }

  public getResource(type: ResourceType): number {
    return this.resources[type];
  }

  public addResource(type: ResourceType, amount: number): void {
    this.resources[type] += amount;
    this.updateUI();
    this.scene.events.emit('resource-changed', type, this.resources[type]);
  }

  public removeResource(type: ResourceType, amount: number): boolean {
    if (this.resources[type] >= amount) {
      this.resources[type] -= amount;
      this.updateUI();
      this.scene.events.emit('resource-changed', type, this.resources[type]);
      return true;
    }
    return false;
  }

  public canAfford(cost: ResourceCost): boolean {
    if (cost.gold && this.resources.gold < cost.gold) return false;
    if (cost.wood && this.resources.wood < cost.wood) return false;
    if (cost.food && this.resources.food < cost.food) return false;
    return true;
  }

  public spendResources(cost: ResourceCost): boolean {
    if (!this.canAfford(cost)) {
      console.warn('Risorse insufficienti!');
      return false;
    }

    if (cost.gold) this.removeResource(ResourceType.GOLD, cost.gold);
    if (cost.wood) this.removeResource(ResourceType.WOOD, cost.wood);
    if (cost.food) this.removeResource(ResourceType.FOOD, cost.food);

    return true;
  }

  public destroy(): void {
    if (this.resourceText) {
      this.resourceText.destroy();
    }
  }
}

