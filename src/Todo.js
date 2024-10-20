import React, { useState } from "react";
import { 
    ListItem, 
    ListItemText, 
    InputBase, 
    Checkbox,
    IconButton 
} from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";

const Todo = (props) => {
    const [item, setItem] = useState(props.item);
    const [readOnly, setReadOnly] = useState(true);
    const editItem = props.editItem;
    const deleteItem = props.deleteItem;

    const turnOnReadOnly = (e) => {
        if( e.key === 'Enter' && readOnly === false) {
            setReadOnly(true);
            editItem(item);
        }
    };

    const turnOffReadOnly = () => {
        setReadOnly(false);
    };
    
    const editEventHandler = (e) => {
        setItem({...item, title: e.target.value });
    };

    const checkboxEventHandler = (e) => {
        item.done = e.target.checked;
        editItem(item);
    };

    const deleteEventHandler = () => {
        deleteItem(item);
    };

    return (
        <ListItem 
            secondaryAction={
                <IconButton aria-label="Delete Todo"
                    onClick={deleteEventHandler}>
                    <DeleteOutlined />
                </IconButton>}>
            <Checkbox checked={item.done} onChange={checkboxEventHandler} />
            <ListItemText>
                <InputBase 
                    inputProps={{ 
                        "aria-label": "naked",
                        readOnly: readOnly }}
                    onClick={turnOffReadOnly}
                    onKeyDown={turnOnReadOnly}
                    onChange={editEventHandler}
                    type="text"
                    id={item.id}
                    name={item.id}
                    value={item.title}
                    multiline={true}
                    fullWidth={true}
                />
            </ListItemText>
        </ListItem>
    );
};

export default Todo;