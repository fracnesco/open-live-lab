#!/bin/bash
# ══════════════════════════════════════════════════════════════════════════
# Open Live Lab — prepara la versione da mettere online
#
# Produce dist/ e livelab.zip. Dentro lo zip tutto sta sotto livelab/: si
# carica e si estrae nella RADICE del sito, e i file finiscono da soli in
# livelab/. Sbagliando cartella nasce al massimo una livelab/livelab/
# innocua, invece di un .htaccess che sovrascrive quello del sito.
#
# Non minifica e non fa bundling: l'app è didattica e gli studenti devono
# poter aprire "vedi sorgente" e leggerla.
#
# L'app non ha modalità da "compilare": js/config.js riconosce da solo se sta
# girando su localhost o su un sito. Questo script si limita a copiare i file
# giusti e a lasciar fuori quelli che sul server non servono.
# ══════════════════════════════════════════════════════════════════════════
set -euo pipefail
cd "$(dirname "$0")"

OUT="dist"
# dist/ rispecchia la radice del sito: l'app sta in dist/livelab/.
APP="$OUT/livelab"
ZIP="livelab.zip"

rm -rf "$OUT" "$ZIP"
mkdir -p "$APP"

# Roba dell'app: tutto ciò che il browser deve poter scaricare.
cp index.html LICENSE "$APP"/
cp -R css js vendor samples "$APP"/

# La lavagna (serve PHP). api/secret.php NON va nello zip: contiene l'hash
# della password docente e sul server si crea una volta, a mano.
# data/ deve esistere con il suo .htaccess, ma vuota.
mkdir -p "$APP/api" "$APP/data"
for f in api/*.php; do
  [ "$(basename "$f")" = "secret.php" ] && continue
  cp "$f" "$APP/api/"
done
cp data/.htaccess "$APP/data/.htaccess"

# .htaccess sta in deploy/ perché nella cartella di lavoro darebbe fastidio
# al server di sviluppo di start.sh. Finisce in livelab/, MAI un livello più
# su: alla radice del dominio sostituirebbe quello del sito.
cp deploy/.htaccess "$APP"/.htaccess

find "$OUT" -name '.DS_Store' -delete

# Un solo zip da caricare ed estrarre dal pannello dell'hosting: i .wav
# caricati uno per uno via FTP sono lenti e il trasferimento può
# interrompersi a metà, lasciando campioni mancanti che falliscono in silenzio.
( cd "$OUT" && zip -q -r -X "../$ZIP" livelab )

echo "✓ dist/     $(du -sh "$OUT" | cut -f1)"
echo "✓ $ZIP  $(du -sh "$ZIP" | cut -f1)"
command -v open >/dev/null && open -R "$ZIP"
echo
echo "Carica $ZIP nella radice del sito ed estrailo lì: la cartella livelab/"
echo "è già dentro lo zip. Poi apri https://<sito>/livelab/."
echo
echo "Al primo deploy crea sul server api/secret.php partendo da"
echo "api/secret.example.php:"
echo "  php -r 'echo password_hash(\"la-tua-password\", PASSWORD_DEFAULT);'"
echo "Senza, la lavagna è in sola lettura."
