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

    // const onClick = () => {
    //     onSubmit();
    //     // setEditing(false);
    // }

    return (
        editing ?
            <span>
                <input className="bg-secondary text-black fw-bold" type="number" onChange={(e) => onChange(e.target.value)} onBlur={() => onBlur()} />
            </span>
             : 
            <div onClick={() => onFocus()}>{value !== undefined && value !== null ? value : "-"}</div>
    );

};

export default CellSubmit;