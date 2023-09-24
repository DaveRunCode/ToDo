import { useForm } from "../hooks/useForm"


export const TodoAdd = ({ onNewTodo }) => {

    const {description, onInputChange, onResetForm} = useForm({
        description:''
    })

    const onFormSubmit = (event) => {
        event.preventDefault();
        if(description.length <= 1) return;

        const newTodo = {
            id: new Date().getTime(),
            description,
            done: false,
        }

        onNewTodo(newTodo)
        onResetForm()
    }

  return (
    <form onSubmit={onFormSubmit}>

        <div className="input-group mb-3">
            <input 
                type="text" 
                className="form-control" 
                placeholder="What is the next task?" 
                name="description"
                value = {description}
                onChange = {onInputChange}
            />
            <button 
                className="btn btn-primary" 
                type="submit" 
            >
                Add
            </button>
        </div>
    </form>
  )
}
