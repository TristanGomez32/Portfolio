


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