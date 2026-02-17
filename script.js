const Theme = document.querySelector(".theme-toggle");
const bgImage = document.querySelector(".bg");
const bgDesktop = document.querySelector(".bg-desktop");

function changeTheme(){
    document.body.classList.toggle("white-theme");
    bgImage.src.includes("bg-mobile-light") ? 
    bgImage.src = "images/bg-mobile-dark.jpg" : 
    bgImage.src = "images/bg-mobile-light.jpg";
    bgDesktop.srcset.includes("bg-desktop-light") ? 
    bgDesktop.srcset = "images/bg-desktop-dark.jpg" : 
    bgDesktop.srcset = "images/bg-desktop-light.jpg";
}

Theme.addEventListener("click", changeTheme)