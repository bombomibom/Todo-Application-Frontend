import React, { useState } from "react";
import { Button, Grid2, TextField } from "@mui/material";

const AddTodo = (props) => {
    const [item, setItem] = useState({ title: "" });
    const addItem = props.addItem;
    
    const onButtonClick = () => {
        addItem(item);
        setItem({ title: "" })
    };

    const onInputChange = (e) => {
        setItem({ title: e.target.value });
    };

    const enterKeyEventHandler = (e) => {
        if(e.key === 'Enter') {
            onButtonClick();
        }
    };

    return (
        <Grid2 container style={{ marginTop: 20 }}>
            <Grid2 size={{ xs: 11, md: 11 }} item style={{ paddingRight: 16 }}>
                <TextField placeholder="Add Todo here" 
                    fullWidth 
                    onChange={onInputChange} 
                    onKeyDown={enterKeyEventHandler}
                    value={item.title}
                />
            </Grid2>
            <Grid2 size={{ xs: 1, md: 1 }} item>
                <Button fullWidth style={{ height: '100%' }} color="secondary"
                variant="outlined"
                onClick={onButtonClick}>
                    +
                </Button>
            </Grid2>
        </Grid2>
    );
};

export default AddTodo;