import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox } from '@mui/material';

function ChecklistItem(label: string) {
    const [state, setState] = React.useState({
        checked: false,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    return (
        <FormControlLabel
            aria-label={`task-element-${label.slice(0,10)}`}
            label={label}
            control={
                <Checkbox checked={state.checked} onChange={handleChange} name="" />
            }
        />
    );
}

export default ChecklistItem;