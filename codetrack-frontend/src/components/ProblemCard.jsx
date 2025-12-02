import { useState } from 'react'
import { Clock, ExternalLink, Trash2, RotateCcw, Edit, Timer as TimerIcon, CheckSquare, Square } from 'lucide-react'
import { markRevision } from '../services/problemService'
import RevisionModal from './RevisionModal'
import Timer from './Timer'

const ProblemCard = ({ problem, onDelete, onRefresh, isEditing, onEdit, onCancelEdit, isSelected, onToggleSelect }) => {
  const [showRevisionModal, setShowRevisionModal] = useState(false)
  const [showTimer, setShowTimer] = useState(false)
  
  const revisionInterval = problem.revisionInterval || 7
  const needsRevision = !problem.lastRevised || 
    (Date.now() - new Date(problem.lastRevised)) / (1000 * 60 * 60 * 24) > revisionInterval

  const handleTimeComplete = async (minutes) => {
    try {
      await markRevision(problem.id, {
        date: new Date().toISOString(),
        timeSpent: minutes,
        rating: null,
      })
      setShowTimer(false)
      onRefresh()
    } catch (error) {
      alert('Error saving time: ' + error.message)
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Low':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'High':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'Critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 ${
      needsRevision ? 'border-2 border-yellow-400' : ''
    } ${isSelected ? 'ring-2 ring-indigo-500' : ''}`}>
      <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          {onToggleSelect && (
            <button
              onClick={onToggleSelect}
              className="mt-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 flex-shrink-0"
              title="Select"
            >
              {isSelected ? (
                <CheckSquare className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              ) : (
                <Square className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          )}
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white flex-1 break-words">
            {problem.title}
          </h3>
        </div>
        <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
          <button
            onClick={onEdit}
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 p-1"
            title="Edit"
          >
            <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => onDelete(problem.id)}
            className="text-red-600 dark:text-red-400 hover:text-red-800 p-1"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
        <span className="px-2 sm:px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-xs sm:text-sm">
          {problem.pattern}
        </span>
        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${getDifficultyColor(problem.difficulty)}`}>
          {problem.difficulty}
        </span>
        {problem.priority && (
          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${getPriorityColor(problem.priority)}`}>
            {problem.priority}
          </span>
        )}
        {problem.platform && (
          <span className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-xs sm:text-sm">
            {problem.platform}
          </span>
        )}
        {problem.averageRating > 0 && (
          <span className="px-2 sm:px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs sm:text-sm flex items-center gap-1">
            ⭐ {problem.averageRating.toFixed(1)}
          </span>
        )}
      </div>

      {problem.tags && problem.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {problem.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {problem.notes && (
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">General Notes:</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
            {problem.notes}
          </p>
        </div>
      )}

      {problem.approaches && problem.approaches.length > 0 && (
        <div className="mb-4 space-y-3">
          <p className="text-gray-700 dark:text-gray-300 text-sm font-semibold">
            Approaches ({problem.approaches.length}):
          </p>
          {problem.approaches.slice(0, 2).map((approach, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
              {approach.notes && (
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-2 line-clamp-2">
                  {approach.notes}
                </p>
              )}
              {approach.code && (
                <div className="bg-gray-900 rounded p-2 overflow-x-auto">
                  <pre className="text-green-400 text-xs font-mono whitespace-pre-wrap line-clamp-3">
                    {approach.code}
                  </pre>
                </div>
              )}
            </div>
          ))}
          {problem.approaches.length > 2 && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              +{problem.approaches.length - 2} more approach(es)
            </p>
          )}
        </div>
      )}

      {problem.link && (
        <a
          href={problem.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 mb-4 text-sm"
        >
          <ExternalLink className="w-4 h-4" />
          View Problem
        </a>
      )}

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 space-y-2">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>First Solved:</span>
          <span>{new Date(problem.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Revisions:</span>
          <span>{problem.revisionCount}</span>
        </div>
        {problem.lastRevised && (
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Last Revised:</span>
            <span>{new Date(problem.lastRevised).toLocaleDateString()}</span>
          </div>
        )}
        {problem.totalTimeSpent > 0 && (
          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>Total Time: {problem.totalTimeSpent} min</span>
          </div>
        )}
      </div>

      {needsRevision && (
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-yellow-800 dark:text-yellow-200 text-sm font-medium">
            ⏰ This problem needs revision!
          </p>
        </div>
      )}

      <div className="space-y-2 mt-4">
        {showTimer ? (
          <Timer problemId={problem.id} onTimeComplete={handleTimeComplete} />
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setShowRevisionModal(true)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Revise
            </button>
            <button
              onClick={() => setShowTimer(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
              title="Start Timer"
            >
              <TimerIcon className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {showRevisionModal && (
        <RevisionModal
          problem={problem}
          onClose={() => setShowRevisionModal(false)}
          onSuccess={onRefresh}
        />
      )}
    </div>
  )
}

export default ProblemCard

