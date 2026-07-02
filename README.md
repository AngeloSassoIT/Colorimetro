# Sito Colorimetro — landing, supporto e privacy

Sito statico bilingue (inglese default + italiano), senza build step e senza dipendenze:
basta caricarlo così com'è su GitHub Pages, Netlify, Cloudflare Pages o qualsiasi hosting.

## Struttura

```
Website/
├── index.html            Landing inglese (lingua di default)
├── support.html          Pagina di supporto + FAQ (EN)
├── privacy.html          Privacy policy (EN)
├── it/
│   ├── index.html        Landing italiana
│   ├── support.html      Supporto + FAQ (IT)
│   └── privacy.html      Privacy policy (IT)
└── assets/
    ├── css/style.css     Design system del sito (palette dalle anteprime App Store)
    ├── js/main.js        Reveal on scroll + demo campionamento colore + copia HEX
    └── img/              Foto fiore, screenshot app ottimizzati, favicon
```

## Dinamiche psicologiche usate (e dove)

- **Esperienza immediata / effetto dotazione** — la hero contiene una *demo interattiva
  reale*: passando il mouse sul fiore si campiona il colore live e col clic si copia
  l'HEX. Chi prova il gesto ha già "usato" l'app prima di scaricarla.
- **Avversione alla perdita** — la sezione "I tuoi occhi sono bugiardi geniali" apre
  con il problema (ridipingere, riordinare, ristampare = soldi persi) prima della soluzione.
- **Curiosity gap** — headline "Scopri il colore *esatto* di tutto ciò che vedi" +
  badge "Provami — demo dal vivo".
- **Autorità** — sezione scura "Scienza del colore" (grigio 18%, Bradford, LMS, ICC):
  termini tecnici concreti che segnalano competenza.
- **Fiducia / reciprocità** — trust strip subito sotto la hero e sezione "impegno"
  con lo slogan ad-free: zero pubblicità, zero tracciamento, offline, iCloud privato.
- **Onestà come differenziatore** — la FAQ e la sezione scienza ammettono i limiti
  (non è uno spettrofotometro): l'ammissione di un difetto rende credibili i pregi.
- **Riduzione dell'attrito** — CTA ripetuta (hero + fondo pagina), "Gratis", "tra
  trenta secondi saprai il colore della prima cosa che inquadri" (visualizzazione
  del risultato immediato).
- **Fluency** — gerarchia visiva netta, frasi brevi, un solo colore d'accento per sezione.

## Prima della pubblicazione

1. **Link App Store**: i due bottoni "Download on the App Store / Scarica su App Store"
   puntano a `#`. Sostituisci con l'URL reale dell'app (es. `https://apps.apple.com/app/idXXXXXXXXXX`).
2. **Dominio**: aggiorna gli `hreflang` con URL assoluti quando conosci il dominio definitivo.
3. Le email puntano a `support@simplebuild.it`.

## Anteprima locale

La demo di campionamento usa un canvas: servi il sito via HTTP (con `file://` alcuni
browser bloccano la lettura dei pixel).

```bash
cd Website && python3 -m http.server 8080
# poi apri http://localhost:8080
```

## Note

- Foto della gerbera: Wikimedia Commons, licenza CC0 (uso commerciale libero).
- Gli screenshot in `assets/img/` derivano da `AppStore/screenshots/raw-*` (già ottimizzati per il web).
- Nessun cookie, nessun tracker: il sito è coerente con la privacy policy che ospita.
