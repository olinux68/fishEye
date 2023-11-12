// Variable pour stocker le nom du photographe sélectionné
let photographerName = '';

// Fonction pour ouvrir et fermer le formulaire de contact
export const openCloseFormContact = () => {
    // Sélection des éléments du DOM pour le bouton de contact, le modal et le bouton de fermeture
    const contactBtn = document.querySelector(".btn_cta");
    const contactModal = document.querySelector(".modal_wrapper");
    const closeModal = document.querySelector(".btn_close");

    // Ajout d'un écouteur d'événements pour ouvrir le modal de contact
    contactBtn.addEventListener("click", () => {
        contactModal.style.display = "flex"; // Affichage du modal
        closeModal.focus(); // Mise en focus du bouton de fermeture pour accessibilité
        photographerName = document.querySelector('h1').textContent; // Mise à jour du nom du photographe
    });

    // Ajout d'un écouteur d'événements pour fermer le modal de contact
    closeModal.addEventListener("click", () => contactModal.style.display = "none");
};

// Fonction pour valider le formulaire de contact
export const validateForm = () => {
    // Sélection des champs du formulaire
    const form = document.querySelector('.modal_form form');
    const firstName = document.querySelector("#firstname");
    const lastName = document.querySelector("#lastname");
    const email = document.querySelector("#email");
    const message = document.querySelector("#message");

    // Ajout de gestionnaires d'événements pour la validation des champs lorsqu'ils perdent le focus
    firstName.addEventListener('blur', () => validateField(firstName));
    lastName.addEventListener('blur', () => validateField(lastName));
    email.addEventListener('blur', () => validateField(email));
    message.addEventListener('blur', () => validateField(message));

    // Gestion de la soumission du formulaire
    form.addEventListener('submit', e => {
        e.preventDefault(); // Empêcher le comportement de soumission par défaut

        let isFormValid = true; // Variable pour suivre l'état de validation du formulaire

        // Boucle sur chaque champ pour valider et ajuster isFormValid en conséquence
        [firstName, lastName, email, message].forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            // Actions à effectuer si le formulaire est valide
            const formDatas = {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                message: message.value,
            };
            console.log(JSON.stringify(formDatas)); // Affichage des données du formulaire

            // Réinitialisation des champs du formulaire après la soumission
            form.reset();
            document.querySelectorAll('.formField').forEach(input => input.classList.remove('invalid', 'valid'));
            console.log(`Formulaire soumis pour : ${photographerName}`);
        }
    });
};

// Fonction pour valider les champs individuels du formulaire
const validateField = (input) => {
    // Expressions régulières pour la validation des champs
    const regexName = /^([A-Za-zÀ-ÖØ-öø-ÿ\s]{3,15})?([-]{0,1})?([A-Za-zÀ-ÖØ-öø-ÿ\s]{3,15})$/;
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regexMessage = /^[A-Za-z0-9\s.,!?'"()À-ÖØ-öø-ÿ-]{20,200}$/;

    // Sélection de l'expression régulière appropriée en fonction de l'id du champ
    let regex;
    if (input.id === "firstname" || input.id === "lastname") {
        regex = regexName;
    } else if (input.id === "email") {
        regex = regexEmail;
    } else if (input.id === "message") {
        regex = regexMessage;
    }

    // Validation du champ avec l'expression régulière appropriée
    const isValid = regex.test(input.value);
    const messageProvider = input.nextElementSibling; // Élément pour afficher les messages d'erreur

    // Vérification et message d'erreur spécifique pour le champ 'message'
    if (input.id === "message" && (input.value.length < 20 || input.value.length > 200)) {
        messageProvider.textContent = "Le message doit contenir entre 20 et 200 caractères.";
        input.classList.remove('valid');
        input.classList.add('invalid');
        return false; // Retourne false si le champ n'est pas valide
    }

    // Application de classes CSS pour la validation visuelle des champs
    if (isValid) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        messageProvider.textContent = "";
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
        messageProvider.textContent = "Format non valide";
    }

    return isValid; // Retourne true si le champ est valide
};
