import './style.css'

// sort script by task stuff, project stuff, page appearances,
// tying stuff together, like with event listeners
// figure out what makes the most sense as you go along


const getTaskValues = () => {
    let taskName = document.getElementById('task').value
    let taskDesc = document.getElementById('desc').value
    let taskDate = document.getElementById('date').value
    return [taskName, taskDesc, taskDate]
}

const taskMaker = (name, desc, date) => {
    return { name, desc, date }
}


const taskContainer = document.getElementById('taskContainer')

const displayTask = (task) => {
    let newTask = document.createElement('div')
    newTask.classList.add('newTaskContainer')
    taskContainer.appendChild(newTask)

    let newTaskName = createThing(task.name, 'p', "taskName", newTask)
    let newTaskDesc = createThing(task.desc, 'p', "taskDesc", newTask)
    let newTaskDate = createThing(task.date, 'p', "taskDate", newTask)
    let checkmark = createThing('', 'button', "taskCheck", newTask)
    let deleteTask = createThing('', 'button', "taskDelete", newTask)
    let starTask = createThing('', 'button', "taskPriority", newTask)
}

const createThing = (text, type, group, parent) => {
    let newThing = document.createElement(type)
    newThing.textContent = text
    newThing.classList.add(group)
    parent.appendChild(newThing)
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
    let funnyArray = getTaskValues()
    let funnyTask = taskMaker(funnyArray[0], funnyArray[1], funnyArray[2])
    displayTask(funnyTask)
    return false
}


newTaskButton.addEventListener("click", taskPromptReveal)
addTaskCancel.addEventListener("click", taskPromptHide)
addTaskAdd.addEventListener("click", funnyFunction)


let newTask = taskMaker("Do laundry", "I need to wash all my socks", "2023-01-01")
displayTask(newTask)

const sidebar = document.getElementById("sidebar")
const sidebarToggleButton = document.getElementById("sidebarToggle")

const toggleThing = (element) => {
    if (element.style.display != 'none') {
        element.style.display = 'none'
    } else {
        element.style.display = block
    }
}

// sidebarToggleButton.addEventListener("click", toggleThing(sidebar))
// figure out applicable grid layout

// project maker logic
// just assign things certain classes and make them appear via selection of those
//projects on the side
// projects can simply be buttons
// depending which project is "active" is what will be shown
// or just uhh use arrays

const getProjectValues = () => {
    return document.getElementById('title').value
}

//const projectMaker = (title) => {
//    return { title }
//}

const projectArray = (title) => {
    title = []
    return { title }
}



const projectContainer = document.getElementById('projectContainer')

const projectDisplay = (project) => {
    createThing(project, 'button', "project", projectContainer)
}

const projectDisplayTasks = (array) => {
    for (let i = 0; i < array.length; i++) {
        displayTask(array[i])
    }
}



const projectAdd = () => {
    let newProject = getProjectValues()
    console.log(newProject)
    projectDisplay(newProject)
}

const addProjectButton = document.getElementById('addProjectAdd')
addProjectButton.addEventListener("click", projectAdd)