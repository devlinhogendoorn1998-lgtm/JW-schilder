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

/* Contactformulier */
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('jw-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const naam    = document.getElementById('naam').value.trim();
            const email   = document.getElementById('email').value.trim();
            const tel     = document.getElementById('telefoon').value.trim();
            const werk    = document.getElementById('werkzaamheden').value;
            const bericht = document.getElementById('bericht').value.trim();

            const onderwerp = 'Offerte aanvraag: ' + werk + ' \u2014 ' + naam;
            const body =
                'Naam: '          + naam    + '\r\n' +
                'E-mail: '        + email   + '\r\n' +
                'Telefoon: '      + tel     + '\r\n' +
                'Werkzaamheden: ' + werk    + '\r\n\r\n' +
                'Bericht:\r\n'    + bericht;

            window.location.href =
                'mailto:info@schildersbedrijfinhouten.nl' +
                '?subject=' + encodeURIComponent(onderwerp) +
                '&body='    + encodeURIComponent(body);
        });
    }
});