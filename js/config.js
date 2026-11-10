/* ════════════════════════════════════════════════════════════════════════
   CONFIG — un solo sorgente, due modalità

   Open Live Lab gira in due posti: sul computer del docente (./start.sh, su
   localhost) e online per gli studenti (una sottocartella di un sito con
   HTTPS). È la stessa app: qui si decide, al volo, in quale dei due si trova.

   DEVE ESSERE IL PRIMO SCRIPT DELL'APP. engines.js fa partire initStrudel()
   mentre viene valutato, non su DOMContentLoaded: quando lo fa, questo
   oggetto deve già esistere. Tutto quello che sta qui è quindi sincrono.

   Regola dei percorsi: mai un path che inizi con «/». L'app deve funzionare
   sia servita dalla radice sia da /livelab/ — quindi ogni URL si risolve
   rispetto alla pagina, con document.baseURI.
   ════════════════════════════════════════════════════════════════════════ */

window.LIVELAB = window.LIVELAB || {};

LIVELAB.config = (() => {

  const host = location.hostname;
  const isLocal = host === 'localhost' || host === '127.0.0.1' ||
                  host === '::1' || host === '' || host.endsWith('.local');

  const mode = isLocal ? 'local' : 'hosted';

  /* Dove sta la versione pubblica. Serve alla versione locale per trovare la
     lavagna condivisa (vedi sotto). Con lo slash finale. */
  const ONLINE_URL = 'https://francescocorvi.com/livelab/';

  /* La cartella che contiene index.html, con lo slash finale:
     «http://localhost:8765/» oppure «https://sito.it/livelab/». */
  const baseUrl = new URL('.', document.baseURI).href;

  const url = path => new URL(path, baseUrl).href;

  /* Il docente apre la stessa pagina con ?docente=1 per avere i comandi
     della lavagna. Non è una password: è un interruttore di comodo (la
     password vera la chiede il server quando si scrive). */
  const isTeacher = new URLSearchParams(location.search).has('docente');

  return {
    mode,
    isLocal,
    isTeacher,
    baseUrl,
    url,

    /* Campioni audio. Serviti dalla stessa cartella dell'app: senza questo
       (e senza aver tolto "_base" da strudel.json) l'app ospitata sotto
       /livelab/ cercherebbe /samples/ nella radice del sito, non li
       troverebbe, e non suonerebbe la batteria — in silenzio. */
    samplesUrl: url('samples/strudel.json'),

    /* Assistente AI. Ollama è un programma locale: online non c'è, e
       tentare la chiamata darebbe solo un errore rosso incomprensibile.
       Meglio spegnerlo con un messaggio chiaro. */
    assistant: {
      enabled: isLocal,
      url: 'http://localhost:11434',
      model: 'gemma3:12b',
    },

    /* Lavagna condivisa. È UNA sola: quella online. Anche la versione locale
       del docente le parla, perché start.sh serve solo file e non esegue
       PHP — un «api/board.php» locale non esisterebbe. Così il docente lavora
       sul proprio computer con l'assistente Ollama, e le schede che appende
       arrivano alla classe, che sta sul sito. Il server accetta le origini
       localhost apposta (CORS in board.php). */
    board: {
      apiUrl: isLocal ? ONLINE_URL + 'api/board.php' : url('api/board.php'),
      pollMs: 4000,
    },

    /* Strudel e hydra-synth sono AGPL: pubblicando l'app in rete scatta la
       clausola d'uso di rete e va offerto il sorgente. Il link «sorgente»
       nella barra della console assolve l'obbligo. */
    sourceUrl: 'https://github.com/fracnesco/open-live-lab',
  };
})();
