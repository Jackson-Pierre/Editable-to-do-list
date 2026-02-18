const Theme = document.querySelector(".theme-toggle");
const bgImage = document.querySelector(".bg");
const bgDesktop = document.querySelector(".bg-desktop");

const addTaskButton = document.querySelector(".add-task");
const newTaskInput = document.querySelector(".new-task");
const todoList = document.querySelector(".todo-list");

const quantityOfItems = document.querySelector(".quantity-of-items");
const clearCompleted = document.querySelector(".clear-completed");

const all = document.querySelectorAll(".all");
const active = document.querySelectorAll(".Active");
const completed = document.querySelectorAll(".completed");

let currentFilter = "all";

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

    let filteredTasks;

    if(currentFilter === "active"){
        filteredTasks = tasks.filter(task => !task.completed);
    }
    else if(currentFilter === "completed"){
        filteredTasks = tasks.filter(task => task.completed);
    }
    else{
        filteredTasks = tasks;
    }

    if(filteredTasks.length === 0){
        todoList.innerHTML = `
            <div class="no-task">
                <p>Nenhuma tarefa encontrada</p>
            </div>
        `;
    }

    quantityOfItems.innerHTML = `
        <p>${tasks.length} Itens Criados</p>
    `;

    filteredTasks.forEach((task) => {

        const index = tasks.findIndex(t => t.id === task.id);

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
                <img class="delete-img" src="./images/icon-cross.svg">
            </button>
        `;

        const finishedButton = taskElement.querySelector(".finished");
        const deleteButton = taskElement.querySelector(".delete");

        finishedButton.addEventListener("click", () => {
            toggleTask(index);
        });

        deleteButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        });

        todoList.appendChild(taskElement);
    });

    updateActiveFilterButton();
}

function updateActiveFilterButton(){

    all.forEach(btn => btn.classList.remove("active"));
    active.forEach(btn => btn.classList.remove("active"));
    completed.forEach(btn => btn.classList.remove("active"));

    if(currentFilter === "all"){
        all.forEach(btn => btn.classList.add("active"));
    }
    else if(currentFilter === "active"){
        active.forEach(btn => btn.classList.add("active"));
    }
    else if(currentFilter === "completed"){
        completed.forEach(btn => btn.classList.add("active"));
    }
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

function deleteReady(){
    tasks = tasks.filter(task => !task.completed);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function completedFilter(){
    currentFilter = "completed";
    renderTasks();
}

function activeFilter(){
    currentFilter = "active";
    renderTasks();
}

function allFilter(){
    currentFilter = "all";
    renderTasks();
}

Theme.addEventListener("click", changeTheme);

addTaskButton.addEventListener("click", addTaskFunction);

clearCompleted.addEventListener("click", deleteReady);

all.forEach(button => {
    button.addEventListener("click", allFilter);
});

active.forEach(button => {
    button.addEventListener("click", activeFilter);
});

completed.forEach(button => {
    button.addEventListener("click", completedFilter);
});

renderTasks();
