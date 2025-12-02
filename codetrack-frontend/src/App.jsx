import { useState, useEffect } from 'react'
import Header from './components/Header'
import Login from './components/Login'
import StatisticsDashboard from './components/StatisticsDashboard'
import PatternStatistics from './components/PatternStatistics'
import ControlPanel from './components/ControlPanel'
import ProblemList from './components/ProblemList'
import AddProblemForm from './components/AddProblemForm'
import Charts from './components/Charts'
import CalendarView from './components/CalendarView'
import UserProfile from './components/UserProfile'
import { loadProblems } from './services/problemService'
import { isAuthenticated, getCurrentUser } from './services/authService'

function App() {
  const [authenticated, setAuthenticated] = useState(isAuthenticated())
  const [problems, setProblems] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPattern, setSelectedPattern] = useState('all')
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('dsa-theme')
    return saved || 'light'
  })
  const [user, setUser] = useState(getCurrentUser())
  const [view, setView] = useState('list') // 'list', 'charts', 'calendar'
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    if (authenticated) {
      fetchProblems()
    }
  }, [authenticated])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('dsa-theme', theme)
  }, [theme])

  const fetchProblems = async () => {
    try {
      const data = await loadProblems()
      setProblems(data)
    } catch (error) {
      console.error('Error loading problems:', error)
    }
  }

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const handleLoginSuccess = () => {
    setAuthenticated(true)
    setUser(getCurrentUser())
  }

  const handleLogout = () => {
    setAuthenticated(false)
    setUser(null)
  }

  if (!authenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />
  }

  const handlePatternClick = (pattern) => {
    setSelectedPattern(pattern)
  }

  const handleDateClick = (date) => {
    // Filter problems by date if needed
    console.log('Date clicked:', date)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
        user={user} 
        onLogout={handleLogout}
        onProfileClick={() => setShowProfile(true)}
      />
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        <StatisticsDashboard problems={problems} />
        <PatternStatistics 
          problems={problems} 
          onPatternClick={handlePatternClick}
        />
        
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setView('list')}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg transition-colors ${
              view === 'list'
                ? 'bg-indigo-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            List
          </button>
          <button
            onClick={() => setView('charts')}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg transition-colors ${
              view === 'charts'
                ? 'bg-indigo-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Charts
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg transition-colors ${
              view === 'calendar'
                ? 'bg-indigo-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Calendar
          </button>
        </div>

        <ControlPanel
          onAddClick={() => setShowAddForm(true)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedPattern={selectedPattern}
          onPatternChange={setSelectedPattern}
          filter={filter}
          onFilterChange={setFilter}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          onImportSuccess={fetchProblems}
        />
        
        {showAddForm && (
          <AddProblemForm
            onClose={() => setShowAddForm(false)}
            onSuccess={fetchProblems}
          />
        )}

        {view === 'list' && (
          <ProblemList
            problems={problems}
            searchTerm={searchTerm}
            selectedPattern={selectedPattern}
            filter={filter}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onRefresh={fetchProblems}
          />
        )}

        {view === 'charts' && <Charts problems={problems} />}

        {view === 'calendar' && (
          <CalendarView 
            problems={problems} 
            onDateClick={handleDateClick}
          />
        )}

        {showProfile && (
          <UserProfile onClose={() => setShowProfile(false)} />
        )}
      </div>
    </div>
  )
}

export default App

