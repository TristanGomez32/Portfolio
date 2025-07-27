
const page_sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.side-menu a');

const section_observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`.side-menu a[href="#${id}"]`);

    if (entry.isIntersecting) {
      navLinks.forEach(el => el.classList.remove('active'));
      if (link) link.classList.add('active');
    }
  });
}, {
  threshold: 0.1  // le seuil d'intersection : 50% de la section visible
});

page_sections.forEach(section => section_observer.observe(section));

