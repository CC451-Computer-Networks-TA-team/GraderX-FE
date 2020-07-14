import React, { useState } from 'react'
import LabSelector from './LabSelector'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'


function Grader() {
    const [lab, setLab] = useState('')

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item>
                <Paper elevation={5} style={{ 'padding': 25 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <LabSelector setLab={setLab} />
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" color="primary">Evaluate</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Grader