import React, { useState } from "react";

export const CellSubmit = ({value, onChange, onSubmit}) => {
    
    const [editing, setEditing] = useState(false)

    const onFocus = () => {
        setEditing(true);
    }

    const onBlur = () => {
        onSubmit();
        setEditing(false);
    }

    return (
        editing ?
            <input type="text" onChange={(e) => onChange(e.target.value)} onBlur={() => onBlur()} /> : 
            <div onClick={() => onFocus()}>{value !== undefined ? value : "-"}</div>
    );

};

export default CellSubmit;