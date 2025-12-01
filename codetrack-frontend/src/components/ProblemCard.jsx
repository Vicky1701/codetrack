import { Clock, ExternalLink, Trash2, RotateCcw, Edit } from 'lucide-react'
import { markRevision } from '../services/problemService'

const ProblemCard = ({ problem, onDelete, onRefresh, isEditing, onEdit, onCancelEdit }) => {
  const revisionInterval = problem.revisionInterval || 7
  const needsRevision = !problem.lastRevised || 
    (Date.now() - new Date(problem.lastRevised)) / (1000 * 60 * 60 * 24) > revisionInterval

  const handleRevision = async () => {
    try {
      await markRevision(problem.id, {
        date: new Date().toISOString(),
        timeSpent: null,
        rating: null,
      })
      onRefresh()
    } catch (error) {
      alert('Error marking revision: ' + error.message)
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

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${
      needsRevision ? 'border-2 border-yellow-400' : ''
    }`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white flex-1">
          {problem.title}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800"
            title="Edit"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(problem.id)}
            className="text-red-600 dark:text-red-400 hover:text-red-800"
            title="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm">
          {problem.pattern}
        </span>
        <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(problem.difficulty)}`}>
          {problem.difficulty}
        </span>
        {problem.platform && (
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm">
            {problem.platform}
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
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-3">
          {problem.notes}
        </p>
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

      <div className="flex gap-2 mt-4">
        <button
          onClick={handleRevision}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          Revise
        </button>
      </div>
    </div>
  )
}

export default ProblemCard

