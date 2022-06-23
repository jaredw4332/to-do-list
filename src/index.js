import './style.css'

let allTaskArray = []
let priorityArray = []
let allProjectArray = []
let mainArray = undefined


//task
const getTaskValues = () => {
    let taskName = document.getElementById('task').value
    let taskDesc = document.getElementById('desc').value
    let taskDate = document.getElementById('date').value
    let taskPriority = "no"
    let taskCompleted = "no"
    return [taskName, taskDesc, taskDate, taskPriority, taskCompleted]
}

const taskMaker = (name, desc, date, priority, complete) => {
    return { name, desc, date, priority, complete }
}

const taskContainer = document.getElementById('taskContainer')

const displayTask = (task) => {
    let newTask = document.createElement('div')
    newTask.classList.add('newTaskContainer')
    taskContainer.appendChild(newTask)

    let newTaskName = createThing(task.name, 'p', "taskName", newTask)
    let newTaskDesc = createThing(task.desc, 'p', "taskDesc", newTask)
    let newTaskDate = createThing(task.date, 'p', "taskDate", newTask)
    let priorityTask = priorityTaskButton(newTask, task)
    completeButton(newTask, priorityTask, task)
    deleteTaskButton(newTask, task)
}

const completeButton = (parent, button, task) => {
    let completeTask = document.createElement('button')
    completeTask.classList.add("taskCheck")
    parent.appendChild(completeTask)
    completeTask.addEventListener("click", function() {
        if (task.complete == "no") {
            task.complete = "yes"
            parent.classList.add("completedTask")
            button.disabled = true
        } else {
            task.complete = "no"
            parent.classList.remove("completedTask")
            button.disabled = false
        }
        storageUpdate()
    })
    checkCompletion(parent, task)
}

const priorityTaskButton = (parent, task) => {    
    let priorityTask = document.createElement('button')
    priorityTask.classList.add("taskPriority")
    parent.appendChild(priorityTask)
    priorityTask.addEventListener("click", function() {
        if (task.priority == 'no') {
            priorityArray.push(task)
            priorityTask.classList.add("taskPriorityActive")
            task.priority = 'yes'
        } else {
            let index = priorityArray.indexOf(task)
            priorityArray.splice(index, 1)
            priorityTask.classList.remove("taskPriorityActive")
            task.priority = 'no'
        }
        storageUpdate()
    })
    checkPriority(priorityTask, task)
    return priorityTask
}

const deleteTaskButton = (parent, task) => {
    let deleteTask = document.createElement('button')
    deleteTask.classList.add("taskDelete")
    parent.appendChild(deleteTask)
    deleteTask.addEventListener("click", function() {
        let index = allTaskArray.indexOf(task)
        allTaskArray.splice(index, 1)
        if (task.priority == "yes") {
            index = priorityArray.indexOf(task)
            priorityArray.splice(index, 1)
        }
        taskContainer.removeChild(parent)
        storageUpdate()
    })
}

const checkPriority = (button, task) => {
    if (task.priority == 'yes' || mainArray == priorityArray) {
        button.classList.add("taskPriorityActive")
        task.priority = 'yes'
    }
}

const checkCompletion = (parent, task) => {
    if (task.complete == "yes") {
        parent.classList.add("completedTask")
    }
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
        newTaskButton.style.display = 'none'
    } else {
        taskPrompt.style.display = 'none'
        newTaskButton.style.display = 'block'
    }
}

const addTaskToArray = (task) => {
    allTaskArray.push(task)
    let activeButton = document.getElementsByClassName('activeProject')
        if (mainArray == allTaskArray) {
            return
        } else {
            mainArray.push(task)
        }
}

const taskAdd = () => {
    let taskArray = getTaskValues()
    let task = taskMaker(taskArray[0], taskArray[1], taskArray[2], taskArray[3], taskArray[4])
    let taskDiv = displayTask(task)
    addTaskToArray(task, taskDiv)
    clearInput("taskInput")
    toggleTaskPrompt()
    storageUpdate()
}

newTaskButton.addEventListener("click", toggleTaskPrompt)
addTaskCancel.addEventListener("click", toggleTaskPrompt)
addTaskAdd.addEventListener("click", taskAdd)


// page functionality

const clearInput = (formID) => {
    document.getElementById(formID).reset()
}

const sidebar = document.getElementById("sidebar")
const sidebarToggleButton = document.getElementById("sidebarToggle")
const main = document.getElementById("main")

const toggleSidebar = () => {
    if (sidebar.style.display != 'none') {
        sidebar.style.display = 'none'
        main.style.gridColumn = " 1 / 3 "
    } else {
        sidebar.style.display = 'grid'
        main.style.gridColumn = " 2 / 3 "
    }
}

sidebarToggleButton.addEventListener("click", toggleSidebar)


// project
const newProjectButton = document.getElementById("newProjectButton")
const projectPrompt = document.getElementById("projectPrompt")
const addProjectCancel = document.getElementById("addProjectCancel")

