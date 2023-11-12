// Importation de la classe Media, qui est la classe de base pour Video.
import Media from "./Media.js";

/**
 * La classe Video étend la classe Media pour gérer les spécificités des objets vidéo.
 */
export default class Video extends Media {
    /**
     * Constructeur de la classe Video.
     * @param {object} data - Les données spécifiques à la vidéo ainsi que les données communes de Media.
     */
    constructor(data) {
        super(data); // Appel au constructeur de la classe parent pour initialiser les propriétés communes.
        this.video = data.video; // Propriété spécifique à l'instance Video contenant le chemin du fichier vidéo.
    }
};
