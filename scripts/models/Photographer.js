/**
 * La classe Photographer représente un photographe avec ses détails personnels et professionnels.
 */
export default class Photographer {
    /**
     * Crée une nouvelle instance de Photographer avec les données spécifiées.
     * @param {object} data - Un objet contenant les informations du photographe.
     */
    constructor(data) {
        this.name = data.name; // Le nom complet du photographe.
        this.id = data.id; // L'identifiant unique du photographe.
        this.city = data.city; // La ville de résidence du photographe.
        this.country = data.country; // Le pays de résidence du photographe.
        this.tagline = data.tagline; // La phrase d'accroche associée au photographe.
        this.price = data.price; // Le tarif journalier ou horaire du photographe.
        this.portrait = data.portrait; // Le chemin d'accès à la photo de profil du photographe.
    }
}
