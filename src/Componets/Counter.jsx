import React, { useState } from "react";

const Counter = () => {
    let count = 0;
    const [value, SetValue] = useState("jdsafjfd");

    function increment() {
        count += 1;
    }
    function decremnet() {
        count -= 1;
    }
    return (
        <div>
            <h1>{value}</h1>
            <input type="text" value={value} onChange={event => SetValue(event.target.value)}></input>
        </div>
    )
}

export default Counter;