import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { updateProblem } from '../services/problemService'

const EditProblemForm = ({ problem, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    pattern: '',
    difficulty: 'Medium',
    platform: '',
    link: '',
    notes: '',
    tags: [],
    priority: 'Medium',
    revisionInterval: 7,
  })

  const [tagInput, setTagInput] = useState('')

  useEffect(() => {
    if (problem) {
      setFormData({
        title: problem.title || '',
        pattern: problem.pattern || '',
        difficulty: problem.difficulty || 'Medium',
        platform: problem.platform || '',
        link: problem.link || '',
        notes: problem.notes || '',
        tags: problem.tags || [],
        priority: problem.priority || 'Medium',
        revisionInterval: problem.revisionInterval || 7,
      })
    }
  }, [problem])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title || !formData.pattern) {
      alert('Please fill in title and pattern')
      return
    }

    try {
      await updateProblem(problem.id, formData)
      onSuccess()
      onClose()
    } catch (error) {
      alert('Error updating problem: ' + error.message)
    }
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      })
      setTagInput('')
    }
  }

  const removeTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag),
    })
  }

  if (!problem) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Problem</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Pattern *
              </label>
              <select
                required
                value={formData.pattern}
                onChange={(e) => setFormData({ ...formData, pattern: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                <option value="">Select Pattern</option>
                <option value="Sliding Window">Sliding Window</option>
                <option value="Two Pointers">Two Pointers</option>
                <option value="Fast & Slow Pointers">Fast & Slow Pointers</option>
                <option value="Merge Intervals">Merge Intervals</option>
                <option value="Cyclic Sort">Cyclic Sort</option>
                <option value="In-place Reversal of a LinkedList">In-place Reversal of a LinkedList</option>
                <option value="Tree Breadth First Search">Tree Breadth First Search</option>
                <option value="Tree Depth First Search">Tree Depth First Search</option>
                <option value="Two Heaps">Two Heaps</option>
                <option value="Subsets">Subsets</option>
                <option value="Modified Binary Search">Modified Binary Search</option>
                <option value="Bitwise XOR">Bitwise XOR</option>
                <option value="Top 'K' Elements">Top 'K' Elements</option>
                <option value="K-way Merge">K-way Merge</option>
                <option value="0-1 Knapsack (Dynamic Programming)">0-1 Knapsack (Dynamic Programming)</option>
                <option value="Topological Sort (Graph)">Topological Sort (Graph)</option>
                <option value="Math Basic">Math Basic</option>
                <option value="PatternsType(*)">PatternsType(*)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Platform
              </label>
              <input
                type="text"
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Revision Interval (days)
              </label>
              <input
                type="number"
                min="1"
                value={formData.revisionInterval}
                onChange={(e) => setFormData({ ...formData, revisionInterval: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Link
            </label>
            <input
              type="url"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Add tag and press Enter"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Update Problem
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProblemForm

