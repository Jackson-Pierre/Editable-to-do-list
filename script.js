const Theme = document.querySelector(".theme-toggle");
const bgImage = document.querySelector(".bg");
const bgDesktop = document.querySelector(".bg-desktop");

const taskCompleted = document.querySelectorAll(".finished");

let task = []

function changeTheme(){
    document.body.classList.toggle("white-theme");

    bgImage.src.includes("bg-mobile-light") ? 
        bgImage.src = "images/bg-mobile-dark.jpg" : 
        bgImage.src = "images/bg-mobile-light.jpg";

    bgDesktop.srcset.includes("bg-desktop-light") ? 
        bgDesktop.srcset = "images/bg-desktop-dark.jpg" : 
        bgDesktop.srcset = "images/bg-desktop-light.jpg";
}

function completed(event){
    const button = event.currentTarget;
    const taskName = button.nextElementSibling;

    button.classList.toggle("checked");
    taskName.classList.toggle("task-checked");
}

Theme.addEventListener("click", changeTheme);

taskCompleted.forEach(button => {
    button.addEventListener("click", completed);
});
