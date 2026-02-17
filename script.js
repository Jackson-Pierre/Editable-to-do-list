const Theme = document.querySelector(".theme-toggle");
const bgImage = document.querySelector(".bg");
const bgDesktop = document.querySelector(".bg-desktop");

const addTaskButton = document.querySelector(".add-task");
const newTaskInput = document.querySelector(".new-task");
const todoList = document.querySelector(".todo-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function changeTheme(){
    document.body.classList.toggle("white-theme");

    bgImage.src.includes("bg-mobile-light") ? 
        bgImage.src = "images/bg-mobile-dark.jpg" : 
        bgImage.src = "images/bg-mobile-light.jpg";

    bgDesktop.srcset.includes("bg-desktop-light") ? 
        bgDesktop.srcset = "images/bg-desktop-dark.jpg" : 
        bgDesktop.srcset = "images/bg-desktop-light.jpg";
}

function toggleTask(index){
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function renderTasks(){
    todoList.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");

        taskElement.innerHTML = `
            <button class="finished ${task.completed ? "checked" : ""}">
                <img src="./images/icon-check.svg">
            </button>
            <p class="task-name ${task.completed ? "task-checked" : ""}">
                ${task.text}
            </p>
            <button class="delete">
                <img src="./images/icon-cross.svg">
            </button>
        `;

        const finishedButton = taskElement.querySelector(".finished");

        finishedButton.addEventListener("click", () => {
            toggleTask(index);
        });

        todoList.appendChild(taskElement);
    });
}

function addTaskFunction(){
    const text = newTaskInput.value.trim();

    if(text === "") return;
    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    newTaskInput.value = "";
    renderTasks();
}

Theme.addEventListener("click", changeTheme);

addTaskButton.addEventListener("click", addTaskFunction);

renderTasks();
