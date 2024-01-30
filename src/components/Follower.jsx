import React, { useEffect } from 'react'

const CursorFollower = () => {

useEffect(() => {
    const follower = document.getElementById('follower')

    const handleMouseMove = (e) => {
        follower.style.left = `${e.clientX - 250}px`
        follower.style.top = `${e.clientY - 250}px`
    }

    const centerCursor = () => {
        const rect = follower.getBoundingClientRect();
        follower.style.left = `${window.innerWidth / 2 - rect.width / 2}px`
        follower.style.top = `${window.innerHeight / 2 - rect.height / 2}px`
    }

    centerCursor()

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
        document.removeEventListener('mousemove', handleMouseMove)
    }
}, [
    
])

  return (
    <div id="follower"></div>
  )
}

export default CursorFollower