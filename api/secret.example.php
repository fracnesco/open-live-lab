<?php
/* ══════════════════════════════════════════════════════════════════════════
   PASSWORD DOCENTE — modello

   Copia questo file in  api/secret.php  e sostituisci l'hash con il tuo.
   secret.php NON va su git (è nel .gitignore): è l'unica cosa che impedisce
   a uno studente di cancellare la lavagna.

   Per generare l'hash della tua password, da terminale:

       php -r 'echo password_hash("la-tua-password", PASSWORD_DEFAULT), "\n";'

   Poi incolla qui sotto la riga che esce (comprese le virgolette).
   ══════════════════════════════════════════════════════════════════════════ */

return '$2y$12$SOSTITUISCI.QUESTO.CON.IL.TUO.HASH.GENERATO.CON.password_hash';
