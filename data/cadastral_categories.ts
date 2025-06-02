export interface CategoriaCatastale {
    codice: string;
    descrizione: string;
    coefficiente?: number;
    note?: string;
  }
  
  export const categorieAtastali: CategoriaCatastale[] = [
    // Gruppo A - Abitazioni
    { codice: "A/1", descrizione: "Abitazione di tipo signorile", coefficiente: 160, note: "Soggetta a IMU anche se abitazione principale" },
    { codice: "A/2", descrizione: "Abitazione di tipo civile", coefficiente: 160 },
    { codice: "A/3", descrizione: "Abitazione di tipo economico", coefficiente: 160 },
    { codice: "A/4", descrizione: "Abitazione di tipo popolare", coefficiente: 160 },
    { codice: "A/5", descrizione: "Abitazione di tipo ultrapopolare (obsoleta)", coefficiente: 160 },
    { codice: "A/6", descrizione: "Abitazione di tipo rurale", coefficiente: 160 },
    { codice: "A/7", descrizione: "Abitazione in villini", coefficiente: 160 },
    { codice: "A/8", descrizione: "Abitazione in ville", coefficiente: 160, note: "Soggetta a IMU anche se abitazione principale" },
    { codice: "A/9", descrizione: "Castelli, palazzi di eminenti pregi artistici", coefficiente: 160, note: "Sempre soggetta a IMU" },
    { codice: "A/10", descrizione: "Uffici e studi privati", coefficiente: 80 },
    { codice: "A/11", descrizione: "Abitazioni e alloggi tipici dei luoghi", coefficiente: 160 },
  
    // Gruppo B - Edifici a uso collettivo
    { codice: "B/1", descrizione: "Collegi e convitti, educandati, ricoveri, orfanotrofi", coefficiente: 140 },
    { codice: "B/2", descrizione: "Case di cura e ospedali (se non in cat. D/4)", coefficiente: 140 },
    { codice: "B/3", descrizione: "Prigioni e riformatori", coefficiente: 140 },
    { codice: "B/4", descrizione: "Uffici pubblici", coefficiente: 140 },
    { codice: "B/5", descrizione: "Scuole, laboratori scientifici, biblioteche", coefficiente: 140 },
    { codice: "B/6", descrizione: "Biblioteche, pinacoteche, musei, gallerie", coefficiente: 140 },
    { codice: "B/7", descrizione: "Cappelle e oratori non destinati al culto pubblico", coefficiente: 140 },
    { codice: "B/8", descrizione: "Magazzini sotterranei per depositi derrate", coefficiente: 140 },
  
    // Gruppo C - Edifici a destinazione ordinaria commerciale
    { codice: "C/1", descrizione: "Negozi e botteghe", coefficiente: 55 },
    { codice: "C/2", descrizione: "Magazzini e locali di deposito", coefficiente: 160 },
    { codice: "C/3", descrizione: "Laboratori per arti e mestieri", coefficiente: 140 },
    { codice: "C/4", descrizione: "Fabbricati e locali per esercizi sportivi", coefficiente: 140 },
    { codice: "C/5", descrizione: "Stabilimenti balneari e di acque curative", coefficiente: 140 },
    { codice: "C/6", descrizione: "Stalle, scuderie, rimesse, autorimesse", coefficiente: 160 },
    { codice: "C/7", descrizione: "Tettoie chiuse o aperte", coefficiente: 160 },
  
    // Gruppo D - Immobili a destinazione speciale
    { codice: "D/1", descrizione: "Opifici", coefficiente: 65 },
    { codice: "D/2", descrizione: "Alberghi e pensioni", coefficiente: 65 },
    { codice: "D/3", descrizione: "Teatri, cinematografi, sale per concerti", coefficiente: 65 },
    { codice: "D/4", descrizione: "Case di cura e ospedali privati", coefficiente: 65 },
    { codice: "D/5", descrizione: "Istituti di credito, cambio, assicurazione", coefficiente: 80 },
    { codice: "D/6", descrizione: "Fabbricati e locali per esercizi sportivi", coefficiente: 65 },
    { codice: "D/7", descrizione: "Fabbricati costruiti per speciali esigenze industriali", coefficiente: 65 },
    { codice: "D/8", descrizione: "Fabbricati costruiti per le speciali esigenze di un'attività commerciale", coefficiente: 65 },
    { codice: "D/9", descrizione: "Edifici galleggianti o sospesi assicurati a punti fissi", coefficiente: 65 },
    { codice: "D/10", descrizione: "Fabbricati per funzioni produttive connesse alle attività agricole", coefficiente: 65 },
  
    // Gruppo E - Immobili a destinazione particolare
    { codice: "E/1", descrizione: "Stazioni per servizi di trasporto terrestri, marittimi, aerei", coefficiente: 80 },
    { codice: "E/2", descrizione: "Ponti comunali e provinciali soggetti a pedaggio", coefficiente: 80 },
    { codice: "E/3", descrizione: "Costruzioni e fabbricati per esigenze pubbliche", coefficiente: 80 },
    { codice: "E/4", descrizione: "Recinti chiusi per speciali esigenze pubbliche", coefficiente: 80 },
    { codice: "E/5", descrizione: "Costruzioni adibite al culto pubblico", coefficiente: 80 },
    { codice: "E/6", descrizione: "Fabbricati e costruzioni per speciali esigenze pubbliche", coefficiente: 80 },
    { codice: "E/7", descrizione: "Fabbricati costruiti per l'esercizio pubblico dei culti", coefficiente: 80 },
    { codice: "E/8", descrizione: "Fabbricati e costruzioni nei cimiteri", coefficiente: 80 },
    { codice: "E/9", descrizione: "Edifici a destinazione particolare non compresi nelle altre categorie", coefficiente: 80 },
  
    // Gruppo F - Entità urbane
    { codice: "F/1", descrizione: "Area urbana", note: "Non produce reddito" },
    { codice: "F/2", descrizione: "Unità collabenti", note: "Non soggetta a IMU se dichiarata inagibile" },
    { codice: "F/3", descrizione: "Unità in corso di costruzione", note: "Soggetta a IMU solo se abitabile" },
    { codice: "F/4", descrizione: "Unità in corso di definizione", note: "Classificazione temporanea" },
    { codice: "F/5", descrizione: "Lastrico solare", note: "Generalmente trattato come area edificabile per IMU" },
    { codice: "F/6", descrizione: "Fabbricato dichiarato inagibile totalmente o parzialmente", note: "Escluso dal calcolo IMU se certificato" }
  ];