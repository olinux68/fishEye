// Importation de la classe Media de base.
import Media from "./Media.js";

/**
 * La classe Image étend la classe Media pour représenter une image spécifique.
 */
export default class Image extends Media {
    /**
     * Crée une instance de Image.
     * @param {object} data - Les données spécifiques pour l'image, incluant toutes les données pour Media.
     */
    constructor(data) {
        super(data); // Appel du constructeur de la classe parent, Media, avec les données.
        this.image = data.image; // Initialisation de la propriété 'image' spécifique à l'instance Image.
    }
};
