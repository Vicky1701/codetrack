import { Download, Upload } from 'lucide-react'
import { loadProblems, importData } from '../services/problemService'

const ExportImport = ({ onImportSuccess }) => {
  const handleExport = async () => {
    try {
      const problems = await loadProblems()
      const dataStr = JSON.stringify(problems, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `codetrack-problems-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      alert('Data exported successfully!')
    } catch (error) {
      alert('Error exporting data: ' + error.message)
    }
  }

  const handleImport = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const imported = JSON.parse(e.target.result)
        const mergeMode = window.confirm(
          'Merge with existing data? (Click OK to merge, Cancel to replace all)'
        )

        try {
          // Try backend API first
          await importData({ problems: imported, merge: mergeMode })
          alert('Data imported successfully!')
          if (onImportSuccess) {
            onImportSuccess()
          }
        } catch (apiError) {
          // Fallback to localStorage if API fails
          if (mergeMode) {
            const existing = await loadProblems()
            const merged = [...existing, ...imported]
            localStorage.setItem('dsa-problems', JSON.stringify(merged))
          } else {
            localStorage.setItem('dsa-problems', JSON.stringify(imported))
          }
          alert('Data imported successfully (local storage)!')
          if (onImportSuccess) {
            onImportSuccess()
          }
        }
      } catch (error) {
        alert('Error importing data: ' + error.message)
      }
    }
    reader.readAsText(file)
    event.target.value = '' // Reset file input
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={handleExport}
        className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-xs sm:text-sm"
        title="Export Data"
      >
        <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Export</span>
      </button>
      <label className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs sm:text-sm cursor-pointer">
        <Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Import</span>
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </label>
    </div>
  )
}

export default ExportImport

