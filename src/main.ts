import Phaser from 'phaser';
import { gameConfig } from './config';
import './style.css';

// Inizializza il gioco Phaser
const game = new Phaser.Game(gameConfig);

// Esponi globalmente per debug (solo in sviluppo)
if (import.meta.env.DEV) {
  (window as any).game = game;
}

export default game;

