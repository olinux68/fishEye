// La classe PhotographerCard sert à créer une représentation HTML d'un photographe sous forme de carte.
export default class PhotographerCard {
    // Le constructeur prend un objet photographe pour initialiser l'instance de la classe.
    constructor(photographer) {
        this.photographer = photographer;
    }

    // La méthode createPhotographerCard génère le HTML pour la carte du photographe.
    createPhotographerCard() {
        // Création d'un élément article qui va contenir la carte.
        const article = document.createElement('article');

        // Utilisation de template literals pour construire le HTML de la carte.
        // Les informations du photographe sont intégrées dynamiquement dans le HTML.
        const photographerCard = `
            <a href="photographer.html?id=${this.photographer.id}" role="link" aria-label="Voir le profil de ${this.photographer.name}">
                <img class="photographer_thumbnail" src="./assets/images/photographers/thumbnails/${this.photographer.portrait}" alt="Portrait de ${this.photographer.name}">
                <h2 class="photographer_name">${this.photographer.name}</h2>
            </a>
            <p class="photographer_location">${this.photographer.city}, ${this.photographer.country}</p>
            <p class="photographer_tagline">${this.photographer.tagline}</p>
            <span class="photographer_price">${this.photographer.price}€/jour</span>
        `;

        // L'inner HTML de l'article est défini par la chaîne de caractères photographerCard.
        article.innerHTML = photographerCard;

        // La méthode retourne l'élément article qui peut être ajouté au DOM.
        return article;
    }
}
