// Importation de la fonction getPhotographerById depuis un autre module
import { getPhotographerById } from "../pages/photographerPage.js";

// Fonction asynchrone pour afficher le total des likes
export const displayTotalLikes = async () => {
    // Récupération des médias du photographe par son ID
    const { medias } = await getPhotographerById();
    // Sélection de tous les boutons de like
    const allBtnLike = document.querySelectorAll(".btn_like");
    // Sélection de l'élément DOM qui affiche le total des likes
    const likesElement = document.querySelector(".photographer_likes_count");

    // Fonction pour mettre à jour le total des likes
    const updateTotalLikes = () => {
        // Calcul du total des likes en additionnant les likes de chaque média
        const totalLikes = medias.reduce((acc, media) => acc + media.likes, 0);
        // Mise à jour de l'élément texte avec le total des likes
        likesElement.textContent = `${totalLikes}`;
    };

    // Appel initial pour définir le total des likes dès le chargement de la page
    updateTotalLikes();

    // Boucle sur chaque bouton de like
    allBtnLike.forEach(btn => {
        // Ajout d'un écouteur d'événement sur le clic du bouton
        btn.addEventListener("click", () => {
            // Recherche du média associé au bouton sur lequel on a cliqué
            const media = medias.find(media => media.id == btn.dataset.id);

            // Si le bouton n'est pas déjà 'liké', on incrémente le nombre de likes, sinon on le décrémente
            !btn.classList.contains("liked") ? media.likes++ : media.likes--;

            // On bascule la classe 'liked' pour changer l'état visuel du bouton
            btn.classList.toggle("liked");

            // Mise à jour de l'affichage des likes pour ce média particulier
            const likesElement = btn.previousElementSibling;
            likesElement.textContent = `${media.likes}`;

            // Mise à jour de l'affichage du total des likes après chaque clic
            updateTotalLikes();
        });
    });
};
