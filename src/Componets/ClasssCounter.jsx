import React from "react";
import Counter from "./Counter";

class ClassCounter extends React.Component {

    // const [value, SetValue] = useState("");

    constructor(props){
        super(props);
        this.state= {
            value: ""
        }
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    render(){
        return(
            <div>
                <h1>{this.state.value}</h1>
                <input type="text" value={this.state.value} onChange={this.handleChange}></input>
            </div>
        )
    }
}

export default ClassCounter;