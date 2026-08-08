# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Multi-tenant: più appartamenti sulla stessa codebase

Il codice (pagine, componenti, layout) è condiviso tra tutti gli appartamenti.
Tutto ciò che cambia da un appartamento all'altro vive sotto `src/properties/<id>/`:

- `translations/{it,en,fr,es,de}.js` — tutti i testi mostrati nell'app.
- `config.js` — dati non testuali (posizione GPS, link Google Maps, ecc.).
- `nearbyPlaces.js` — ristoranti/spiagge/negozi nei dintorni.

`src/properties/index.js` sceglie l'appartamento attivo leggendo la env var
`REACT_APP_PROPERTY_ID` (default `casa-nei-pini`) e la usa in build/dev.

### Aggiungere un nuovo appartamento

1. Duplica una cartella esistente, es. `src/properties/vista-dai-pini/` → `src/properties/nuovo-id/`.
2. Aggiorna testi, `config.js` e `nearbyPlaces.js`.
3. Registra la nuova proprietà in `src/properties/index.js`.
4. Su Vercel, crea un nuovo progetto collegato alla stessa repo (stesso branch),
   con env var proprie:
   - `REACT_APP_PROPERTY_ID=nuovo-id`
   - `BOOKING_ICAL_URL`, `AIRBNB_ICAL_URL` (usate da `api/availability.js`)

### Foto

Le foto vivono in `src/properties/<id>/assets/photos/<sezione>/[<slot>/]`,
nominate `<slot>-1.ext`, `<slot>-2.ext`, ... Vengono caricate in automatico da
`src/properties/photoLoader.js` tramite `getPhotos(sezione, slot)`: basta
mettere i file nella cartella giusta, senza toccare il codice delle pagine.

Esempi:
- `apartment/salotto/salotto-1.jpeg` → `getPhotos("apartment", "salotto")`
- `checkin/porta/porta-1.png` → `getPhotos("checkin", "porta")`

Per un nuovo appartamento senza foto ancora pronte, basta creare le cartelle
vuote (anche solo con `.gitkeep`) sotto `src/properties/<id>/assets/photos/`:
la build non si rompe, semplicemente non mostra foto finché non le aggiungi.

### Host e avatar

Gli host (nome, telefono, link WhatsApp) sono già testo nelle `translations/*`,
quindi già liberi di cambiare per proprietà, incluso l'`id` usato per associare
la foto profilo. Le foto stesse vivono in `src/properties/<id>/assets/avatars/`,
nominate `<id>.ext` (es. `matteo.jpg` per `{ type: "tel", id: "matteo", ... }`),
caricate da `src/contactAvatars.js`.

### Logo

`src/properties/<id>/assets/branding/logo.png` è il logo mostrato in header,
caricato da `src/properties/branding.js`. Basta sostituire il file per
proprietà.

### Limite noto: favicon e icone PWA

`public/favicon.ico`, `public/logo192.png`, `public/logo512.png` e
`public/manifest.json` sono ancora condivisi tra tutte le proprietà: CRA li
serve staticamente dalla cartella `public/`, che non passa dal meccanismo
`REACT_APP_PROPERTY_ID` usato per il resto. Se serve differenziarli per
appartamento, si può fare con l'interpolazione `%REACT_APP_PROPERTY_ID%` in
`public/index.html`/`manifest.json` puntando a `public/branding/<id>/...`,
ma non l'ho implementato: è cosmetico (tab del browser / icona PWA) e a basso
impatto rispetto al resto.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
