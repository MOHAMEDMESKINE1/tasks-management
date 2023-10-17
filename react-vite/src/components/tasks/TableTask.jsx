import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../../helpers/styles'
import Done from '../Done'
import { faEye, faPenClip, faTrash } from '@fortawesome/free-solid-svg-icons'

export default function TableTask( {tasks,onDelete}) {
  
  return (
   <>
   <table className="table table-striped text-center">
   <thead>
      <tr>
      <th >#ID</th>
      <th >Title</th>
      <th >Body</th>
      <th >Done</th>
      <th >Category</th>
      <th >Photo</th>
      <th >Created</th>
      <th >Updated</th>
      <th >Action</th>
      </tr>
  </thead>
   <tbody className="table-group-divider table-divider-color">
      {tasks.data?.map((task, key) => (
        <tr key={key}>
          <td>{task.id}</td>
          <td>{task.title}</td>
          <td>{task.body.substr(0, 70)}</td>
          <td><Done task={task.done}/></td>
          <td>{task.category.name}</td>
          <td>{task.photo ? <img src={`http://localhost:8000/storage/tasks/photos/${task.photo}`} className='w-75' alt="" /> :  '-' }</td>
          <td>{task.created_at}</td>
          <td>{task.updated_at}</td>
          <td>
            <div className="d-flex justify-content-between">
              <Link to={`/tasks/details/${task.id}`}  className="badge  bg-success mx-2">
                <FontAwesomeIcon style={styles.fontSize} icon={ faEye  }/>
              </Link>
              <Link to={`/tasks/edit/${task.id}`}  className="badge  bg-primary mx-2">
                <FontAwesomeIcon style={styles.fontSize} icon={ faPenClip}/>
              </Link>
              <Link onClick={()=> onDelete(task.id)}  className="badge bg-danger">
                <FontAwesomeIcon style={styles.fontSize}  icon={faTrash}/>
              </Link>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
    </table>
   </>
  )
}
