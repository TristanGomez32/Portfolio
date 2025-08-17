

function make_copy_paste_symbol(){
    return `<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="false" role="img">
                <rect x="14" y="13" width="20" height="22" rx="4" fill="white" opacity="1" style="stroke-width:2;stroke:black" />
                <rect x="10" y="17" width="20" height="22" rx="4" fill="white" opacity="1" style="stroke-width:2;stroke:black" />
                 <path d="M14 26L20 32L30 18" 
                        stroke="none" 
                        stroke-width="5" 
                        stroke-linecap="round" 
                        stroke-linejoin="round"
                        fill="none"/>
            </svg>`
}

emailContainers = document.querySelectorAll(".email-container");

for (emailContainer of emailContainers){

    emailContainer.innerHTML += make_copy_paste_symbol();

    emailContainer.addEventListener("click",(e)=>{

        element = e["target"];

        if(!Array.from(element.classList).includes("email-container") ){
            element = element.parentElement;
            if(!Array.from(element.classList).includes("email-container") ){
                element = element.parentElement;
            }
        }

        emailContainer = element;

        svg = emailContainer.querySelectorAll("svg")[0];
        path = svg.querySelectorAll("path")[0];
        path.style.stroke="green";

        // Copy the text inside the text field
        navigator.clipboard.writeText("tristan.gomez44example@gmail.com".replace("example",""));
        
        setTimeout(function () {
            path.style.stroke="none";
        }, 10000);

    });

    console.log(emailContainer);
}
