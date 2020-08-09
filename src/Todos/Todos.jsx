import React, {useState, useEffect, useReducer} from 'react'
import TodoItem from './TodoItem.jsx'
import {Context} from '../context'
import reducer from '../reducer'

const TodoList = () => {

  const [state, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem('todos') || '[]'))
  const [todoTitle, setTodoTitle] = useState('')

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(state))
  }, [state])

  const AddTodo = e => {

    e.preventDefault()

    dispatch({
      type: 'add',
      payload: todoTitle
    })

    setTodoTitle('')
  }

  const renderTodos = state.map(todo=><TodoItem key={todo.id} {...todo} />)

  return (
    <Context.Provider value={{
      dispatch
    }}>
      <form onSubmit={e=>AddTodo(e)}>
        <div className="form-group d-flex">
          <input 
            type="text"
            className="form-control flex-fill"
            value={todoTitle}
            onChange={e=>setTodoTitle(e.target.value)}
          />
          <button className="btn btn-success ml-3 flex-shrink-0">Add Todo</button>
        </div>
      </form>
      {state.length ? <div className="mt-5 pt-3 pl-3 pr-3 border border-gray">{renderTodos}</div> : '' }
    </Context.Provider>
  )
}

export default TodoList
