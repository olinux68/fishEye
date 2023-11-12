// Import des modules nécessaires pour le fonctionnement de la page de profil du photographe.
import Api from "../api/Api.js";
import PhotographerHeader from "../templates/PhotographerHeader.js";
import PhotographerMedias from "../templates/PhotographerMedias.js";
import Photographer from "../models/Photographer.js";
import MediasFactory from "../factories/MediasFactory.js";
import { displayTotalLikes } from "../utils/likes.js";
import { openCloseFormContact, validateForm } from "../utils/form.js";
import { openCloseFilterMenu, displayMediaWithFilter } from "../utils/filter.js";
import { displayLightbox } from "../utils/lightbox.js";

// Initialisation de l'API pour récupérer les données des photographes.
const photographersApi = new Api("./data/photographers.json");

// Extraction de l'ID du photographe depuis l'URL pour charger les données correspondantes.
const photographerId = new URLSearchParams(window.location.search).get("id");

// Fonction pour obtenir les données détaillées d'un photographe par son ID.
export const getPhotographerById = async () => {
    // Récupération des données complètes via l'API.
    const { photographers, media } = await photographersApi.get();

    // Création d'instances de Photographer pour chaque photographe dans les données récupérées.
    const photographerInstances = photographers.map(photographer => new Photographer(photographer));
    // Recherche de l'instance correspondant à l'ID récupéré dans l'URL.
    const photographer = photographerInstances.find(photographer => photographer.id == photographerId);

    // Création d'instances de médias et filtrage pour correspondre au photographe sélectionné.
    const mediasInstances = media.map(media => new MediasFactory(media));
    const medias = mediasInstances.filter(media => media.photographerId == photographerId);

    return { photographer, medias };
};

// Fonction principale pour construire et afficher la page de profil.
const displayProfilePage = async () => {
    // Obtention des données du photographe et de ses médias.
    const { photographer, medias } = await getPhotographerById();

    // Création et insertion de l'en-tête du photographe dans le DOM.
    const headerTemplate = new PhotographerHeader(photographer);
    headerTemplate.createPhotographerHeader();

    // Création et insertion des médias du photographe dans le DOM.
    const mediasTemplate = new PhotographerMedias(photographer, medias);
    mediasTemplate.createPhotographerMedias();

    // Affichage et mise à jour du total des likes.
    displayTotalLikes();

    // Initialisation des événements pour le formulaire de contact.
    openCloseFormContact();

    // Mise en place de la validation du formulaire.
    validateForm();

    // Initialisation des événements pour le menu de filtrage des médias.
    openCloseFilterMenu();
    // Affichage des médias avec application des filtres.
    displayMediaWithFilter(mediasTemplate);

    // Initialisation et affichage de la lightbox pour la visualisation des médias.
    displayLightbox(mediasTemplate);
};

// Appel de la fonction d'affichage pour initialiser la page.
displayProfilePage();
