import './style.css'


// build task
// name, description, date
//check mark moves task to bottom, X removes it entirely
// sort by date if possible

// sort script by task stuff, project stuff, page appearances,
//tying stuff together, like with event listeners
// figure out what makes the most sense as you go along

const taskMaker = (name, desc, date) => {
    const addTask = () => name.push(placeholder)
    return { addTask }
}

const projectMaker = (name) => {
//    let name = []
//    return { name }
}



const addTask = document.getElementById("taskPrompt")
const addTaskButton = document.getElementById("addTaskButton")
const addTaskCancel = document.getElementById("addTaskCancel")

const addTaskReveal = () => {
    addTask.classList.remove("hidden")
    addTaskButton.classList.add("hidden")
}

const addTaskHide = () => {
    addTask.classList.add("hidden")
    addTaskButton.classList.remove("hidden")
}

addTaskButton.addEventListener("click", addTaskReveal)
addTaskCancel.addEventListener("click", addTaskHide)