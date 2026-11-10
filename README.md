# Open Live Lab

**Un laboratorio di live coding nel browser, per imparare a fare musica e
visuali scrivendo codice dal vivo.**

▶ **Provalo subito: [francescocorvi.com/livelab](https://francescocorvi.com/livelab/)**
(niente da installare, serve solo un browser recente).

*English:* Open Live Lab is a browser-based live coding lab for teaching.
Students write [Strudel](https://strudel.cc) patterns for music and
[Hydra](https://hydra.ojack.xyz) sketches for visuals, side by side, then
arrange them on a timeline into a short performance. The interface is
available in Italian, English and Spanish.
[Try it online](https://francescocorvi.com/livelab/).

---

## Il progetto

Open Live Lab nasce per i miei workshop di live coding con studenti alle prime
armi. L'idea è uno strumento unico in cui si impara e si suona insieme:

- **due linguaggi fianco a fianco**: Strudel per il suono e Hydra per
  l'immagine, nella stessa pagina e allo stesso tempo;
- **imparare facendo**: tutorial passo passo in cui ogni idea ha un riquadro
  di codice da eseguire e modificare sul posto;
- **dall'esercizio alla performance**: i frammenti di codice diventano clip su
  una timeline, e la timeline diventa un piccolo live set;
- **la classe insieme**: una lavagna condivisa in cui il docente propone il
  codice e gli studenti lo prendono e consegnano il loro.

È software libero (AGPL): chiunque può usarlo, studiarlo, modificarlo e
installarlo per la propria classe.

## L'app

**TUTORIAL** — percorsi guidati. Suono: ritmo, melodia, contrappunto, ambient,
beat IDM, acid techno, sax. Visuale: primi passi, mescolare e deformare,
webcam, texture, visuali generative, clic e tastiera. Insieme: visuali che
ascoltano il suono.

**LAB** — due editor sempre visibili, VISUALE (Hydra) e SUONO (Strudel).
Cmd/Ctrl+Invio esegue: le visuali riempiono lo sfondo, la musica parte. Nel
codice che suona si accende ciò che si sente.

**ESEMPI** — una libreria di esempi minimi e commentati: dalle basi alla
teoria, giri di accordi, brani di pubblico dominio e generi elettronici
(italo disco, techno, tech house, drum and bass, IDM). Il proprio codice si
salva in cima alla libreria.

**TIMELINE** — una traccia visuale e fino a otto tracce suono su cui disporre
le clip. Le clip possono avere **variabili con inviluppi** disegnati sotto la
traccia e **varianti** suonate a caso o in sequenza a ogni passaggio. Tutte le
tracce suono condividono lo stesso clock e restano sempre a tempo. La
performance si salva e si riapre come file.

**LAVAGNA** — il docente appende schede di codice che tutta la classe vede; gli
studenti consegnano il proprio lavoro con un clic.

E poi:

- **♪ SPARTITO**: il pattern Strudel in notazione tradizionale, sul
  pentagramma;
- **♫ SUONI**: la libreria dei campioni, con forma d'onda e ascolto;
- **? AIUTO**: passando sopra a qualsiasi elemento compare cosa fa; selezionando
  una funzione nel codice compare la sua voce di glossario;
- **console che spiega gli errori** in linguaggio semplice, anche quelli che
  Hydra e Strudel normalmente nascondono;
- **assistente AI locale** (solo nella versione sul proprio computer, con
  [Ollama](https://ollama.com)): crea esempi, spiega il codice, e prova davvero
  ogni blocco che propone prima di mostrarlo;
- **tre lingue** (🌐 in alto a destra, o `?lang=en` / `?lang=es`
  nell'indirizzo) e più temi grafici.

## Sul proprio computer

```bash
git clone https://github.com/fracnesco/open-live-lab.git
cd open-live-lab
./start.sh          # apre http://localhost:8765
```

Serve solo Python 3. Non aprire `index.html` con un doppio clic: i campioni
audio hanno bisogno del piccolo server locale che `start.sh` avvia.

Tutto è incluso nel repository (librerie in `vendor/`, campioni in
`samples/`), quindi l'app funziona anche **senza internet**.

Per l'assistente AI serve Ollama in esecuzione con un modello installato:

```bash
ollama pull gemma3:12b
```

Senza Ollama tutto il resto funziona normalmente.

## Metterlo online per la propria classe

```bash
./build.sh          # produce livelab.zip
```

Lo zip contiene la cartella `livelab/`: va estratto nella radice di un sito
con **HTTPS** (senza, il browser non fa partire l'audio). Per la lavagna serve
PHP 7.2 o successivo, e una password docente: si crea `api/secret.php` sul
server partendo da `api/secret.example.php`. Il docente apre l'app con
`?docente=1` in fondo all'indirizzo per avere i comandi della lavagna.

## Scorciatoie

| Dove | Tasti | Azione |
|---|---|---|
| Editor | Cmd/Ctrl+Invio | esegui |
| Editor | Cmd/Ctrl+. | ferma |
| Editor | Cmd/Ctrl+/ | commenta/scommenta |
| Timeline | Spazio | play / pausa |
| Timeline | Cmd/Ctrl+Z | annulla |
| Timeline | Canc | elimina la clip selezionata |
| Ovunque | ESC | chiudi i pannelli / esci dall'aiuto |

## Licenza e crediti

**Open Live Lab — Copyright (c) 2026 Francesco Corvi.**
Distribuito sotto **GNU Affero General Public License v3.0 o successiva**
(AGPL-3.0-or-later): vedi [LICENSE](LICENSE).

Open Live Lab è costruito su [Strudel](https://strudel.cc)
(AGPL-3.0-or-later) e [hydra-synth](https://github.com/hydra-synth/hydra-synth)
(AGPL-3.0), usati nella stessa pagina: per questo l'app è AGPL. Chi la
modifica e la mette in rete deve pubblicare a sua volta il sorgente delle
proprie modifiche. [CodeMirror 5](https://codemirror.net/5/) e
[abcjs](https://www.abcjs.net) sono MIT.

I campioni audio vengono da
[Dirt-Samples](https://github.com/tidalcycles/Dirt-Samples) (progetto
TidalCycles), tranne `xbreak1/` e `dnb1/`, che vengono da
[Adp-Samples](https://github.com/fracnesco/Adp-Samples).
