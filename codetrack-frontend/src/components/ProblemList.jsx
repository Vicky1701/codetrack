import { useState } from 'react'
import ProblemCard from './ProblemCard'
import EditProblemForm from './EditProblemForm'
import { deleteProblem } from '../services/problemService'

const ProblemList = ({
  problems,
  searchTerm,
  selectedPattern,
  filter,
  sortBy,
  sortOrder,
  onRefresh,
}) => {
  const [editingId, setEditingId] = useState(null)

  const filteredProblems = problems.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPattern = selectedPattern === 'all' || p.pattern === selectedPattern
    const revisionInterval = p.revisionInterval || 7
    const matchesFilter = filter === 'all' || 
      (filter === 'revision' && 
       (!p.lastRevised || 
        (Date.now() - new Date(p.lastRevised)) / (1000 * 60 * 60 * 24) > revisionInterval))
    
    return matchesSearch && matchesPattern && matchesFilter
  })

  const sortedProblems = [...filteredProblems].sort((a, b) => {
    let comparison = 0
    
    switch (sortBy) {
      case 'date':
        comparison = new Date(a.createdAt) - new Date(b.createdAt)
        break
      case 'title':
        comparison = a.title.localeCompare(b.title)
        break
      case 'difficulty':
        const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 }
        comparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        break
      case 'revisionCount':
        comparison = a.revisionCount - b.revisionCount
        break
      default:
        return 0
    }
    
    return sortOrder === 'asc' ? comparison : -comparison
  })

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this problem?')) {
      try {
        await deleteProblem(id)
        onRefresh()
      } catch (error) {
        alert('Error deleting problem: ' + error.message)
      }
    }
  }

  if (sortedProblems.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <p>No problems found. Add your first problem to get started!</p>
      </div>
    )
  }

  const editingProblem = problems.find(p => p.id === editingId)

  return (
    <>
      {editingProblem && (
        <EditProblemForm
          problem={editingProblem}
          onClose={() => setEditingId(null)}
          onSuccess={() => {
            setEditingId(null)
            onRefresh()
          }}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProblems.map(problem => (
          <ProblemCard
            key={problem.id}
            problem={problem}
            onDelete={handleDelete}
            onRefresh={onRefresh}
            isEditing={editingId === problem.id}
            onEdit={() => setEditingId(problem.id)}
            onCancelEdit={() => setEditingId(null)}
          />
        ))}
      </div>
    </>
  )
}

export default ProblemList