const toggleProjectPrompt = () => {
    if (projectPrompt.style.display != 'block') {
        projectPrompt.style.display = 'block'
        newProjectButton.style.display ='none'
    } else {
        projectPrompt.style.display = 'none'
        newProjectButton.style.display ='block'
    }
}

newProjectButton.addEventListener("click", toggleProjectPrompt)
addProjectCancel.addEventListener("click", toggleProjectPrompt)

const getProjectValues = () => {
    return document.getElementById('title').value
}

const projectContainer = document.getElementById('projectContainer')

const projectMaker = (title) => {
    const tasks = []
    return {title, tasks}
}

const projectDisplay = (project, parent) => {
    let newProject = document.createElement('button')
    newProject.textContent = project
    newProject.classList.add('project')
    parent.appendChild(newProject)

    return newProject
}

const projectDeleteButton = (button, array) => {
    let projectDelete = document.createElement('button')
    projectDelete.classList.add('projectDelete')
    button.appendChild(projectDelete)

    button.addEventListener("mouseover", function(){
        projectDelete.style.display = "block"
    })

    button.addEventListener("mouseout", function(){
        projectDelete.style.display = "none"
    })

    projectDelete.addEventListener("click", function() {
        array.forEach(function(task) {
            let index = allTaskArray.indexOf(task)
            if (index != -1) {
                allTaskArray.splice(index, 1)
            }
            index = priorityArray.indexOf(task)
            if (index != -1) {
                priorityArray.splice(index, 1)
            }
        })
        array = []
        projectContainer.removeChild(button)
        allSection.click()
    })
}

const projectClickHandler = (project, array, title) => {
    project.addEventListener("click", function() {
        projectAppendTitle(title)
        mainArray = array
        projectDeactivate()
        projectActivate(project)
    })
}

const projectActivate = (project) => {
    project.classList.add('activeProject')
    project.disabled = true
}

const projectDisplayTasks = (button, array) => {
    button.addEventListener("click", function() {
        projectHideTasks()
        array.forEach(item => displayTask(item))
    })
}

const projectHideTasks = () => {
    let activeTasks = document.getElementsByClassName('newTaskContainer')
    for (let i = activeTasks.length-1; i >= 0; i--) {
        taskContainer.removeChild(activeTasks[i])
    }
    return
}

const projectDeactivate = () => {
    let projectList = document.getElementsByClassName("project")
    for (let item of projectList) {
        item.classList.remove('activeProject')
        item.disabled = false
    }
}

const projectImgSpan = (button, id) => {
    let imgSpan = document.createElement('span')
    imgSpan.classList.add("projectImg")
    imgSpan.setAttribute("id", `${id}Img`)
    button.appendChild(imgSpan)
}

const projectAdd = () => {
    let newProject = getProjectValues()
    newProject = projectMaker(newProject)
    allProjectArray.push(newProject.tasks)
    let newProjectButton = projectDisplay(newProject.title, projectContainer)
    projectClickHandler(newProjectButton, newProject.tasks, newProject.title)
    projectDisplayTasks(newProjectButton, newProject.tasks)
    projectDeleteButton(newProjectButton, newProject.tasks)
    clearInput("projectInput")
    toggleProjectPrompt()
}

const addProjectAdd = document.getElementById('addProjectAdd')
addProjectAdd.addEventListener("click", projectAdd)


const mainTitle = document.getElementById("mainTitle")

const projectAppendTitle = (title) => {
    mainTitle.textContent = title
}

const sidebarMain = document.getElementById("sidebarMain")

// dev use, projects continued
const customProjectAdd = (title, array) => {
    let customProjectButton = projectDisplay(title, sidebarMain)
    projectClickHandler(customProjectButton, array, title)
    projectDisplayTasks(customProjectButton, array)
    projectImgSpan(customProjectButton, title)
    return customProjectButton
}

const allSection = customProjectAdd("All", allTaskArray)
customProjectAdd("Priority", priorityArray)

// local storage
const storageUpdate = () => {
    localStorage.setItem("allTasks", JSON.stringify(allTaskArray))
    localStorage.setItem("priorityTasks", JSON.stringify(priorityArray))
    localStorage.setItem("allProjects", JSON.stringify(allProjectArray))
}

// doesn't work on fresh load of page
const storageLoad = () => {
    let priorityArrayPrev = JSON.parse(localStorage.getItem("priorityTasks"))
    for (let item of priorityArrayPrev) {
        priorityArray.push(item)
    }
    let allTaskArrayPrev = JSON.parse(localStorage.getItem("allTasks"))
    for (let item of allTaskArrayPrev) {
        allTaskArray.push(item)
    }
    let allProjectArrayPrev = JSON.parse(localStorage.getItem("allProjects"))
    for (let item of allProjectArrayPrev) {
        allProjectArray.push(item)
    }
}

storageLoad()



allSection.click()