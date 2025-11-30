# 🎮 RTS Game - Gioco di Strategia in Tempo Reale

Un gioco di strategia in tempo reale (RTS) in stile **Manor Lords** e **Age of Empires**, sviluppato con Phaser 3 e TypeScript.

## 🚀 Avvio Rapido

### Installazione

```bash
npm install
```

### Sviluppo

```bash
npm run dev
```

Il gioco sarà disponibile su `http://localhost:3000`

### Build Produzione

```bash
npm run build
```

## 🎯 Funzionalità Implementate

### ✅ Sistema di Unità
- **Warrior**: Unità da mischia con alta difesa
- **Archer**: Unità a distanza con lungo raggio
- **Worker**: Unità da lavoro per raccolta risorse

### ✅ Sistema di Selezione
- Click sinistro per selezionare unità singole
- Drag per selezione multipla (box selection)
- Shift + Click per aggiungere alla selezione
- ESC per deselezionare tutto

### ✅ Sistema di Movimento
- Click destro per muovere unità selezionate
- Formazione automatica per gruppi di unità
- Pathfinding base

### ✅ Sistema di Edifici
- Town Hall come edificio principale
- Barre di costruzione progressive
- Sistema di salute per edifici

### ✅ Sistema di Risorse
- Oro, Legno, Cibo
- UI per visualizzare risorse correnti
- Sistema di costi per unità/edifici

### ✅ Camera e Controlli
- WASD per muovere la camera
- Edge scrolling (muovi il mouse ai bordi)
- Zoom con rotella del mouse
- Camera limitata ai bordi della mappa

## 🎮 Controlli

### Selezione e Movimento
- **Click Sinistro**: Seleziona unità
- **Click + Drag**: Selezione multipla
- **Click Destro**: Muovi unità selezionate
- **Shift + Click**: Aggiungi alla selezione
- **ESC**: Deseleziona tutto

### Camera
- **W/↑**: Muovi camera su
- **A/←**: Muovi camera sinistra
- **S/↓**: Muovi camera giù
- **D/→**: Muovi camera destra
- **Rotella Mouse**: Zoom in/out
- **Edge Scrolling**: Muovi mouse ai bordi dello schermo

### Spawn Unità (Testing)
- **1**: Spawna Warrior
- **2**: Spawna Archer
- **3**: Spawna Worker

## 📁 Struttura Progetto

```
src/
├── main.ts                    # Entry point
├── config.ts                  # Configurazione Phaser
├── scenes/                    # Scene del gioco
│   ├── BootScene.ts          # Inizializzazione
│   ├── PreloadScene.ts       # Caricamento asset
│   ├── MainMenuScene.ts      # Menu principale
│   └── GameScene.ts          # Gameplay principale
├── entities/                  # Entità di gioco
│   ├── Unit.ts               # Classe base unità
│   └── Building.ts           # Classe base edifici
├── managers/                  # Manager di sistema
│   ├── UnitManager.ts        # Gestione unità
│   ├── ResourceManager.ts    # Gestione risorse
│   └── SelectionManager.ts   # Gestione selezione
└── utils/                     # Utility
    ├── Constants.ts          # Costanti di gioco
    └── Types.ts              # Tipi TypeScript
```

## 🛠️ Tecnologie Utilizzate

- **Phaser 3**: Game engine
- **TypeScript**: Linguaggio
- **Vite**: Build tool e dev server
- **Arcade Physics**: Sistema fisico

## 🎨 Asset Grafici

Attualmente il gioco usa **placeholder grafici generati proceduralmente**:
- Unità: Cerchi colorati
- Edifici: Quadrati
- Terreno: Tile verdi

Per aggiungere sprite reali:
1. Aggiungi file in `public/assets/`
2. Carica in `PreloadScene.ts` con `this.load.image()`
3. Sostituisci i placeholder

## 🚧 Prossimi Passi

### Da Implementare
- [ ] Sistema di combattimento
- [ ] Pathfinding A* (integra Easystar.js)
- [ ] Fog of War
- [ ] Minimap
- [ ] Sistema di costruzione edifici
- [ ] Raccolta risorse automatica
- [ ] AI per nemici
- [ ] Salvataggio/Caricamento partita
- [ ] Multiplayer (opzionale)

### Miglioramenti
- [ ] Sprite grafici reali
- [ ] Effetti sonori
- [ ] Musica di sottofondo
- [ ] Animazioni unità
- [ ] Particelle per effetti speciali

## 🐛 Debug

Il gioco è configurato con modalità debug attiva:
- **F12**: Apri DevTools
- **Console**: Messaggi di debug
- Collision boxes visibili (rosso)

Per disabilitare debug, in `config.ts`:
```typescript
physics: {
  arcade: {
    debug: false  // Cambia a false
  }
}
```

## 📝 Note di Sviluppo

### Hot Reload
Il progetto usa Vite con hot reload automatico. Modifica i file e vedi i cambiamenti istantaneamente nel browser.

### Accesso Globale (Debug)
In modalità dev, il gioco è accessibile da console:
```javascript
game.scene.keys.GameScene  // Accedi alla GameScene
```

## 📖 Risorse Utili

- [Phaser 3 Documentation](https://photonstorm.github.io/phaser3-docs/)
- [Phaser Examples](https://phaser.io/examples)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📄 Licenza

Progetto educativo per allenamento personale.

---

**Buon Divertimento! 🎮**

