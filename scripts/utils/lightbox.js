// Exportation d'une fonction nommée `displayLightbox` qui prend en paramètre un objet `medias`.
export const displayLightbox = medias => {

    // Sélection des éléments du DOM utilisés pour la lightbox.
    const lightboxWrapper = document.querySelector('.lightbox_wrapper');
    const btnClose = document.querySelector('.btn_close_lightbox');
    const btnPrevious = document.querySelector('.btn_previous');
    const btnNext = document.querySelector('.btn_next');
    const lightboxMedia = document.querySelector('.lightbox_media');
    // Récupération de tous les liens dans les cartes de la galerie et conversion en tableau.
    const mediaProvider = Array.from(document.querySelectorAll('.gallery_card a'));

    // Extraction des informations du photographe et des médias depuis l'objet `medias`.
    const photographer = medias.photographer;
    const mediasList = medias.medias;
    // Initialisation de l'indice courant pour naviguer entre les médias.
    let currentIndex = 0;

    // Ajout d'un gestionnaire d'événements pour chaque média qui ouvrira la lightbox au clic.
    mediaProvider.forEach(media => {
        media.addEventListener('click', () => {
            const mediaId = media.dataset.media;
            // Trouver l'indice du média cliqué dans la liste des médias.
            const mediaIndex = mediasList.findIndex(media => media.id == mediaId);
            currentIndex = mediaIndex;
            // Afficher la lightbox et donner le focus au bouton de fermeture.
            lightboxWrapper.style.display = 'flex';
            btnClose.focus();
            // Mise à jour du contenu de la lightbox avec le média courant.
            lightboxTemplate();
        });
    });

    // Fonction pour générer et afficher le contenu du média courant dans la lightbox.
    const lightboxTemplate = () => {
        const currentMedia = mediasList[currentIndex];

        // Insertion de l'image ou de la vidéo dans la lightbox avec un titre.
        lightboxMedia.innerHTML = `
            ${currentMedia.image ? `
            <img src="./assets/images/photographers/samplePhotos-Medium/${photographer.name}/${currentMedia.image}" alt="${currentMedia.alt}">` :
                `<video controls aria-label="${currentMedia.alt}"><source src="./assets/images/photographers/samplePhotos-Medium/${photographer.name}/${currentMedia.video}" type="video/mp4"></video>`}

            <figcaption>${currentMedia.title}</figcaption>
        `;
    };

    // Fonction pour fermer la lightbox et effacer son contenu.
    const closeLightbox = () => {
        lightboxWrapper.style.display = 'none';
        lightboxMedia.innerHTML = '';
    };

    // Fonction pour afficher le média suivant dans la lightbox.
    const nextMedia = () => {
        // Incrémentation de l'indice. Retour à 0 si on dépasse la fin de la liste.
        currentIndex++;
        if (currentIndex > mediasList.length - 1) currentIndex = 0;
        lightboxTemplate();
        // Mettre en évidence brièvement le bouton 'Suivant'.
        showActiveBtn(btnNext);
    };

    // Fonction pour afficher le média précédent dans la lightbox.
    const previousMedia = () => {
        // Décrémentation de l'indice. Retour à la fin si on dépasse le début de la liste.
        currentIndex--;
        if (currentIndex < 0) currentIndex = mediasList.length - 1;
        lightboxTemplate();
        // Mettre en évidence brièvement le bouton 'Précédent'.
        showActiveBtn(btnPrevious);
    };

    // Fonction pour montrer temporairement un effet actif sur le bouton.
    const showActiveBtn = btn => {
        btn.classList.add('active');
        setTimeout(() => btn.classList.remove('active'), 100);
    };

    // Gestionnaire d'événements pour les touches du clavier.
    document.addEventListener('keyup', e => {
        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                previousMedia();
                break;
            case 'ArrowRight':
                nextMedia();
                break;
        };
    });

    // Gestionnaires d'événements pour les boutons de la lightbox.
    btnPrevious.addEventListener('click', () => previousMedia());
    btnNext.addEventListener('click', () => nextMedia());
    btnClose.addEventListener('click', () => closeLightbox());
};
