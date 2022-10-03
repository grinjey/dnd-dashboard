import React from "react";

export class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editing: false };
    }

    render() {
        const { value, onChange} = this.props; 
        
        return this.state.editing ?
            <input className="bg-secondary text-black fw-bold" type="text" onChange={(e) => onChange(e.target.value)} onBlur={() => this.onBlur()} /> : 
            <div onClick={() => this.onFocus()}>{value ? value : '-'}</div>
    }

    onFocus() {
        this.setState({ editing: true });
    }

    onBlur() {
        this.setState({ editing: false });
    }
};