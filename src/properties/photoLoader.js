// Carica le foto della proprietà attiva direttamente dal filesystem, senza
// bisogno di importarle a mano in ogni pagina.
//
// Convenzione cartelle: src/properties/<id>/assets/photos/<sezione>/[<slot>/]file.ext
// Convenzione nomi file: prefisso libero + "-N.ext" (l'ordine segue il numero,
// non l'ordine alfabetico puro), es. salotto-1.jpeg, salotto-2.jpeg.
//
// - getPhotos("checkin", "porta") -> foto in assets/photos/checkin/porta/
// - getPhotos("apartment", "salotto") -> foto in assets/photos/apartment/salotto/
// - getPhotos("wifi") -> foto direttamente in assets/photos/wifi/ (nessuno slot)
//
// Per aggiungere/aggiornare foto di una proprietà basta mettere i file nella
// cartella giusta con questa convenzione: compaiono in automatico, in ordine,
// senza toccare il codice delle pagine.
const photosContext = require.context(
  `./${process.env.REACT_APP_PROPERTY_ID || "casa-nei-pini"}/assets/photos`,
  true,
  /\.(png|jpe?g|webp)$/
);

const naturalSort = (a, b) => a.localeCompare(b, undefined, { numeric: true });

export function getPhotos(section, slot) {
  const prefix = slot ? `./${section}/${slot}/` : `./${section}/`;

  return photosContext
    .keys()
    .filter((key) => key.startsWith(prefix) && !key.slice(prefix.length).includes("/"))
    .sort(naturalSort)
    .map((key) => photosContext(key));
}
