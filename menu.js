


menuPage = document.querySelectorAll(".menu-page")[0];


menuBtn = document.querySelectorAll(".menu-btn")[0];
menuBtn.addEventListener('click',(e) => {menuPage.dataset.isshown=true});

btns = document.querySelectorAll(".menu-page a");

for (btn of btns){

  btn.addEventListener("click",(e) => {
    menuPage.dataset.isshown = false;
  });

}


closeBtn = document.getElementById("quit-menu-btn");
closeBtn.addEventListener("click",(e)=>{
  menuPage.dataset.isshown = false;
});



// Make menu bttn appear only after reaching short movies section 
  document.addEventListener("DOMContentLoaded", () => {
  sectionHeadings = document.querySelectorAll(".section-heading");

  for (section of sectionHeadings){
    if(section.id == "shortmovies"){
      break
    }
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) {
        // Le titre est collé en haut → afficher le bouton
        menuBtn.style.display = "block";
      } else {
        // Le titre n'est pas encore en haut → cacher le bouton
        menuBtn.style.display = "none";
      }
    },
    {
      root: null,
      threshold: 0,
      rootMargin: "-1px 0px 0px 0px", // On détecte quand le titre est sticky
    }
  );

  observer.observe(section);
});