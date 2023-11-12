// La classe PhotographerMedias s'occupe de la création et de l'affichage des médias d'un photographe.
export default class PhotographerMedias {
    constructor(photographer, medias) {
        this.photographer = photographer;
        this.medias = medias;
    }

    // La méthode createPhotographerMedias construit et affiche la galerie de médias.
    createPhotographerMedias() {
        const profilePageContent = document.querySelector(".main_content_medias");
        const content = this.buildGalleryHtml();
        profilePageContent.innerHTML = content;
        return content;
    }

    // Méthode privée pour construire le HTML de la galerie de médias.
    buildGalleryHtml() {
        const galleryHtml = this.medias.map(media => this.buildMediaHtml(media)).join("");
        return `
            <section class="gallery">
                ${galleryHtml}
            </section>
            ${this.buildAsideHtml()}
        `;
    }

    // Méthode privée pour construire le HTML pour un média individuel.
    buildMediaHtml(media) {
        const mediaContent = media.image
            ? `<img class="gallery_thumbnail" src="./assets/images/photographers/samplePhotos-Small/${this.photographer.name}/${media.image}" alt="${media.alt}">`
            : `<video class="gallery_thumbnail" aria-label="${media.alt}">
                   <source src="./assets/images/photographers/samplePhotos-Small/${this.photographer.name}/${media.video}" type="video/mp4">
               </video>`;
        return `
            <article class="gallery_card">
                <a href="#" data-media=${media.id} role="link" aria-label="View media large">
                    <figure>${mediaContent}</figure>
                </a>
                <figcaption>
                    <h2>${media.title}</h2>
                    <div role="group" aria-label="Like button and number of likes">
                        <span class="nbLike">${media.likes}</span> 
                        <button class="btn_like" type="button" aria-label="Like" data-id="${media.id}">
                            <span class="fas fa-heart" aria-hidden="true"></span>
                        </button> 
                    </div>
                </figcaption>
            </article>
        `;
    }

    // Méthode privée pour construire le HTML pour la section 'aside'.
    buildAsideHtml() {
        return `
            <aside>
                <p class="photographer_Likes">
                    <span class="photographer_likes_count"></span>
                    <span class="fas fa-heart" aria-hidden="true"></span>
                </p>
                <span>${this.photographer.price}€ / jour</span>
            </aside>
        `;
    }
}
