// Costanti di gioco
export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;

// Dimensioni mappa
export const MAP_WIDTH = 2560;
export const MAP_HEIGHT = 1440;

// Unità
export const UNIT_SPEED = 100;
export const UNIT_SELECTION_RADIUS = 32;

// Risorse iniziali
export const STARTING_GOLD = 1000;
export const STARTING_WOOD = 500;
export const STARTING_FOOD = 200;

// Colori UI
export const COLOR_PRIMARY = 0x4a90e2;
export const COLOR_SUCCESS = 0x4caf50;
export const COLOR_DANGER = 0xf44336;
export const COLOR_WARNING = 0xff9800;

// Input
export const CAMERA_SPEED = 500;
export const CAMERA_ZOOM_MIN = 0.5;
export const CAMERA_ZOOM_MAX = 2.0;

// Scene Keys
export const SCENES = {
  BOOT: 'BootScene',
  PRELOAD: 'PreloadScene',
  MAIN_MENU: 'MainMenuScene',
  GAME: 'GameScene'
} as const;

