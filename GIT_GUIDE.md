# 📦 Guida Git per il Progetto RTS

## ✅ Repository Inizializzata!

La tua repository Git è stata creata con successo!

## 📊 Stato Attuale

```
Branch: master
Commit: 66af724 - Initial commit: RTS Game base structure
Files: 22 file committati
Lines: 2997 righe di codice
```

## 🔧 Comandi Git Essenziali

### Workflow Quotidiano

```bash
# 1. Vedi lo stato dei file modificati
git status

# 2. Aggiungi file modificati allo staging
git add .                    # Tutti i file
git add src/entities/Unit.ts # File specifico

# 3. Crea un commit
git commit -m "Aggiunto sistema di combattimento"

# 4. Vedi la cronologia
git log --oneline
git log --graph --oneline --all
```

### Comandi Utili

```bash
# Vedi le modifiche non ancora committate
git diff

# Vedi le modifiche di un file specifico
git diff src/scenes/GameScene.ts

# Annulla modifiche a un file (ATTENZIONE!)
git checkout -- src/scenes/GameScene.ts

# Vedi tutti i branch
git branch

# Crea un nuovo branch
git branch feature/combat-system
git checkout feature/combat-system
# Oppure in un comando solo:
git checkout -b feature/combat-system

# Torna al branch master
git checkout master

# Unisci un branch
git merge feature/combat-system
```

## 🌿 Strategia di Branching Consigliata

### Branch Principali

```
master (o main)     → Codice stabile e funzionante
development         → Sviluppo attivo
feature/*          → Nuove funzionalità
bugfix/*           → Correzioni bug
```

### Esempio di Workflow

```bash
# 1. Crea branch per nuova feature
git checkout -b feature/pathfinding

# 2. Lavora e fai commit frequenti
git add src/utils/Pathfinding.ts
git commit -m "Implementato algoritmo A*"

# 3. Continua a lavorare
git add src/entities/Unit.ts
git commit -m "Integrato pathfinding nelle unità"

# 4. Torna a master e unisci
git checkout master
git merge feature/pathfinding

# 5. (Opzionale) Elimina il branch feature
git branch -d feature/pathfinding
```

## 📝 Convenzioni per i Commit Messages

### Formato Consigliato

```
<tipo>: <descrizione breve>

[corpo opzionale con dettagli]

[footer opzionale]
```

### Tipi di Commit

```bash
✨ feat:     Nuova funzionalità
🐛 fix:      Correzione bug
📚 docs:     Documentazione
💄 style:    Formattazione, stile
♻️  refactor: Refactoring codice
⚡ perf:     Miglioramento performance
✅ test:     Aggiunta test
🔧 chore:    Manutenzione, configurazione
```

### Esempi

```bash
git commit -m "✨ feat: aggiunto sistema di combattimento"
git commit -m "🐛 fix: corretto bug selezione multipla"
git commit -m "📚 docs: aggiornato README con nuovi controlli"
git commit -m "♻️ refactor: ottimizzato UnitManager"
git commit -m "⚡ perf: migliorato rendering unità"
```

## 🔗 Collegare a GitHub/GitLab

### GitHub

```bash
# 1. Crea repo su GitHub (web)

# 2. Aggiungi remote
git remote add origin https://github.com/tuousername/secret-mouse.git

# 3. Push del codice
git push -u origin master

# 4. Push successivi
git push
```

### GitLab o Altri

```bash
# Stesso processo, cambia solo l'URL
git remote add origin https://gitlab.com/tuousername/secret-mouse.git
git push -u origin master
```

## 🔍 Comandi di Verifica

```bash
# Vedi tutti i remote configurati
git remote -v

# Vedi info dettagliate sul repository
git show

# Vedi chi ha modificato cosa
git blame src/entities/Unit.ts

# Vedi le differenze tra commit
git diff 66af724 HEAD
```

## 💾 Backup e Sicurezza

### Salvare il Lavoro Temporaneamente

```bash
# Salva modifiche senza commit (stash)
git stash

# Vedi lista stash
git stash list

# Recupera modifiche
git stash pop
```

### Tag per Versioni

```bash
# Crea tag per una versione
git tag -a v0.1.0 -m "Prima versione alpha"

# Vedi tutti i tag
git tag

# Push dei tag
git push origin --tags
```

## 🚨 Situazioni di Emergenza

### Ho committato qualcosa per errore

```bash
# Annulla l'ultimo commit (mantiene modifiche)
git reset --soft HEAD~1

# Annulla l'ultimo commit (elimina modifiche - ATTENZIONE!)
git reset --hard HEAD~1
```

### Ho modificato qualcosa e voglio ricominciare

```bash
# Annulla tutte le modifiche non committate
git reset --hard HEAD
```

### Voglio vedere un vecchio commit

```bash
# Vai a un commit specifico (detached HEAD)
git checkout 66af724

# Torna all'ultimo commit
git checkout master
```

## 📊 .gitignore

Il progetto ha già un `.gitignore` configurato che esclude:
- `node_modules/` (dipendenze npm)
- `dist/` (build produzione)
- `.vscode/` (settings editor)
- `*.log` (file di log)

## 🎯 Best Practices

### ✅ Fai

- ✅ Commit frequenti e piccoli
- ✅ Messaggi di commit descrittivi
- ✅ Pull prima di push (se collabori)
- ✅ Branch per ogni feature
- ✅ Testa prima di committare

### ❌ Evita

- ❌ Commit enormi con 100 file
- ❌ Messaggi generici ("fix", "update")
- ❌ Committare `node_modules/`
- ❌ Force push su branch condivisi
- ❌ Committare credenziali o secrets

## 📚 Risorse Utili

- [Git Docs Ufficiali](https://git-scm.com/doc)
- [GitHub Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Oh Shit, Git!?!](https://ohshitgit.com/) - Guida per situazioni comuni
- [Learn Git Branching](https://learngitbranching.js.org/) - Tutorial interattivo

## 🎉 Prossimi Passi Consigliati

1. **Crea un repository remoto** su GitHub/GitLab
2. **Fai push del codice** per backup cloud
3. **Crea branch `development`** per lavoro quotidiano
4. **Tag v0.1.0** quando hai una versione giocabile
5. **Scrivi un CHANGELOG.md** per tracciare le versioni

---

**Happy Coding con Git! 🚀**

