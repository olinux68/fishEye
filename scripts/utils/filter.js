// Importation des fonctions nécessaires depuis les autres modules
import { displayTotalLikes } from "../utils/likes.js";
import { displayLightbox } from "../utils/lightbox.js";

/**
 * Gère l'ouverture et la fermeture du menu de filtrage des médias.
 */
export const openCloseFilterMenu = () => {
    // Sélection des éléments du DOM nécessaires pour le menu de filtrage
    const filterMenu = document.querySelector(".dropdown_content");
    const filterMenuButton = document.querySelector(".btn_drop");
    const filterButtons = document.querySelectorAll(".dropdown_content button");

    // Ajoute un écouteur d'événement au bouton pour gérer l'ouverture/fermeture
    filterMenuButton.addEventListener("click", () => {
        // Toggle de l'état du menu (ouvert/fermé) et de l'icône associée
        const isExpanded = filterMenuButton.getAttribute("aria-expanded") === "true" || false;
        filterMenuButton.setAttribute("aria-expanded", !isExpanded);
        filterMenu.classList.toggle("curtain_effect");
        document.querySelector(".fa-chevron-up").classList.toggle("rotate");

        // Met à jour l'attribut 'aria-hidden' pour l'accessibilité
        const newAriaHiddenValue = filterMenu.classList.contains("curtain_effect") ? "false" : "true";
        filterMenu.setAttribute("aria-hidden", newAriaHiddenValue);

        // Met à jour l'attribut 'tabindex' des boutons pour la navigation au clavier
        const newTabIndexValue = filterMenu.classList.contains("curtain_effect") ? "0" : "-1";
        filterButtons.forEach(button => button.setAttribute("tabindex", newTabIndexValue));
    });
};

/**
 * Affiche les médias selon le filtre sélectionné.
 * @param {Object} mediasTemplate - Objet contenant les médias et la fonction pour créer les éléments du DOM.
 */
export const displayMediaWithFilter = (mediasTemplate) => {
    // Sélection du filtre courant et de tous les filtres disponibles
    const currentFilter = document.querySelector('#current_filter');
    const allFilters = Array.from(document.querySelectorAll('.dropdown_content li button'));

    // Cache le filtre actuellement sélectionné pour éviter de le sélectionner à nouveau
    let filterAlreadySelected = allFilters.find(filter => filter.textContent == currentFilter.textContent);
    if (filterAlreadySelected) {
        filterAlreadySelected.style.display = 'none';
    }

    // Ajoute des écouteurs d'événements à chaque filtre pour appliquer le tri
    allFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Met à jour le texte du filtre courant et réaffiche le précédent
            currentFilter.textContent = filter.textContent;
            if (filterAlreadySelected) filterAlreadySelected.style.display = 'block';

            filterAlreadySelected = filter;
            filterAlreadySelected.style.display = 'none';

            // Trie les médias selon le filtre sélectionné et met à jour l'affichage
            sortByFilter(filter.textContent, mediasTemplate);
        });
    });
};

/**
 * Trie les médias selon le filtre sélectionné et met à jour l'affichage.
 * @param {string} filterValue - La valeur du filtre sélectionné.
 * @param {Object} mediasTemplate - Objet contenant les médias et la fonction pour créer les éléments du DOM.
 */
const sortByFilter = (filterValue, mediasTemplate) => {
    // Nettoie la valeur du filtre pour éviter les problèmes d'espaces superflus
    filterValue = filterValue.trim();

    // Applique le tri des médias selon le critère choisi : titre, popularité ou date
    switch (filterValue) {
        case 'Titre':
            mediasTemplate.medias.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'Popularité':
            mediasTemplate.medias.sort((a, b) => b.likes - a.likes);
            break;
        case 'Date':
            mediasTemplate.medias.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        default:
            console.error("Critère de tri non reconnu:", filterValue);
            return; // Sort de la fonction si le filtre n'est pas reconnu
    }

    // Recrée les médias dans le DOM après le tri
    mediasTemplate.createPhotographerMedias();

    // Réaffiche la lightbox et le total des likes après le tri
    displayLightbox(mediasTemplate);
    displayTotalLikes();

    // Ferme le menu de filtrage
    document.querySelector('.dropdown_content').classList.remove('curtain_effect');
    document.querySelector('.fa-chevron-up').classList.remove('rotate');
};
