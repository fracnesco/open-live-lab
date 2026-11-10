#!/bin/bash
# ══════════════════════════════════════════════════════════════════════════
# Open Live Lab — avvio del laboratorio di live coding
#
# Serve l'app su http://localhost:8765 e apre il browser.
# L'app funziona anche offline; l'assistente AI richiede Ollama attivo
# (https://ollama.com — `ollama serve` parte da solo con l'app desktop).
# ══════════════════════════════════════════════════════════════════════════
cd "$(dirname "$0")"

PORT="${1:-8765}"

# Se la porta è già occupata da una run precedente, riusala.
if lsof -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Open Live Lab già attivo su http://localhost:$PORT — apro il browser."
  open "http://localhost:$PORT"
  exit 0
fi

echo "Open Live Lab → http://localhost:$PORT   (ctrl+C per fermare)"
( sleep 1; open "http://localhost:$PORT" ) &
# Il server di Python non manda Cache-Control: il browser decide da solo di
# tenersi in cache JS e CSS, e dopo una modifica continua a mostrare la
# versione vecchia. Qui ogni risposta dice «no-store»: ricaricando la pagina
# si vede sempre il codice che c'è su disco. (Online ci pensa l'.htaccess.)
exec python3 - "$PORT" <<'PYSERVER'
import sys
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

class NoCache(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, max-age=0")
        super().end_headers()
    def send_head(self):
        # Un browser che ha già una copia chiede «è cambiato da…?» e si
        # accontenta di un 304. Togliendo la domanda, la risposta è sempre il file.
        for h in ("If-Modified-Since", "If-None-Match"):
            if h in self.headers:
                del self.headers[h]
        return super().send_head()

ThreadingHTTPServer(("127.0.0.1", int(sys.argv[1])), NoCache).serve_forever()
PYSERVER
