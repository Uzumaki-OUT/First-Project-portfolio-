document.addEventListener('DOMContentLoaded', () => {
    // --- Hamburger Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('nav ul');

    function toggleMenu() {
        navMenu.classList.toggle('active');
    }

    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });

    // --- Projects Filter ---
    window.filterProjects = function (category) {
        const projects = document.querySelectorAll('#projects article');

        projects.forEach(project => {
            if (category === 'all' || project.dataset.category === category) {
                project.style.display = 'flex';
            } else {
                project.style.display = 'none';
            }
        });
    };

    // Filter buttons active state
    const filterButtons = document.querySelectorAll('#projectFilters button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // --- Lightbox Modal ---
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const closeLightboxBtn = document.getElementById('closeLightbox');

    function openLightbox(src, alt) {
        lightboxImage.src = src;
        lightboxImage.alt = alt || 'Expanded project image';
        lightboxModal.classList.add('active');
        lightboxModal.setAttribute('aria-hidden', 'false');
    }

    function closeLightbox() {
        lightboxModal.classList.remove('active');
        lightboxModal.setAttribute('aria-hidden', 'true');
        lightboxImage.src = '';
        lightboxImage.alt = '';
    }

    closeLightboxBtn.addEventListener('click', closeLightbox);
    closeLightboxBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            closeLightbox();
        }
    });

    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) closeLightbox();
    });

    document.querySelectorAll('#projects img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            openLightbox(img.src, img.alt);
        });
    });

    // --- Contact Form Validation ---
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    const feedback = document.getElementById('formFeedback');

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateField(input);
        });
    });

    function validateField(field) {
        const errorSpan = field.nextElementSibling;
        if (!field.value.trim()) {
            errorSpan.textContent = 'This field is required.';
            field.setCustomValidity('Invalid');
            return false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            errorSpan.textContent = 'Please enter a valid email address.';
            field.setCustomValidity('Invalid');
            return false;
        } else {
            errorSpan.textContent = '';
            field.setCustomValidity('');
            return true;
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isFormValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            feedback.style.color = 'green';
            feedback.textContent = 'Thanks for reaching out! Your message has been sent.';
            form.reset();
            inputs.forEach(input => input.setCustomValidity(''));
        } else {
            feedback.style.color = '#d93025';
            feedback.textContent = 'Please fix errors before submitting.';
        }
    });

    // --- Play Pong Button ---
    const pongBtn = document.getElementById("showPongBtn");
    const closePongBtn = document.getElementById("closePongBtn");

    pongBtn.addEventListener("click", () => {
        const gameSection = document.getElementById("pong-game");
        gameSection.style.display = "block";
    });

    if (!window.pongLoaded) {
        const script = document.createElement("script");
        script.src = "game.js"; // adjust path if needed
        script.onload = () => {
            if (typeof startPong === "function") startPong();
        };
        document.body.appendChild(script);
        window.pongLoaded = true;
    }
});

closePongBtn.addEventListener("click", () => {
    const gameSection = document.getElementById("pong-game");
    gameSection.style.display = "none";

});
