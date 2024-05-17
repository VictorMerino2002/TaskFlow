class StreakManager {

    static streakElement = document.getElementById('streak')

    static getStreak() {
        return localStorage.getItem('streak')
    }

    static setStreak(streak) {
        localStorage.setItem('streak',streak)
    }

    static setStreakElementValue () {
        let streak = JSON.parse(this.getStreak())
        this.streakElement.innerText = streak
    }

    static increaseStreak() {
        if (StorageManager.isAllComplete()) {
            if (DateManager.checkConsecutiveDate()) {
                let streak = StreakManager.getStreak() ? JSON.parse(StreakManager.getStreak()) + 1 : 1
                StreakManager.setStreak(streak)
                StreakManager.setStreakElementValue()
            } else if (!DateManager.equalsDates(DateManager.getLastCompleteDate(),DateManager.actualDate)){
                StreakManager.setStreak(1)
                StreakManager.setStreakElementValue()
            }
            DateManager.setLastCompleteDate(DateManager.actualDate)
        }
    }
}