// Importation des modules nécessaires.
import Api from "../api/Api.js"; // Module pour interagir avec l'API ou source de données.
import Photographer from "../models/Photographer.js"; // Classe représentant le modèle de données pour un photographe.
import PhotographerCard from "../templates/index.js"; // Classe pour créer le template HTML d'une carte de photographe.

// Sélection de l'élément du DOM où les cartes des photographes seront insérées.
const photographersSection = document.querySelector(".main_photographers");

// Création d'une instance de l'API en spécifiant le chemin vers le fichier JSON des photographes.
const photographersApi = new Api("./data/photographers.json");

/**
 * Affiche les cartes de chaque photographe dans la section prévue à cet effet.
 */
const displayPhotographers = async () => {
    // Récupération des données des photographes de manière asynchrone.
    const photographersData = await photographersApi.get();
    // Accès au tableau des photographes dans les données récupérées.
    const photographers = photographersData.photographers;

    // Transformation de chaque donnée de photographe en une instance de la classe Photographer,
    // puis création d'une carte pour chacun et ajout au DOM.
    photographers
        .map(photographer => new Photographer(photographer)) // Création des instances de Photographer.
        .forEach(photographer => {
            const template = new PhotographerCard(photographer); // Création du template de la carte.
            const photographerCard = template.createPhotographerCard(); // Génération de la carte du photographe.
            photographersSection.appendChild(photographerCard); // Ajout de la carte dans la section du DOM.
        });
};

// Appel de la fonction pour afficher les photographes.
displayPhotographers();
