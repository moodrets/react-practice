import React, {useContext} from 'react'
import {Context} from '../context'

const TodoItem = ({id, title, completed}) => {

  const {dispatch} = useContext(Context)

  const checkboxStyle = {
    width: '20px',
    height: '20px'
  }

  const cls = [
    'p-3',
    'border',
    'border-success',
    'mb-3',
    'd-flex',
    'align-items-center'
  ]

  if (completed) {
    cls.push('strike')
  }

  return (
    <div
      data-id={id}
      className={cls.join(' ')}
      >
      <strong className="flex-fill">{title}</strong>
      <input
        className="flex-shrink-0"
        type="checkbox"
        checked={completed}
        onChange={()=>{
          dispatch({
            type: 'toggle',
            payload: id
          })
        }}
        style={checkboxStyle}
      />
      <button onClick={()=>{
        dispatch({
          type: 'remove',
          payload: id
        })
      }} className="btn btn-danger ml-3">x</button>
    </div>
  )
}

export default TodoItem;
