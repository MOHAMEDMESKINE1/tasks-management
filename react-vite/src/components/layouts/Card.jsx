import React from 'react'

export default function Card({children,title,footer}) {
  return (
    <div>
        
        <div class="card p-0 my-4 text-center mx-auto" >
            <div class="card-header p-0 text-center bg-light">
                <h6 class="mt-2 fw-bold text-dark">{title}</h6>
            </div>
            <div className="card-body">
                 {children}
            </div>
             {footer && <div className="card-footer ">{footer }</div>}
       </div>
    </div>
  )
}
