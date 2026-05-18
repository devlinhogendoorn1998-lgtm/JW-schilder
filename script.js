/* Cookie Banner — toont opnieuw na 180 dagen */
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

/* Foto Grid Slider */
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

/* Contactformulier — EmailJS */
document.addEventListener('DOMContentLoaded', function () {
    emailjs.init('PmeYh9fT6qhQQ3Nzn');

    var contactForm = document.getElementById('jw-contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var submitBtn = contactForm.querySelector('.btn-submit');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Versturen...';

        emailjs.sendForm('service_797l3qo', 'template_o9hjjxn', contactForm)
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