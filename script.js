// Sectie: Cookie Banner — toont opnieuw na 180 dagen
const cookieBanner = document.getElementById('cookie-banner');
const consentDate = localStorage.getItem('cookie-consent-date');
const daysSince = consentDate ? Math.floor((Date.now() - parseInt(consentDate)) / 86400000) : 999;

if (cookieBanner && (!localStorage.getItem('cookie-consent') || daysSince > 180)) {
    cookieBanner.hidden = false;
}
document.getElementById('cookie-accept')?.addEventListener('click', function () {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-consent-date', Date.now().toString());
    cookieBanner.hidden = true;
});
document.getElementById('cookie-decline')?.addEventListener('click', function () {
    localStorage.setItem('cookie-consent', 'declined');
    localStorage.setItem('cookie-consent-date', Date.now().toString());
    cookieBanner.hidden = true;
});

// Sectie: Hamburger Dropdown Menu
(function () {
    var btn = document.getElementById('hamburger-btn');
    var dropdown = document.getElementById('nav-dropdown');
    if (!btn || !dropdown) return;

    // Toggle open/dicht bij klik op hamburger
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = dropdown.classList.toggle('open');
        btn.classList.toggle('open', isOpen);
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        btn.setAttribute('aria-label', isOpen ? 'Menu sluiten' : 'Menu openen');
    });

    // Sluit menu bij klik buiten het menu
    document.addEventListener('click', function (e) {
        if (!dropdown.contains(e.target) && e.target !== btn) {
            dropdown.classList.remove('open');
            btn.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
            btn.setAttribute('aria-label', 'Menu openen');
        }
    });

    // Sluit menu bij Escape-toets
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            dropdown.classList.remove('open');
            btn.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
            btn.setAttribute('aria-label', 'Menu openen');
            btn.focus();
        }
    });

    // Sluit menu na klik op een menu-item
    dropdown.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            dropdown.classList.remove('open');
            btn.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
            btn.setAttribute('aria-label', 'Menu openen');
        });
    });
})();

// Sectie: Foto Grid Slider
function changeSlide(gridId, direction) {
    var wrapper = document.querySelector('#' + gridId + ' .slider-wrapper');
    if (!wrapper) return;
    var slides = wrapper.querySelectorAll('.slide');
    var current = wrapper.querySelector('.slide.active');
    if (!current) return;
    var idx = Array.prototype.indexOf.call(slides, current);
    slides[idx].classList.remove('active');
    var next = (idx + direction + slides.length) % slides.length;
    slides[next].classList.add('active');
}

// Sectie: Contactformulier — EmailJS
document.addEventListener('DOMContentLoaded', function () {
    if (typeof emailjs !== 'undefined') {
        emailjs.init('PmeYh9fT6qhQQ3Nzn');
    }

    var contactForm = document.getElementById('jw-contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var submitBtn = contactForm.querySelector('.btn-submit');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Versturen...';

        var templateParams = {
            naam:          document.getElementById('naam').value.trim(),
            email:         document.getElementById('email').value.trim(),
            telefoon:      document.getElementById('telefoon').value.trim(),
            werkzaamheden: document.getElementById('werkzaamheden').value,
            bericht:       document.getElementById('bericht').value.trim()
        };

        Promise.all([
            emailjs.send('service_797l3qo', 'template_o9hjjxn',  templateParams),
            emailjs.send('service_797l3qo', 'template_pnbrz1u', templateParams)
        ])
            .then(function () {
                contactForm.style.display = 'none';
                var bedankt = document.getElementById('form-bedankt');
                if (bedankt) bedankt.hidden = false;
            }, function (error) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'VRAAG OFFERTE AAN';
                alert('Er ging iets mis. Probeer het opnieuw of bel ons direct op 06-11516016.');
                console.error('EmailJS fout:', error);
            });
    });
});
