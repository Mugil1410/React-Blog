import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className='Footer'>&copy; developed by mugil @ {year}</footer>
   
  )
}

export default Footer
