const Theme = document.querySelector(".theme-toggle");
const bgImage = document.querySelector(".bg");

function changeTheme(){
    document.body.classList.toggle("white-theme");
    bgImage.src.includes("bg-desktop-light") ? 
    bgImage.src = "images/bg-desktop-dark.jpg" : 
    bgImage.src = "images/bg-desktop-light.jpg";
}

Theme.addEventListener("click", changeTheme)