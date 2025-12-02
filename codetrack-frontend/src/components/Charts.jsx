import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const Charts = ({ problems }) => {
  // Problems over time data
  const problemsOverTime = () => {
    const data = {}
    problems.forEach(p => {
      const date = new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      data[date] = (data[date] || 0) + 1
    })
    return Object.entries(data)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-30) // Last 30 days
  }

  // Difficulty distribution
  const difficultyData = () => {
    const dist = { Easy: 0, Medium: 0, Hard: 0 }
    problems.forEach(p => {
      if (dist[p.difficulty] !== undefined) {
        dist[p.difficulty]++
      }
    })
    return Object.entries(dist).map(([name, value]) => ({ name, value }))
  }

  // Pattern distribution
  const patternData = () => {
    const dist = {}
    problems.forEach(p => {
      dist[p.pattern] = (dist[p.pattern] || 0) + 1
    })
    return Object.entries(dist)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8) // Top 8 patterns
  }

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16']

  return (
    <div className="space-y-6 mb-8">
      {/* Problems Over Time */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
          Problems Solved Over Time
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={problemsOverTime()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Difficulty Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
            Difficulty Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={difficultyData()}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {difficultyData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Pattern Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
            Top Patterns
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={patternData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Charts

