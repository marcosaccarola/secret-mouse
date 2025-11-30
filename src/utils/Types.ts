// Tipi personalizzati per il gioco

export enum UnitType {
  WARRIOR = 'warrior',
  ARCHER = 'archer',
  WORKER = 'worker'
}

export enum BuildingType {
  TOWN_HALL = 'town_hall',
  BARRACKS = 'barracks',
  FARM = 'farm',
  MINE = 'mine'
}

export enum ResourceType {
  GOLD = 'gold',
  WOOD = 'wood',
  FOOD = 'food'
}

export interface UnitConfig {
  type: UnitType;
  health: number;
  speed: number;
  damage?: number;
  range?: number;
  cost: ResourceCost;
}

export interface BuildingConfig {
  type: BuildingType;
  health: number;
  width: number;
  height: number;
  cost: ResourceCost;
}

export interface ResourceCost {
  gold?: number;
  wood?: number;
  food?: number;
}

export interface GameResources {
  gold: number;
  wood: number;
  food: number;
}

