import { useState } from 'react'
import { Trash2, RotateCcw, Tag, CheckSquare, Square } from 'lucide-react'
import { deleteProblem, markRevision } from '../services/problemService'

const BulkOperations = ({ problems, selectedIds, setSelectedIds, onRefresh }) => {
  const [showTagInput, setShowTagInput] = useState(false)
  const [tagInput, setTagInput] = useState('')

  const handleSelectAll = () => {
    if (selectedIds.length === problems.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(problems.map(p => p.id))
    }
  }

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return
    if (!window.confirm(`Delete ${selectedIds.length} problem(s)?`)) return

    try {
      for (const id of selectedIds) {
        await deleteProblem(id)
      }
      setSelectedIds([])
      onRefresh()
    } catch (error) {
      alert('Error deleting problems: ' + error.message)
    }
  }

  const handleBulkRevise = async () => {
    if (selectedIds.length === 0) return

    try {
      for (const id of selectedIds) {
        await markRevision(id, {
          date: new Date().toISOString(),
          timeSpent: null,
          rating: null,
        })
      }
      setSelectedIds([])
      onRefresh()
    } catch (error) {
      alert('Error marking revisions: ' + error.message)
    }
  }

  const handleBulkAddTag = async () => {
    if (selectedIds.length === 0 || !tagInput.trim()) return

    // Note: This would require a backend endpoint to update tags
    // For now, we'll show a message
    alert(`Bulk tag feature requires backend endpoint. Would add tag "${tagInput}" to ${selectedIds.length} problems.`)
    setTagInput('')
    setShowTagInput(false)
  }

  if (selectedIds.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <button
          onClick={handleSelectAll}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          <Square className="w-4 h-4" />
          Select All ({problems.length})
        </button>
      </div>
    )
  }

  return (
    <div className="bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-400 rounded-lg shadow-md p-3 sm:p-4 mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2">
          <CheckSquare className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
          <span className="text-sm sm:text-base font-semibold text-indigo-800 dark:text-indigo-200">
            {selectedIds.length} problem(s) selected
          </span>
        </div>
        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
          <button
            onClick={handleSelectAll}
            className="px-2 sm:px-3 py-1 text-xs sm:text-sm border border-indigo-300 dark:border-indigo-700 rounded-lg text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40"
          >
            {selectedIds.length === problems.length ? 'Deselect' : 'Select All'}
          </button>
          <button
            onClick={handleBulkRevise}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs sm:text-sm"
          >
            <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Mark Revised</span>
          </button>
          {!showTagInput ? (
            <button
              onClick={() => setShowTagInput(true)}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm"
            >
              <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Add Tag</span>
            </button>
          ) : (
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleBulkAddTag()}
                placeholder="Tag name"
                className="flex-1 sm:flex-none px-2 sm:px-3 py-1 text-xs sm:text-sm border border-indigo-300 dark:border-indigo-700 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              />
              <button
                onClick={handleBulkAddTag}
                className="px-2 sm:px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setShowTagInput(false)
                  setTagInput('')
                }}
                className="px-2 sm:px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 text-xs sm:text-sm"
              >
                Cancel
              </button>
            </div>
          )}
          <button
            onClick={handleBulkDelete}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs sm:text-sm"
          >
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Delete</span>
          </button>
          <button
            onClick={() => setSelectedIds([])}
            className="px-2 sm:px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}

export default BulkOperations

