const checkDayAndResetTask = () => {
  let lastDate = DateManager.getLastDate()
  const actualDate = new Date()
  
  if (lastDate) {
    lastDate = new Date(lastDate)
    if (!DateManager.equalsDates(actualDate,lastDate)) {
      StorageManager.resetTasks()
    }
  } 
  DateManager.setLastDate(actualDate)
}

const loadTasks = () => {
  const taskListIds = StorageManager.getTaskListIds()
  const tasks = []

  if (taskListIds) {
    taskListIds.forEach(id => {
      tasks.push(StorageManager.getTask(id))
    })

    tasks.sort((a, b) => parseInt(a.hour) - parseInt(b.hour))
    tasks.forEach(task => {
      new Task(task)
    })
  }

}



StreakManager.setStreakElementValue()
checkDayAndResetTask()
loadTasks()
