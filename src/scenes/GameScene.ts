import Phaser from 'phaser';
import { SCENES, MAP_WIDTH, MAP_HEIGHT, CAMERA_SPEED } from '../utils/Constants';
import { Unit } from '../entities/Unit';
import { Building } from '../entities/Building';
import { UnitManager } from '../managers/UnitManager';
import { ResourceManager } from '../managers/ResourceManager';
import { SelectionManager } from '../managers/SelectionManager';
import { UnitType, BuildingType } from '../utils/Types';

/**
 * GameScene - Scena principale del gioco RTS
 */
export class GameScene extends Phaser.Scene {
  private unitManager!: UnitManager;
  private resourceManager!: ResourceManager;
  private selectionManager!: SelectionManager;
  private buildings: Building[] = [];
  
  // Input
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };

  // UI
  private infoText?: Phaser.GameObjects.Text;

  constructor() {
    super({ key: SCENES.GAME });
  }

  create(): void {
    console.log('GameScene: Inizializzazione...');

    // Setup mondo di gioco
    this.physics.world.setBounds(0, 0, MAP_WIDTH, MAP_HEIGHT);

    // Crea mappa
    this.createMap();

    // Inizializza manager
    this.unitManager = new UnitManager(this);
    this.resourceManager = new ResourceManager(this);
    this.selectionManager = new SelectionManager(this);

    // Setup camera
    this.setupCamera();

    // Setup input
    this.setupInput();

    // Crea entità iniziali
    this.spawnInitialEntities();

    // Setup UI
    this.createUI();

    // Setup event listeners
    this.setupEventListeners();

    console.log('GameScene: Pronto!');
  }

  private createMap(): void {
    // Crea un semplice background con tile
    const tileSize = 32;
    const tilesX = Math.ceil(MAP_WIDTH / tileSize);
    const tilesY = Math.ceil(MAP_HEIGHT / tileSize);

    for (let y = 0; y < tilesY; y++) {
      for (let x = 0; x < tilesX; x++) {
        const tile = this.add.image(
          x * tileSize + tileSize / 2,
          y * tileSize + tileSize / 2,
          'tile_grass'
        );
        // Variazione casuale per più realismo
        tile.setTint(Phaser.Display.Color.GetColor(
          60 + Math.random() * 20,
          100 + Math.random() * 40,
          60 + Math.random() * 20
        ));
      }
    }

    // Aggiungi bordi mappa
    const graphics = this.add.graphics();
    graphics.lineStyle(4, 0xffffff, 0.5);
    graphics.strokeRect(0, 0, MAP_WIDTH, MAP_HEIGHT);
  }

  private setupCamera(): void {
    const camera = this.cameras.main;
    
    // Limita camera ai bordi della mappa
    camera.setBounds(0, 0, MAP_WIDTH, MAP_HEIGHT);
    
    // Zoom iniziale
    camera.setZoom(1);

    // Controllo zoom con rotella mouse
    this.input.on('wheel', (pointer: any, gameObjects: any, deltaX: number, deltaY: number) => {
      const zoomAmount = deltaY > 0 ? -0.1 : 0.1;
      const newZoom = Phaser.Math.Clamp(camera.zoom + zoomAmount, 0.5, 2);
      camera.setZoom(newZoom);
    });
  }

  private setupInput(): void {
    // Frecce direzionali
    this.cursors = this.input.keyboard!.createCursorKeys();

    // WASD
    this.wasd = {
      W: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      A: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      S: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    };

    // Click destro per movimento
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (pointer.rightButtonDown()) {
        this.handleRightClick(pointer);
      }
    });

    // Tasti rapidi per spawn unità (testing)
    this.input.keyboard!.on('keydown-ONE', () => {
      this.spawnUnitAtCamera(UnitType.WARRIOR);
    });

    this.input.keyboard!.on('keydown-TWO', () => {
      this.spawnUnitAtCamera(UnitType.ARCHER);
    });

    this.input.keyboard!.on('keydown-THREE', () => {
      this.spawnUnitAtCamera(UnitType.WORKER);
    });

    // ESC per deselezionare
    this.input.keyboard!.on('keydown-ESC', () => {
      this.selectionManager.deselectAll();
    });
  }

  private handleRightClick(pointer: Phaser.Input.Pointer): void {
    if (this.selectionManager.hasSelection()) {
      // Muovi unità selezionate verso il punto cliccato
      this.selectionManager.moveSelectedUnits(pointer.worldX, pointer.worldY);

      // Feedback visivo
      this.createMoveIndicator(pointer.worldX, pointer.worldY);
    }
  }

  private createMoveIndicator(x: number, y: number): void {
    const circle = this.add.circle(x, y, 10, 0x00ff00, 0.5);
    
    // Animazione di fade out
    this.tweens.add({
      targets: circle,
      alpha: 0,
      scale: 2,
      duration: 500,
      onComplete: () => circle.destroy()
    });
  }

  private spawnInitialEntities(): void {
    // Town Hall iniziale
    const townHall = new Building(this, 400, 300, {
      type: BuildingType.TOWN_HALL,
      health: 500,
      width: 64,
      height: 64,
      cost: {}
    });
    this.buildings.push(townHall);

    // Alcune unità iniziali
    this.unitManager.spawnUnit(UnitType.WORKER, 300, 250);
    this.unitManager.spawnUnit(UnitType.WORKER, 350, 250);
    this.unitManager.spawnUnit(UnitType.WARRIOR, 300, 350);
    this.unitManager.spawnUnit(UnitType.ARCHER, 350, 350);

    console.log('Entità iniziali create');
  }

  private spawnUnitAtCamera(type: UnitType): void {
    const camera = this.cameras.main;
    const x = camera.scrollX + camera.width / 2;
    const y = camera.scrollY + camera.height / 2;
    
    const unit = this.unitManager.spawnUnit(type, x, y);
    if (unit) {
      console.log(`Unità ${type} spawnata in (${x}, ${y})`);
    }
  }

  private createUI(): void {
    // Info text in basso
    this.infoText = this.add.text(
      10,
      this.cameras.main.height - 30,
      '',
      {
        fontSize: '14px',
        color: '#ffffff',
        backgroundColor: '#000000aa',
        padding: { x: 8, y: 4 }
      }
    );
    this.infoText.setScrollFactor(0);
    this.updateInfoText();

    // Istruzioni in alto a destra
    const instructions = this.add.text(
      this.cameras.main.width - 10,
      50,
      'Tasti:\n1: Warrior\n2: Archer\n3: Worker\nWASD: Camera\nESC: Deselect',
      {
        fontSize: '12px',
        color: '#ffffff',
        backgroundColor: '#000000aa',
        padding: { x: 8, y: 4 },
        align: 'right'
      }
    );
    instructions.setOrigin(1, 0);
    instructions.setScrollFactor(0);
  }

  private updateInfoText(): void {
    if (!this.infoText) return;

    const unitCount = this.unitManager.getUnitCount();
    const selectedCount = this.selectionManager.getSelectionCount();
    
    this.infoText.setText(
      `Unità: ${unitCount} | Selezionate: ${selectedCount} | ` +
      `FPS: ${Math.round(this.game.loop.actualFps)}`
    );
  }

  private setupEventListeners(): void {
    // Quando un'unità viene selezionata
    this.events.on('unit-selected', (unit: Unit) => {
      this.selectionManager.selectUnit(unit);
      this.updateInfoText();
    });

    // Quando un edificio viene costruito
    this.events.on('building-constructed', (building: Building) => {
      console.log(`Edificio completato: ${building.buildingType}`);
    });

    // Quando un'unità muore
    this.events.on('unit-died', (unit: Unit) => {
      console.log(`Unità morta: ${unit.unitType}`);
      this.updateInfoText();
    });

    // Selezione multipla tramite box
    this.events.on('select-units-in-box', (rect: Phaser.Geom.Rectangle) => {
      const unitsInBox = this.unitManager.getUnitsInRect(rect);
      unitsInBox.forEach(unit => {
        this.selectionManager.selectUnit(unit);
      });
      this.updateInfoText();
    });
  }

  update(time: number, delta: number): void {
    // Aggiorna camera (movimento WASD)
    this.updateCamera(delta);

    // Aggiorna manager
    this.unitManager.updateAll(time, delta);
    this.selectionManager.update();

    // Aggiorna edifici
    this.buildings.forEach(building => building.update());

    // Aggiorna UI
    this.updateInfoText();
  }

  private updateCamera(delta: number): void {
    const camera = this.cameras.main;
    const speed = (CAMERA_SPEED * delta) / 1000;

    // WASD o frecce
    if (this.cursors.left.isDown || this.wasd.A.isDown) {
      camera.scrollX -= speed;
    }
    if (this.cursors.right.isDown || this.wasd.D.isDown) {
      camera.scrollX += speed;
    }
    if (this.cursors.up.isDown || this.wasd.W.isDown) {
      camera.scrollY -= speed;
    }
    if (this.cursors.down.isDown || this.wasd.S.isDown) {
      camera.scrollY += speed;
    }

    // Edge scrolling (opzionale)
    const pointer = this.input.activePointer;
    const edgeSize = 20;
    
    if (pointer.x < edgeSize) {
      camera.scrollX -= speed;
    } else if (pointer.x > this.cameras.main.width - edgeSize) {
      camera.scrollX += speed;
    }
    
    if (pointer.y < edgeSize) {
      camera.scrollY -= speed;
    } else if (pointer.y > this.cameras.main.height - edgeSize) {
      camera.scrollY += speed;
    }
  }

  shutdown(): void {
    // Cleanup
    this.unitManager.destroy();
    this.resourceManager.destroy();
    this.selectionManager.destroy();
    
    // Rimuovi listeners
    this.events.off('unit-selected');
    this.events.off('building-constructed');
    this.events.off('unit-died');
    this.events.off('select-units-in-box');
  }
}

