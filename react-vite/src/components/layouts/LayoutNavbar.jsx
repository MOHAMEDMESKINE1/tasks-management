import React from 'react'

export default function LayoutNavbar({children}) {
  return (

    <nav className="navbar navbar-dark d-flex  justify-content-center   bg-dark navbar-expand-lg ">
          <ul className="navbar-nav mx-5 ">
            
            {children}

          </ul>
          
    </nav>
  )
}
