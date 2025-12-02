import { Moon, Sun, Code2, LogOut, User, Settings } from 'lucide-react'
import { logout } from '../services/authService'

const Header = ({ theme, toggleTheme, user, onLogout, onProfileClick }) => {
  const handleLogout = () => {
    logout()
    onLogout()
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <Code2 className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white truncate">
              DSA Problem Tracker
            </h1>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4 flex-shrink-0">
            {user && (
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <User className="w-4 h-4" />
                <span className="hidden lg:inline">{user.username}</span>
              </div>
            )}
            {onProfileClick && (
              <button
                onClick={onProfileClick}
                className="flex items-center justify-center p-2 sm:px-4 sm:py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                title="Profile"
              >
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden md:inline ml-2">Profile</span>
              </button>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center p-2 sm:px-4 sm:py-2 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden md:inline ml-2">Logout</span>
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

