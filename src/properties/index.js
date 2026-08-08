import casaNeiPiniConfig from "./casa-nei-pini/config";
import casaNeiPiniTranslations from "./casa-nei-pini/translations";
import casaNeiPiniNearbyPlaces from "./casa-nei-pini/nearbyPlaces";
import vistaDaiPiniConfig from "./vista-dai-pini/config";
import vistaDaiPiniTranslations from "./vista-dai-pini/translations";
import vistaDaiPiniNearbyPlaces from "./vista-dai-pini/nearbyPlaces";

const properties = {
  "casa-nei-pini": {
    config: casaNeiPiniConfig,
    translations: casaNeiPiniTranslations,
    nearbyPlaces: casaNeiPiniNearbyPlaces,
  },
  "vista-dai-pini": {
    config: vistaDaiPiniConfig,
    translations: vistaDaiPiniTranslations,
    nearbyPlaces: vistaDaiPiniNearbyPlaces,
  },
};

// Scelta della proprietà attiva: impostata a build/deploy time tramite
// la env var REACT_APP_PROPERTY_ID (default: casa-nei-pini). Su Vercel,
// i due appartamenti sono due progetti separati collegati alla stessa repo,
// ognuno con questa env var impostata al proprio id.
const PROPERTY_ID =
  process.env.REACT_APP_PROPERTY_ID && properties[process.env.REACT_APP_PROPERTY_ID]
    ? process.env.REACT_APP_PROPERTY_ID
    : "casa-nei-pini";

const activeProperty = properties[PROPERTY_ID];

export const propertyId = PROPERTY_ID;
export const config = activeProperty.config;
export const translations = activeProperty.translations;
export const nearbyPlaces = activeProperty.nearbyPlaces;
