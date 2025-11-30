# 🎮 Come Iniziare - Guida Rapida

## ✅ Progetto Completato!

Il tuo gioco RTS è stato inizializzato con successo e funziona correttamente!

## 🚀 Avvio del Gioco

Il server di sviluppo è già in esecuzione su:
```
http://localhost:3000
```

Se devi riavviarlo:
```bash
npm run dev
```

## 🎯 Cosa È Stato Creato

### ✅ Struttura Completa
- **4 Scene**: Boot, Preload, MainMenu, GameScene
- **2 Entità**: Unit (con 3 tipi) e Building
- **3 Manager**: UnitManager, ResourceManager, SelectionManager
- **Sistema di risorse**: Oro, Legno, Cibo
- **Sistema di selezione**: Singola e multipla
- **Sistema di movimento**: Con formazioni automatiche
- **Camera controllabile**: WASD, Edge scrolling, Zoom

### 📂 Struttura Progetto

```
secret-mouse/
├── src/
│   ├── main.ts                    # Entry point
│   ├── config.ts                  # Config Phaser
│   ├── style.css                  # Stili
│   ├── scenes/                    # Scene di gioco
│   │   ├── BootScene.ts
│   │   ├── PreloadScene.ts
│   │   ├── MainMenuScene.ts
│   │   └── GameScene.ts           # ⭐ Scena principale
│   ├── entities/                  # Entità
│   │   ├── Unit.ts                # Classe unità
│   │   └── Building.ts            # Classe edifici
│   ├── managers/                  # Manager
│   │   ├── UnitManager.ts
│   │   ├── ResourceManager.ts
│   │   └── SelectionManager.ts
│   └── utils/                     # Utility
│       ├── Constants.ts
│       └── Types.ts
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎮 Controlli di Gioco

### 🖱️ Mouse
- **Click Sinistro**: Seleziona unità
- **Click + Drag**: Selezione multipla (box)
- **Click Destro**: Muovi unità selezionate
- **Shift + Click**: Aggiungi alla selezione
- **Rotella Mouse**: Zoom in/out

### ⌨️ Tastiera
- **WASD** o **Frecce**: Muovi camera
- **1**: Spawna Warrior
- **2**: Spawna Archer
- **3**: Spawna Worker
- **ESC**: Deseleziona tutto

### 🖱️ Edge Scrolling
Muovi il mouse ai bordi dello schermo per muovere la camera

## 🧪 Test del Gioco

### Prova Queste Funzionalità:

1. **Selezione Unità**
   - Clicca su un'unità per selezionarla (cerchio verde)
   - Trascina per selezionare più unità

2. **Movimento**
   - Seleziona unità e click destro per muoverle
   - Le unità si dispongono in formazione automatica

3. **Spawn Unità**
   - Premi 1, 2 o 3 per creare nuove unità
   - Appaiono al centro della camera

4. **Risorse**
   - Vedi il contatore in alto a sinistra
   - Oro: 1000, Legno: 500, Cibo: 200

5. **Camera**
   - Usa WASD per muovere la vista
   - Zoom con la rotella del mouse
   - Edge scrolling con il mouse ai bordi

## 🎨 Asset Grafici

Attualmente il gioco usa **placeholder grafici** generati proceduralmente:
- **Unità**: Cerchi colorati (Blu=Warrior, Verde=Archer, Giallo=Worker)
- **Edifici**: Quadrati (Marrone=Town Hall, Rosso=Barracks)
- **Terreno**: Tile verdi

### Come Sostituire con Sprite Reali:

1. Metti i file immagine in `public/assets/`
2. Modifica `PreloadScene.ts`:
   ```typescript
   preload(): void {
     this.load.image('warrior', 'assets/warrior.png');
     this.load.image('archer', 'assets/archer.png');
     // etc...
   }
   ```
3. Rimuovi il metodo `createPlaceholderTextures()`

## 🛠️ Prossimi Passi

### Facili
- [ ] Aggiungere suoni al click
- [ ] Migliorare grafica placeholder
- [ ] Aggiungere più tipi di unità
- [ ] Creare più edifici

### Medi
- [ ] **Sistema di combattimento**: Unit vs Unit
- [ ] **Raccolta risorse**: Worker raccoglie da miniere/alberi
- [ ] **Costruzione edifici**: Click per piazzare edifici
- [ ] **Minimap**: Visione d'insieme della mappa
- [ ] **Health bars animate**: Animazioni danno

### Avanzati
- [ ] **Pathfinding A***: Integra `easystarjs` per pathfinding intelligente
- [ ] **Fog of War**: Nebbia di guerra
- [ ] **AI nemica**: Avversari controllati dal computer
- [ ] **Sistema di tech tree**: Ricerca e upgrade
- [ ] **Multiplayer**: (Colyseus, Socket.io)

## 📚 Documentazione Utile

- [Phaser 3 Docs](https://photonstorm.github.io/phaser3-docs/)
- [Phaser Examples](https://phaser.io/examples)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)

## 🐛 Debug

### Aprire DevTools (F12)
```javascript
// Console commands disponibili:
game                    // Accedi all'istanza Phaser
game.scene.keys        // Vedi tutte le scene
game.scene.keys.GameScene  // Accedi alla GameScene
```

### Modalità Debug
La modalità debug è **attiva** di default:
- Vedi collision boxes (rosso)
- Console logs attivi
- Source maps per TypeScript

Per disabilitare, in `config.ts`:
```typescript
physics: {
  arcade: {
    debug: false  // Cambia a false
  }
}
```

## 🎉 Congratulazioni!

Hai un gioco RTS funzionante pronto per essere sviluppato! 

### Suggerimenti per Imparare:
1. **Inizia piccolo**: Aggiungi una funzionalità alla volta
2. **Testa spesso**: Ricarica il browser dopo ogni modifica
3. **Usa console.log**: Per debuggare e capire il flusso
4. **Sperimenta**: Cambia valori in `Constants.ts` e vedi cosa succede

## 💡 Consigli

- **Hot Reload**: Vite ricarica automaticamente, salva e vedi i cambiamenti!
- **TypeScript**: Gli errori di tipo ti salvano da bug
- **Phaser Examples**: Cerca esempi per feature specifiche
- **Community**: Phaser ha una community enorme e attiva

---

**Buon Coding! 🚀**

