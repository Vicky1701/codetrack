import { useState, useEffect } from 'react'
import Header from './components/Header'
import Login from './components/Login'
import StatisticsDashboard from './components/StatisticsDashboard'
import ControlPanel from './components/ControlPanel'
import ProblemList from './components/ProblemList'
import AddProblemForm from './components/AddProblemForm'
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header theme={theme} toggleTheme={toggleTheme} user={user} onLogout={handleLogout} />
      <div className="container mx-auto px-4 py-8">
        <StatisticsDashboard problems={problems} />
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
        />
        {showAddForm && (
          <AddProblemForm
            onClose={() => setShowAddForm(false)}
            onSuccess={fetchProblems}
          />
        )}
        <ProblemList
          problems={problems}
          searchTerm={searchTerm}
          selectedPattern={selectedPattern}
          filter={filter}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onRefresh={fetchProblems}
        />
      </div>
    </div>
  )
}

export default App

