class StorageManager {

    static getLastId() {
        return JSON.parse(localStorage.getItem('lastId'))
    }
    
    static getTaskListIds() {
        return JSON.parse(localStorage.getItem('taskListIds'))
    }

    static setTaskListIds(list) {
        localStorage.setItem('taskListIds',JSON.stringify(list))
    }

    static getTask(id) {
        return JSON.parse(localStorage.getItem(id))
    }

    static setTask(id,taskValues) {
        localStorage.setItem(id,JSON.stringify(taskValues))
    }

    static addTaskListId (id) {
        let taskListIds = this.getTaskListIds()
        if (taskListIds) {
            taskListIds.push('task-'+id)
            localStorage.setItem('taskListIds',JSON.stringify(taskListIds))
        } else {
            localStorage.setItem('taskListIds',JSON.stringify(['task-'+id]))
        }
    }

    static addTask({name,hour,color}) {
        let id = this.getLastId() ? this.getLastId() + 1 : 1

        localStorage.setItem('lastId',id)
        this.addTaskListId(id)

        const taskValues = {id:'task-'+id,name:name,hour:hour,color:color,complete:false}
        
        localStorage.setItem('task-'+id,JSON.stringify(taskValues))
        new Task(taskValues)
    }

    static deleteTask(id) {
        localStorage.removeItem(id)

        let taskListIds = this.getTaskListIds()
        const index = taskListIds.indexOf(id)
        taskListIds.splice(index,1)
        this.setTaskListIds(taskListIds)
    }

    static resetTasks() {
        const taskListIds = this.getTaskListIds()

        taskListIds.forEach(id => {
            const task = this.getTask(id)

            localStorage.setItem(id,JSON.stringify({id:id,name:task.name,hour:task.hour,color:task.color,complete:false}))
        })
    }

    static isAllComplete() {
        const taskListIds = this.getTaskListIds()

        let allComplete = true
        taskListIds.forEach(id => {
            const task = this.getTask(id)

            if(!task.complete) allComplete = false
        })
        return allComplete
    }
}