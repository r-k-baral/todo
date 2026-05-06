import React, { useEffect, useState } from 'react'
import '../style/time.css'

const Time = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="time">
      <div className="time-text">
        {time.toLocaleTimeString()}
      </div>
    </div>
  )
}

export default Time