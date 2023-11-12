/**
 * La classe Media sert de classe de base pour représenter des médias génériques.
 * Elle contient des informations communes utilisées par tous les types de médias.
 */
export default class Media {
    /**
     * Construit une nouvelle instance de Media avec les données fournies.
     * @param {object} data - L'objet contenant les propriétés du média.
     */
    constructor(data) {
        this.id = data.id; // Identifiant unique du média
        this.photographerId = data.photographerId; // Identifiant unique du photographe associé au média
        this.title = data.title; // Titre du média
        this.likes = data.likes; // Nombre de "j'aime" associés au média
        this.date = data.date; // Date de publication du média
        this.price = data.price; // Prix du média
        this.alt = data.alt; // Texte alternatif pour l'accessibilité et le référencement
    }
};
