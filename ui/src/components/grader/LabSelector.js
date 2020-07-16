import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Axios from 'axios';


const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 200,
    },
}));


function LabSelector(props) {
    const classes = useStyles();
    const [currLab, setCurrLab] = useState('');
    const [labs, setLabs] = useState([]);


    useEffect(() => {
        Axios.get(`http://localhost:5000/labs/cc451`).then((res) => {
            setLabs(res.data.labs)
        });
    }, [])


    const handleChange = (event) => {
        setCurrLab(event.target.value);
        props.setLab(event.target.value)
    };


    return (
        <React.Fragment>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Select Lab</InputLabel>
                <Select
                    value={currLab}
                    onChange={handleChange}
                    label="Select Lab"
                >
                    {labs.map(lab => <MenuItem key={lab} value={lab}>{lab}</MenuItem>)}
                </Select>
            </FormControl>
        </React.Fragment>
    )
}

export default LabSelector