import './style.css'

// sort script by task stuff, project stuff, page appearances,
// tying stuff together, like with event listeners
// figure out what makes the most sense as you go along

// task sorted and displayed via looping through arrays
// clicking projects will activate that project's "mode"
// automatically adding every new task to that
// delete function loops through project array, targetting certain element,
// similar to tic tac toe winning logic


let allTaskArray = []
let allProjectArray = []

//task
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


//display
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

const toggleTaskPrompt = () => {
    if (taskPrompt.style.display != 'block') {
        taskPrompt.style.display = 'block'
    } else {
        taskPrompt.style.display = 'none'
    }
}



//tying it all together
const taskAdd = () => {
    let taskArray = getTaskValues()
    let task = taskMaker(taskArray[0], taskArray[1], taskArray[2])
    displayTask(task)
    clearInput("taskInput")
    toggleTaskPrompt()
}


// page functionality
newTaskButton.addEventListener("click", toggleTaskPrompt)
addTaskCancel.addEventListener("click", toggleTaskPrompt)
addTaskAdd.addEventListener("click", taskAdd)

//example
let newTask = taskMaker("Do laundry", "I need to wash all my socks", "2023-01-01")
displayTask(newTask)


// display
const sidebar = document.getElementById("sidebar")
const sidebarToggleButton = document.getElementById("sidebarToggle")
const main = document.getElementById("main")

const toggleSidebar = () => {
    if (sidebar.style.display != 'none') {
        sidebar.style.display = 'none'
        main.style.gridColumn = " 1 / 3 "
    } else {
        sidebar.style.display = 'block'
        main.style.gridColumn = " 2 / 3 "
    }
}

sidebarToggleButton.addEventListener("click", toggleSidebar)

const newProjectButton = document.getElementById("newProjectButton")
const projectPrompt = document.getElementById("projectPrompt")
const addProjectCancel = document.getElementById("addProjectCancel")

const toggleProjectPrompt = () => {
    if (projectPrompt.style.display != 'block') {
        projectPrompt.style.display = 'block'
    } else {
        projectPrompt.style.display = 'none'
    }
}

newProjectButton.addEventListener("click", toggleProjectPrompt)
addProjectCancel.addEventListener("click", toggleProjectPrompt)

const clearInput = (formID) => {
    document.getElementById(formID).reset()
}


// project logic
const getProjectValues = () => {
    return document.getElementById('title').value
}

const projectArray = (title) => {
    title = []
    title.push(allProjectArray)
}


//display
const projectContainer = document.getElementById('projectContainer')

const projectDisplay = (project) => {
    let newProject = document.createElement('button')
    newProject.textContent = project
    newProject.classList.add('project')
    projectContainer.appendChild(newProject)
    return newProject
}

const projectDisplayTasks = (array) => {
    for (let i = 0; i < array.length; i++) {
        displayTask(array[i])
    }
}

const projectButtonFunction = (project) => {
    project.addEventListener("click", function() {
        projectDeactivate()
        project.classList.add('activeProject')
    })
}


const projectDeactivate = () => {
    let projectList = document.getElementsByClassName("project")
    for (let item of projectList) {
        item.classList.remove('activeProject')
    }
}

// task adder searches for activeproject class, and adds it to wherever it finds it
// if it cant find one it means it's a general task


// project logic
const projectAdd = () => {
    let newProject = getProjectValues()
    projectArray(newProject)
    newProject = projectDisplay(newProject)
    clearInput("projectInput")
    toggleProjectPrompt()
    projectButtonFunction(newProject)
}

const addProjectAdd = document.getElementById('addProjectAdd')
addProjectAdd.addEventListener("click", projectAdd)