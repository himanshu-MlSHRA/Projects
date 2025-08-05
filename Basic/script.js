document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const addButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const body = document.body;

    if (localStorage.getItem("theme") === "light") {
        body.classList.add("light")
    } else {
        body.classList.add("dark")
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => renderTask(task));

    addButton.addEventListener("click", () => {
        const taskText = todoInput.value.trim();
        if (taskText === "") {
            return alert("You have to add a task!");
        } else {
            const newTask = {
                id: Date.now(),
                text: taskText,
                complete: false,
            };
            tasks.push(newTask);
            renderTask(newTask);
            saveTask();  
            todoInput.value = "";
            console.log(newTask.text);
        }
    });

    function renderTask(task) {
        const li = document.createElement("li");
        if (task.complete) li.classList.add("completed")
        li.setAttribute("data-id", task.id);
        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-btn">Delete</button>
        `;
        todoList.appendChild(li);
        li.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") return;
            task.complete = !task.complete;
            li.classList.toggle("completed")
            saveTask();
        });
        li.querySelector("button").addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent toggle from firing
            tasks = tasks.filter(t => t.id !== task.id)
            li.remove();
            saveTask();
        })
    }

    themeToggleBtn.addEventListener("click", () => {

        if (body.classList.toggle("light")) {
            localStorage.setItem("theme", "light");
        } else {
            localStorage.setItem("theme", "dark");
        }
        saveTask();
    });

    function saveTask() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});


// USed ChatGPT for better understanding and for bug handling. 