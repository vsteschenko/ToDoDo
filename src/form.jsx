import React, { useState } from 'react';

const Form = ({ addTodo }) => {
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            clickHandler();
        }
    };

    const clickHandler = () => {
        if(inputValue.trim() !== '') {
            addTodo(inputValue);
            setInputValue("");
        }
    };

    return (
        <div>
            <input type="text" id="input" placeholder="Write a new todo" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} />
        </div>
    );
};

export default Form;