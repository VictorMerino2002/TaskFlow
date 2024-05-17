class Task {

    elementContainer = document.getElementById('task-container')

    id

    name

    hour

    complete

    taskElement

    modal

    constructor({id,name,hour,color = "#fff",complete=false}) {
        this.id = id
        this.name = name
        this.hour = hour
        this.color = color
        this.complete = complete
        this.taskElement = this.addElemnt()
        this.modal = this.addModal()

        this.taskElement.taskData.addEventListener('click', () => this.modal.style.display = 'flex')
    }
    
    addElemnt() {
        const taskElement = document.createElement('div')
        taskElement.className = 'task'
        taskElement.style.border = '1px solid' + this.color
        
        const taskData = document.createElement('div')
        taskData.className = 'task-data'
        
        const nameText = document.createElement('h2')
        nameText.style.color = this.color
        nameText.innerText = this.name
        taskData.appendChild(nameText)
        
        const hourText = document.createElement('h2')
        hourText.innerText = this.hour
        taskData.appendChild(hourText)
        taskElement.appendChild(taskData)
        
        const checkButton = document.createElement('button')
        checkButton.className = 'check-btn'
        checkButton.innerText = this.complete ? "✓" : ""
        
        checkButton.addEventListener('click',()=> {
            this.toggleComplete(checkButton)
            StreakManager.increaseStreak()
        })

        taskElement.appendChild(checkButton)
        
        this.elementContainer.appendChild(taskElement)

        const task = {
            container : taskElement,
            taskData : taskData,
            data : taskData,
            name : nameText,
            hour : hourText,
            checkButton : checkButton
        }

        return task
    }

    addModal() {
        const modal = document.createElement('form')
        modal.className = 'task-modal'

        const nameInput = document.createElement('input')
        nameInput.value = this.name
        nameInput.style.color = this.color
        modal.appendChild(nameInput)

        const hourInput = document.createElement('input')
        hourInput.type =  'time'
        hourInput.value = this.hour
        modal.appendChild(hourInput)

        const colorInput = document.createElement('input')
        colorInput.type = "color"
        colorInput.value = this.color
        colorInput.addEventListener('change',() => {
            nameInput.style.color = colorInput.value
        })
        modal.appendChild(colorInput)

        const closeBtn = document.createElement('button')
        closeBtn.type = 'button'
        closeBtn.className = 'close-btn'
        closeBtn.innerText = 'x'
        closeBtn.addEventListener('click',() => modal.style.display = 'none')
        modal.appendChild(closeBtn)

        const deleteBtn = document.createElement('button')
        deleteBtn.type = 'button'
        deleteBtn.className = 'delete-btn'
        deleteBtn.innerHTML = 'Delete task<i class="fa-solid fa-trash-can"></i>'
        deleteBtn.addEventListener('click',() => {
            if(confirm('Are you sure you want to delete the task "'+this.name+'"'))this.deleteTask()
        })
        modal.appendChild(deleteBtn)

        const updateBtn = document.createElement('button')
        updateBtn.type = 'submit'
        updateBtn.innerText =  'Update task'
        updateBtn.className = 'update-btn'
        modal.appendChild(updateBtn)

        modal.addEventListener('submit',(e) => {
            e.preventDefault()
            this.updateTask(nameInput.value,hourInput.value,colorInput.value)
        })

        this.elementContainer.appendChild(modal)

        return modal
    }
    
    toggleComplete(button) {
        this.complete = !this.complete
        button.innerText = this.complete ? "✓" : ""
        StorageManager.setTask(this.id,{id:this.id,name:this.name,hour:this.hour,color:this.color,complete:this.complete})
    }

    deleteTask() {
        this.elementContainer.removeChild(this.taskElement.container)
        this.modal.style.display = 'none'
        StorageManager.deleteTask(this.id)
    }

    updateTask(newName,newHour,newColor) {
        this.name = newName
        this.hour = newHour
        this.color = newColor

        this.updateData()
        StorageManager.setTask(this.id,{id:this.id,name:this.name,hour:this.hour,color:this.color,complete:this.complete})
    }

    updateData() {
        this.taskElement.name.innerText = this.name
        this.taskElement.hour.innerText = this.hour
        this.taskElement.name.style.color = this.color
    }
}