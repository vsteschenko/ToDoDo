import React, { useState, useEffect } from 'react';
import Form from './form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ToDoList = () => {
    const LSKEY = "MyToDo";
    const [todos, setTodos] = useState([]);
    //retrieving from local storage
    useEffect(() => {
        const storedTodos = JSON.parse(window.localStorage.getItem(LSKEY + ".todos"));
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, []);

    const addTodo = (newTodo) => {
        setTodos([...todos,  {text: newTodo, isChecked: false}]);
    };
    //saving to local storage
    useEffect(() => {
        window.localStorage.setItem(LSKEY + ".todos", JSON.stringify(todos));
    }, [todos]);
    //working with checkbox
    const switchCheckbox = index => {
        const newTodos = [...todos];
        newTodos[index].isChecked = !newTodos[index].isChecked;
        setTodos(newTodos);
    };

    const redactTodo = (index, newText) => {
        const newTodos = [...todos];
        newTodos[index].text = newText;
        setTodos(newTodos);
    };

    const deleteTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    const pen = <FontAwesomeIcon icon={faPen} />;
    const trash = <FontAwesomeIcon icon={faTrash} />;

    return (
        <div>
            <Form addTodo={addTodo} />
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <div><input type="checkbox" checked={todo.isChecked} onChange={() => switchCheckbox(index)}/> </div> <div>{todo.text}</div> <div className="options"><div className="pen" onClick={() => { const newText = prompt('redact ToDo'); if(newText) { redactTodo(index, newText)}}}>{pen}</div> <div className="trash" onClick={() => deleteTodo(index)}>{trash}</div></div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;