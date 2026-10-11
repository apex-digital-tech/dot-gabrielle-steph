document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. CONFIGURATION DU COMPTE À REBOURS ---
    const weddingDate = new Date('2026-10-24T11:30:20').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const difference = weddingDate - now;

        const countdownElement = document.getElementById('countdown');
        if (difference < 0) {
            if (countdownElement) countdownElement.innerHTML = "<h3>C'est le grand jour !</h3>";
            clearInterval(countdownInterval);
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        const dEl = document.getElementById('days');
        const hEl = document.getElementById('hours');
        const mEl = document.getElementById('minutes');
        const sEl = document.getElementById('seconds');

        if (dEl) dEl.innerText = days < 10 ? '0' + days : days;
        if (hEl) hEl.innerText = hours < 10 ? '0' + hours : hours;
        if (mEl) mEl.innerText = minutes < 10 ? '0' + minutes : minutes;
        if (sEl) sEl.innerText = seconds < 10 ? '0' + seconds : seconds;
    };

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);


    // --- 2. DYNAMISME DU FORMULAIRE RSVP ---
    const attendanceSelect = document.getElementById('attendance');
    const guestsGroup = document.getElementById('guestsGroup');
    const guestInput = document.getElementById('guestCount');

    if (attendanceSelect && guestsGroup && guestInput) {
        attendanceSelect.addEventListener('change', (e) => {
            if (e.target.value === 'no') {
                guestsGroup.style.display = 'none';
                guestInput.value = 0;
            } else {
                guestsGroup.style.display = 'block';
                guestInput.value = 1;
            }
        });
    }


    // --- 3. TRAITEMENT DE LA SOUMISSION DU FORMULAIRE (WHATSAPP CORRIGÉ) ---
    const rsvpForm = document.getElementById('rsvpForm');
    const feedback = document.getElementById('formFeedback');

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullName = document.getElementById('fullName').value;
            const attendance = attendanceSelect.value;
            const guestCount = guestInput.value;
            const message = document.getElementById('message').value;

            if (!fullName || !attendance) {
                alert('Veuillez remplir les champs obligatoires.');
                return;
            }

            const attendanceText = attendance === 'yes' ? 'Oui, avec grand plaisir !' : 'Malheureusement, je ne pourrai pas';
            
            // Construction propre du texte pour éviter les bugs de caractères
            let rawText = `*Confirmation de présence*\n`;
            rawText += `*Nom :* ${fullName}\n`;
            rawText += `*Présence :* ${attendanceText}\n`;
            rawText += `*Nombre d'accompagnateurs :* ${guestCount}\n`;
            if (message) {
                rawText += `*Message :* ${message}`;
            }

            const phoneNumber = '14182717662';
            // CORRECTION ICI : Ajout du slash (/) et du signe égal (=)
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(rawText)}`;
            
            window.open(whatsappUrl, '_blank');

            if (feedback) {
                feedback.innerText = "Redirection vers WhatsApp en cours...";
                feedback.className = "form-feedback success";
            }
            
            rsvpForm.reset();
            if (guestsGroup) guestsGroup.style.display = 'block';
        });
    }

    // --- 4. GESTION DU CARROUSEL D'IMAGES ---
    const track = document.getElementById('carouselTrack');
    const nextButton = document.getElementById('nextBtn');
    const prevButton = document.getElementById('prevBtn');
    
    if (track && nextButton && prevButton) {
        const slides = Array.from(track.children);
        let currentIndex = 0;

        const moveToSlide = (index) => {
            track.style.transform = `translateX(-${index * 100}%)`;
            currentIndex = index;
        };

        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentIndex < slides.length - 1) {
                moveToSlide(currentIndex + 1);
            } else {
                moveToSlide(0);
            }
        });

        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentIndex > 0) {
                moveToSlide(currentIndex - 1);
            } else {
                moveToSlide(slides.length - 1);
            }
        });
    }


    // --- 5. GESTION DE LA LIGHTBOX ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const galleryImages = document.querySelectorAll('.gallery-img');

    if (lightbox && lightboxImg && lightboxClose) {
        galleryImages.forEach(image => {
            image.addEventListener('click', () => {
                lightboxImg.src = image.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        lightboxClose.addEventListener('click', closeLightbox);
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
});
