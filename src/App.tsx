import { useEffect, useState } from "react"
import { NewTodoForm } from "./NewTodoForm"
import "./styles.css"
import { TodoList } from "./TodoList"

export default function App() {
    const [todos, setTodos] = useState(() => {
        const localValue = localStorage.getItem("ITEMS")
        if (localValue == null) return []

        return JSON.parse(localValue)
    })

    useEffect(() => {
        localStorage.setItem("ITEMS", JSON.stringify(todos))
    }, [todos])

    function addTodo(title: any) {
        setTodos((currentTodos: any) => {
            return [
                ...currentTodos,
                { id: crypto.randomUUID(), title, completed: false },
            ]
        })
    }

    function toggleTodo(id: any, completed: any) {
        setTodos((currentTodos: any[]) => {
            return currentTodos.map((todo: { id: any }) => {
                if (todo.id === id) {
                    return { ...todo, completed }
                }

                return todo
            })
        })
    }

    function deleteTodo(id: any) {
        setTodos((currentTodos: any[]) => {
            return currentTodos.filter((todo: { id: any }) => todo.id !== id)
        })
    }

    return (
        <>
            <NewTodoForm onSubmit={addTodo} />
            <h1 className="header">Todo List</h1>
            <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
        </>
    )
}