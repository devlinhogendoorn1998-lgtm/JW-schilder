// Mentor focus: Simpel en effectief.
document.addEventListener('DOMContentLoaded', () => {
    console.log("JW Schilderwerken site geladen. Alle systemen online.");
    
    // Smooth scroll naar sections (indien nodig)
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("Navigeren naar sectie...");
        });
    });
});
/* Mentor check: Formulier verwerking via mailto */
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('jw-contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Data ophalen
            const naam = document.getElementById('naam').value;
            const email = document.getElementById('email').value;
            const tel = document.getElementById('telefoon').value;
            const werk = document.getElementById('werkzaamheden').value;
            const bericht = document.getElementById('bericht').value;

            const ontvanger = "info@schildersbedrijfinhouten.nl";
            const onderwerp = encodeURIComponent(`Offerte aanvraag: ${werk} - ${naam}`);
            
            // Body van de mail opbouwen
            let mailBody = `Naam: ${naam}%0D%0A`;
            mailBody += `E-mail: ${email}%0D%0A`;
            mailBody += `Telefoon: ${tel}%0D%0A`;
            mailBody += `Werkzaamheden: ${werk}%0D%0A%0D%0A`;
            mailBody += `Bericht:%0D%0A${bericht}`;

            // Open mail programma
            window.location.href = `mailto:${ontvanger}?subject=${onderwerp}&body=${mailBody}`;
            
            console.log("Formulier verzonden naar mail-client.");
        });
    }
});