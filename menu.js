


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
  section_list = document.querySelectorAll("section");

  for (section of section_list){
    if(section.id == "top"){
      break
    }
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) {
        menuBtn.style.opacity = 1;
        menuBtn.classList.remove("disabled");

      } else {
        menuBtn.style.opacity = 0;
        menuBtn.classList.add("disabled");
      }
    },
    {
      root: null,
      threshold: 0,
      rootMargin: "-1px 0px 0px 0px", 
    }
  );

  observer.observe(section);
});