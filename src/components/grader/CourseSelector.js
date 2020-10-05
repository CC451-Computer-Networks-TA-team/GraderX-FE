import React, { useState, useEffect } from "react";
import { Dropdown, Grid } from "semantic-ui-react";
import apiClient from "../../api-client";

function LabSelector(props) {
    const [labs, setLabs] = useState([]);

    const createLabObjects = labs_array => {
        let labs_objects = [];
        labs_array.forEach(lab => {
            labs_objects.push({ key: lab, text: lab, value: lab });
        });
        setLabs(labs_objects);
    };

    useEffect(() => {
        apiClient.getCourses().then(res => {
            createLabObjects(res.data.courses);
        });
    }, []);

    const handleChange = (_, data) => {
        props.setCourse(data.value);
    };

    return (
        <React.Fragment>
            <Grid centered>
                <Grid.Column width={7}>
                    <Dropdown
                        selectOnBlur={false}
                        placeholder="Select Course"
                        fluid
                        selection
                        button
                        options={labs}
                        onChange={handleChange}
                    />
                </Grid.Column>
            </Grid>
        </React.Fragment>
    );
}

export default LabSelector;
