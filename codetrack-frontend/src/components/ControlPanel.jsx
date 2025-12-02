import { Plus, Search } from 'lucide-react'
import ExportImport from './ExportImport'

const ControlPanel = ({
  onAddClick,
  searchTerm,
  onSearchChange,
  selectedPattern,
  onPatternChange,
  filter,
  onFilterChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  onImportSuccess,
}) => {
  const patterns = [
    'all',
    'Sliding Window',
    'Two Pointers',
    'Fast & Slow Pointers',
    'Merge Intervals',
    'Cyclic Sort',
    'In-place Reversal of a LinkedList',
    'Tree Breadth First Search',
    'Tree Depth First Search',
    'Two Heaps',
    'Subsets',
    'Modified Binary Search',
    'Bitwise XOR',
    "Top 'K' Elements",
    'K-way Merge',
    '0-1 Knapsack (Dynamic Programming)',
    'Topological Sort (Graph)',
    'Math Basic',
    'PatternsType(*)'
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
      <div className="flex flex-col gap-3 sm:gap-4">
        {/* First row: Add button and Export/Import */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            onClick={onAddClick}
            className="flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg transition-colors text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Add Problem</span>
          </button>
          <ExportImport onImportSuccess={onImportSuccess} />
        </div>

        {/* Second row: Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder="Search problems..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 sm:pl-10 pr-4 py-2.5 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Third row: Filters and Sort */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          <select
            value={selectedPattern}
            onChange={(e) => onPatternChange(e.target.value)}
            className="col-span-2 sm:col-span-1 px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {patterns.map(pattern => (
              <option key={pattern} value={pattern}>
                {pattern === 'all' ? 'All Patterns' : pattern.length > 20 ? pattern.substring(0, 20) + '...' : pattern}
              </option>
            ))}
          </select>

          <select
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Problems</option>
            <option value="revision">Needs Revision</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="date">Date</option>
            <option value="title">Title</option>
            <option value="difficulty">Difficulty</option>
            <option value="revisionCount">Revisions</option>
          </select>

          <button
            onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-3 sm:px-4 py-2.5 text-lg sm:text-xl border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ControlPanel

