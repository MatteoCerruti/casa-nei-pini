// Mappa id contatto → foto profilo, usata dal badge dei numeri da chiamare.
// Le foto vivono in src/properties/<id>/assets/avatars/<contactId>.ext: il
// nome del file (senza estensione) deve combaciare con l'id usato nelle
// translations (es. { type: "tel", id: "matteo", ... } -> avatars/matteo.jpg).
const avatarsContext = require.context(
  `./properties/${process.env.REACT_APP_PROPERTY_ID || "casa-nei-pini"}/assets/avatars`,
  false,
  /\.(png|jpe?g|webp)$/
);

const contactAvatars = {};
avatarsContext.keys().forEach((key) => {
  const id = key.replace("./", "").replace(/\.[^.]+$/, "");
  contactAvatars[id] = avatarsContext(key);
});

export default contactAvatars;
