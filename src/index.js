import './style.css'


// build task
// name, description, date
//check mark moves task to bottom, X removes it entirely
// sort by date if possible

// sort script by task stuff, project stuff, page appearances,
//tying stuff together, like with event listeners
// figure out what makes the most sense as you go along

// get form values
//turn values into "task"
// turn task into display

const getTaskValues = () => {
    let taskName = document.getElementById('task')
    let taskDesc = document.getElementById('desc')
    let taskDate = document.getElementById('date')
    return taskName, taskDesc, taskDate
}
// follow by calling task maker


const taskMaker = (name, desc, date) => {
    return { name, desc, date }
}

let newTask = taskMaker("laundry", "socks", "2023-01-01")


const taskContainer = document.getElementById('taskContainer')


const displayTask = (task) => {
    let newTask = document.createElement('div')
    newTask.classList.add('newTaskContainer')
    taskContainer.appendChild(newTask)

    let newTaskName = createThing(task.name, 'p', "taskName", newTask)
    let newTaskDesc = createThing(task.desc, 'p', "taskDesc", newTask)
    let newTaskDate = createThing(task.date, 'p', "taskDate", newTask)
}


const createThing = (text, type, group, parent) => {
    let newThing = document.createElement(type)
    newThing.textContent = text
    newThing.classList.add(group)
    newThing.appendChild(parent)
}

displayTask(newTask)



const projectMaker = (name) => {
//    let name = []
//    return { name }
}



const taskPrompt = document.getElementById("taskPrompt")
const newTaskButton = document.getElementById("newTaskButton")
const addTaskCancel = document.getElementById("addTaskCancel")
const addTaskAdd = document.getElementById("addTaskAdd")

const taskPromptReveal = () => {
    taskPrompt.classList.remove("hidden")
    newTaskButton.classList.add("hidden")
}

const taskPromptHide = () => {
    taskPrompt.classList.add("hidden")
    newTaskButton.classList.remove("hidden")
}

//temp
const funnyFunction = () => {
    getTaskValues()
    let funnyTask = taskMaker(taskName, taskDesc, taskDate)
    displayTask(funnyTask)
    return false
}


newTaskButton.addEventListener("click", taskPromptReveal)
addTaskCancel.addEventListener("click", taskPromptHide)
addTaskAdd.addEventListener("click", funnyFunction)