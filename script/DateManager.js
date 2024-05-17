class DateManager {

    static actualDate = new Date()

    static getLastDate() {
        return localStorage.getItem('lastTime')
    }

    static setLastDate(time) {
        localStorage.setItem('lastTime',time)
    }

    static equalsDates(date1,date2) {
        return (date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear())
    }

    static getLastCompleteDate () {
        return new  Date(localStorage.getItem('lastCompleteDate'))
    }

    static setLastCompleteDate(date) {
        localStorage.setItem('lastCompleteDate',date)
    }

    static checkConsecutiveDate() {
        let lastDay = new Date(this.actualDate)
        lastDay.setDate(this.actualDate.getDate() -1)
        return this.getLastCompleteDate().getDate() == lastDay.getDate() && this.getLastCompleteDate().getMonth() == lastDay.getMonth() && this.getLastCompleteDate().getFullYear() == lastDay.getFullYear()
    }
}