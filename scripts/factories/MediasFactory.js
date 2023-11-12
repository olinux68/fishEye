// Importation des classes Image et Video depuis le dossier des modèles.
import Image from '../models/Image.js'
import Video from '../models/Video.js'

/**
 * La classe MediasFactory est utilisée pour créer une instance de média appropriée
 * en fonction du type de données reçues. Elle supporte la création d'images et de vidéos.
 */
export default class MediasFactory {
    /**
     * Le constructeur prend un objet 'data' et détermine le type de média à créer.
     * @param {object} data - Les données nécessaires pour créer un média.
     */
    constructor(data) {
        // Si l'objet 'data' contient une clé 'image', crée une nouvelle instance de Image.
        if (data.image) {
            return new Image(data)
        }
        // Si l'objet 'data' contient une clé 'video', crée une nouvelle instance de Video.
        else if (data.video) {
            return new Video(data)
        }
        // Si aucun des types connus n'est trouvé, lève une exception.
        else {
            throw 'Unknown data type'
        }
    }
}
