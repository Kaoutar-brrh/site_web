// Optionnel : message de confirmation après envoi réussi
document.querySelector('form').addEventListener('submit', function(e) {
  alert('Votre message a été envoyé avec succès !');
});
const cards = document.querySelectorAll('.patient .expertise-card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => observer.observe(card));

