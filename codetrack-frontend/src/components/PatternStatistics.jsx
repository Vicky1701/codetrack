import { BarChart3 } from 'lucide-react'

const PatternStatistics = ({ problems, onPatternClick }) => {
  const patternCounts = {}
  
  problems.forEach(p => {
    patternCounts[p.pattern] = (patternCounts[p.pattern] || 0) + 1
  })

  const sortedPatterns = Object.entries(patternCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12) // Show top 12 patterns

  if (sortedPatterns.length === 0) {
    return null
  }

  const maxCount = Math.max(...sortedPatterns.map(([_, count]) => count))

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
          Pattern Statistics
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
        {sortedPatterns.map(([pattern, count]) => {
          const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0
          return (
            <button
              key={pattern}
              onClick={() => onPatternClick && onPatternClick(pattern)}
              className="text-left p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                  {pattern}
                </span>
                <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                  {count}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default PatternStatistics

