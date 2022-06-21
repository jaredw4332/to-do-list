import './style.css'

// sort script by task stuff, project stuff, page appearances,
// tying stuff together, like with event listeners
// figure out what makes the most sense as you go along

// task sorted and displayed via looping through arrays
// clicking projects will activate that project's "mode"
// automatically adding every new task to that
// delete function loops through project array, targetting certain element,
// similar to tic tac toe winning logic


const allTaskArray = []
const priorityArray = []
let mainArray = undefined

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
    completeButton(newTask)
    priorityTaskButton(newTask, task)
    deleteTaskButton(newTask, task)
}

const completeButton = (parent) => {
    let completeTask = document.createElement('button')
    completeTask.classList.add("taskCheck")
    parent.appendChild(completeTask)
    completeTask.addEventListener("click", function() {
        if (parent.classList.contains("completedTask")) {
            parent.classList.remove("completedTask")
        } else {
            parent.classList.add("completedTask")
        }
    })
}

const priorityTaskButton = (parent, task) => {    
    let priorityTask = document.createElement('button')
    priorityTask.classList.add("taskPriority")
    parent.appendChild(priorityTask)
    priorityTask.addEventListener("click", function() {
        if (priorityArray.indexOf(task) == -1) {
            priorityArray.push(task)
            priorityTask.classList.add("taskPriorityActive")
        } else {
            let index = priorityArray.indexOf(task)
            priorityArray.splice(index, 1)
            priorityTask.classList.remove("taskPriorityActive")
        }
    })
    checkPriority(priorityTask, task)
}

const deleteTaskButton = (parent, task) => {
    let deleteTask = document.createElement('button')
    deleteTask.classList.add("taskDelete")
    parent.appendChild(deleteTask)
    deleteTask.addEventListener("click", function() {
        let index = allTaskArray.indexOf(task)
        allTaskArray.splice(index, 1)
        taskContainer.removeChild(parent)
        if (mainArray == allTaskArray) {
            return
        } else {
            let index = mainArray.indexOf(task)
            mainArray.splice(index, 1)
        }
    })
}

const checkPriority = (button, task) => {
    if (priorityArray.indexOf(task) > -1) {
        button.classList.add("taskPriorityActive")
    }
    if (mainArray == priorityArray) {
        button.classList.add("taskPriorityActive")
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


//tying it all together
const taskAdd = () => {
    let taskArray = getTaskValues()
    let task = taskMaker(taskArray[0], taskArray[1], taskArray[2])
    let taskDiv = displayTask(task)
    addTaskToArray(task, taskDiv)
    clearInput("taskInput")
    toggleTaskPrompt()
}


// page functionality
newTaskButton.addEventListener("click", toggleTaskPrompt)
addTaskCancel.addEventListener("click", toggleTaskPrompt)
addTaskAdd.addEventListener("click", taskAdd)


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
        newProjectButton.style.display ='none'
    } else {
        projectPrompt.style.display = 'none'
        newProjectButton.style.display ='block'
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


//display
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

// project logic
const projectAdd = () => {
    let newProject = getProjectValues()
    newProject = projectMaker(newProject)
    let newProjectButton = projectDisplay(newProject.title, projectContainer)
    projectClickHandler(newProjectButton, newProject.tasks, newProject.title)
    projectDisplayTasks(newProjectButton, newProject.tasks)
    projectDeleteButton(newProjectButton, newProject.tasks)
    clearInput("projectInput")
    toggleProjectPrompt()
}

const sidebarMain = document.getElementById("sidebarMain")

// dev use, page functionality
const customProjectAdd = (title, array) => {
    let customProjectButton = projectDisplay(title, sidebarMain)
    projectClickHandler(customProjectButton, array, title)
    projectDisplayTasks(customProjectButton, array)
    // remove from final project but keep to reference delete button style
    projectImgSpan(customProjectButton, title)
    return customProjectButton
}

const addProjectAdd = document.getElementById('addProjectAdd')
addProjectAdd.addEventListener("click", projectAdd)


const mainTitle = document.getElementById("mainTitle")

const projectAppendTitle = (title) => {
    mainTitle.textContent = title
}

const allSection = customProjectAdd("All", allTaskArray)
allSection.click()
customProjectAdd("Priority", priorityArray)

let other = taskMaker("json and dates", "definitely add json stuff, take a look at calendar stuff, consider adding", "2022-22-06")
displayTask(other)
let bobobobo = taskMaker("add completedTask style", "consider fading it and striking through all the text or just the title", "2022-21-06")
displayTask(bobobobo)
let hi = taskMaker("empty project name", "make it so trash can appears on far right regardless of name. try adding class to icons")
displayTask(hi)