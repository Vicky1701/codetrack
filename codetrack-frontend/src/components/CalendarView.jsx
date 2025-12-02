import { useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'

const CalendarView = ({ problems, onDateClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const getProblemsForDate = (day) => {
    const date = new Date(year, month, day)
    date.setHours(0, 0, 0, 0)
    const dateStr = date.toDateString()
    
    return problems.filter(p => {
      // Check solvedDates first
      if (p.solvedDates && p.solvedDates.length > 0) {
        const hasMatch = p.solvedDates.some(sd => {
          try {
            const dateValue = sd.date || sd
            if (!dateValue) return false
            const solveDate = new Date(dateValue)
            if (isNaN(solveDate.getTime())) return false
            solveDate.setHours(0, 0, 0, 0)
            return solveDate.toDateString() === dateStr
          } catch (e) {
            return false
          }
        })
        if (hasMatch) return true
      }
      
      // Fallback to createdAt if no solvedDates
      if (p.createdAt) {
        try {
          const createdDate = new Date(p.createdAt)
          createdDate.setHours(0, 0, 0, 0)
          return createdDate.toDateString() === dateStr
        } catch (e) {
          return false
        }
      }
      
      return false
    })
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const days = []
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
            {monthNames[month]} {year}
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={goToPreviousMonth}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 py-1 sm:py-2">
            {day.substring(0, 3)}
          </div>
        ))}
        {days.map((day, index) => {
          if (day === null) {
            return <div key={index} className="aspect-square" />
          }
          const dayProblems = getProblemsForDate(day)
          const count = dayProblems.length
          return (
            <button
              key={day}
              onClick={() => onDateClick && onDateClick(new Date(year, month, day))}
              className={`aspect-square p-1 sm:p-2 rounded-lg border-2 transition-all ${
                count > 0
                  ? 'bg-indigo-100 dark:bg-indigo-900 border-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800'
                  : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              <div className="text-xs sm:text-sm font-medium text-gray-800 dark:text-white mb-0.5 sm:mb-1">
                {day}
              </div>
              {count > 0 && (
                <div className="text-[10px] sm:text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  {count}
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarView

