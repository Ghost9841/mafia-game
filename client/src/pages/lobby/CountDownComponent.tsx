import React from 'react'

const CountDownComponent = ({ seconds }: { seconds: number }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 text-white text-6xl font-bold">
      Game starting in {seconds} second{seconds !== 1 ? 's' : ''}...
    </div>
  )
}

export default CountDownComponent
