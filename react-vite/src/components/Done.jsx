import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Done({task}) {
  return (
    task ? <span class="badge   text-bg-success">Task Done <FontAwesomeIcon icon={faCheck} /> </span>   :  <span class="badge   text-bg-danger mx-1"> Processing ...  </span>

  )
}
