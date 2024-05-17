const AddTask = {
    
    element : document.getElementById('add-btn'),
    modal: document.getElementById('add-task-modal'),
    closeBtn : document.getElementById('close-add-task-btn'),

    openModal : function() {
        this.modal.style.display = 'flex'
    },

    closeModal : function() {
        this.modal.style.display = 'none'
    }

}

AddTask.element.addEventListener('click',() => AddTask.openModal())
AddTask.closeBtn.addEventListener('click',() => AddTask.closeModal())

AddTask.modal.addEventListener('submit',(e) =>{
    e.preventDefault()

    let name = document.getElementById('newNameTask')
    let hour = document.getElementById('newHourTask')
    let color = document.getElementById('newColorTask')

    if (!name.value) {
        alert("El nombre de la tarea no puede estar vacio.")
        return
    }

    color.value = color.value === '#000000' ? '#fff' : color.value

    const taskValues = {name:name.value,hour:hour.value,color:color.value}

    StorageManager.addTask(taskValues)
    name.value = ''
    hour.value = ''
    color.value = '#000'
    AddTask.closeModal()
})