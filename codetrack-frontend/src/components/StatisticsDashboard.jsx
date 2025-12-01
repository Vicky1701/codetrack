import { BarChart3, TrendingUp, Clock, Star } from 'lucide-react'

const StatisticsDashboard = ({ problems }) => {
  const stats = calculateStats(problems)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard
        title="Total Problems"
        value={stats.total}
        icon={<BarChart3 className="w-6 h-6" />}
        color="bg-blue-500"
      />
      <StatCard
        title="Current Streak"
        value={`${stats.currentStreak} 🔥`}
        icon={<TrendingUp className="w-6 h-6" />}
        color="bg-orange-500"
      />
      <StatCard
        title="Avg Time"
        value={`${stats.avgTime} min`}
        icon={<Clock className="w-6 h-6" />}
        color="bg-green-500"
      />
      <StatCard
        title="Needs Revision"
        value={stats.needsRevision}
        icon={<Star className="w-6 h-6" />}
        color="bg-red-500"
      />
    </div>
  )
}

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
            {value}
          </p>
        </div>
        <div className={`${color} text-white p-3 rounded-lg`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

const calculateStats = (problems) => {
  const total = problems.length
  const needsRevision = problems.filter(p => {
    if (!p.lastRevised) return true
    const daysSince = (Date.now() - new Date(p.lastRevised)) / (1000 * 60 * 60 * 24)
    const interval = p.revisionInterval || 7
    return daysSince > interval
  }).length

  const totalTime = problems.reduce((sum, p) => sum + (p.totalTimeSpent || 0), 0)
  const avgTime = total > 0 ? Math.round(totalTime / total) : 0

  // Calculate streak based on solved dates
  let currentStreak = 0
  if (problems.length > 0) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    // Get all unique solve dates from all problems
    const allSolveDates = problems
      .flatMap(p => p.solvedDates || [])
      .map(sd => {
        const date = new Date(sd.date || sd)
        date.setHours(0, 0, 0, 0)
        return date.getTime()
      })
      .filter((date, index, self) => self.indexOf(date) === index) // Unique dates
      .sort((a, b) => b - a) // Sort descending
    
    // Calculate streak
    let checkDate = today.getTime()
    for (const solveDate of allSolveDates) {
      const daysDiff = (checkDate - solveDate) / (1000 * 60 * 60 * 24)
      if (daysDiff <= 1) {
        currentStreak++
        checkDate = solveDate - (1000 * 60 * 60 * 24) // Move to previous day
      } else {
        break
      }
    }
  }

  return { total, needsRevision, avgTime, currentStreak }
}

export default StatisticsDashboard

