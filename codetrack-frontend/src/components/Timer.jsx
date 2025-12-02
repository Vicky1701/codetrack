import { useState, useEffect, useRef } from 'react'
import { Play, Pause, Square } from 'lucide-react'

const Timer = ({ problemId, onTimeComplete }) => {
  const [isRunning, setIsRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1)
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isRunning])

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const secs = totalSeconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStart = () => {
    setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleStop = () => {
    setIsRunning(false)
    const minutes = Math.floor(seconds / 60)
    if (minutes > 0 && onTimeComplete) {
      onTimeComplete(minutes)
    }
    setSeconds(0)
  }

  return (
    <div className="flex items-center gap-2 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
      <div className="flex-1">
        <div className="text-2xl font-mono font-bold text-indigo-600 dark:text-indigo-400">
          {formatTime(seconds)}
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">
          {Math.floor(seconds / 60)} minutes
        </div>
      </div>
      <div className="flex gap-2">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            title="Start Timer"
          >
            <Play className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="p-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
            title="Pause Timer"
          >
            <Pause className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={handleStop}
          className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          title="Stop Timer"
        >
          <Square className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default Timer

