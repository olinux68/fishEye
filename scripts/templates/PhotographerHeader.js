// La classe PhotographerHeader s'occupe de la création et de l'affichage de l'en-tête du profil d'un photographe.
export default class PhotographerHeader {
    // Le constructeur initialise l'instance avec les données du photographe.
    constructor(photographe) {
        this.photographe = photographe;
    }

    // La méthode createPhotographerHeader crée et insère l'en-tête du profil du photographe dans le DOM.
    createPhotographerHeader() {
        // Sélection des éléments du DOM qui seront mis à jour avec les informations du photographe.
        const profilePageHeader = document.querySelector(".main_about");
        const formName = document.querySelector(".modal_form_name");
        const metaDescription = document.querySelector('meta[name="description"]');

        // Mise à jour du nom du photographe dans le formulaire de contact.
        formName.textContent = this.photographe.name;

        // Mise à jour de la meta description de la page avec les informations du photographe.
        if (metaDescription) {
            metaDescription.content = `Découvrez ${this.photographe.name}, photographe professionnel basé à ${this.photographe.city}, ${this.photographe.country} offrant ses services à partir de ${this.photographe.price} € / jour.`;
        }

        // Création du HTML pour l'en-tête avec les informations du photographe.
        const about = `
            <div class="photographer_profile__infos">
                <h1 class="photographer_name">${this.photographe.name}</h1>
                <p class="photographer_location">${this.photographe.city}, ${this.photographe.country}</p>
                <p class="photographer_tagline">${this.photographe.tagline}</p>    
            </div>
            <button class="btn btn_cta" type="button" aria-label="Contactez-moi">Contactez-moi</button>
            <img class="photographer_thumbnail" src="assets/images/photographers/thumbnails/${this.photographe.portrait}" alt="Portrait de ${this.photographe.name}">
        `;

        // Insertion du HTML créé dans l'élément de l'en-tête du profil de la page.
        profilePageHeader.innerHTML = about;

        // La méthode retourne le HTML de l'en-tête pour d'éventuelles utilisations futures.
        return about;
    }
}
