import { useEffect, useReducer } from "react"
import { todoReducer } from "./todoReducer"
import { TodoList } from "./TodoList"
import { TodoAdd } from "./TodoAdd"

const initialState = [
    /* {
        id: new Date().getTime(),
        description: 'Recoletar la piedra del alma',
        done: false
    },
    {
        id: new Date().getTime() * 3,
        description: 'Recoletar la piedra del tiempo',
        done: false
    } */
];

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}


export const TodoApp = () => {

    const [todos, dispatch] = useReducer(todoReducer, initialState, init)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])
    

    const handleNewTodo = (todo) => {
        const action = {
            type: 'Add Todo',
            payload: todo
        }

        dispatch(action);
        
    }

    const handleDeleteTodo = ( id ) => {
        dispatch({
            type: 'Remove Todo',
            payload: id
        })
    }

    const handleToggleTodo = ( id ) => {
        dispatch({
            type: 'Toggle Todo',
            payload: id
        })
    }

  return (
    <>
        <h1 className="fw-bold">TODO APP</h1>
        <h2 className="mt-3 ">
            <span className="badge text-bg-primary position-relative">Todo List
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">{ todos.length }</span></span>
            <small className="ms-4 badge text-bg-primary position-relative"> Pending
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{todos.filter(todo => !todo.done).length}</span>
            </small>
        </h2>
        <hr />

        <div className="col-10 mx-5">
            <TodoAdd onNewTodo={handleNewTodo}/>
        </div>

        {
            todos.length  ?
            <div className="col-10 mx-5 p-3">
            <TodoList 
                todos={todos} 
                onDeleteTodo={ id => handleDeleteTodo(id)} 
                onToggleTodo={ handleToggleTodo }
            />
            </div>
            :
            <p className="text-center">Add a new task</p>
        }

        <p className="fw-light text-justify">Application developed with JavaScript, <span className="fw-semibold">React JS</span> and Bootstrap. Functionalities such as useState, useReducer, useEffect and the data are saved in local storage were used.
        The development package was installed with the help of Yarn and the creation of the React application with <span className="fw-semibold">Vite.</span></p>
    </>
  )
}
