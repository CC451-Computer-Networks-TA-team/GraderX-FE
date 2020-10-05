import React, { useState, useEffect } from "react";
import { Dropdown, Grid, Label } from "semantic-ui-react";
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
    apiClient.getLabs(props.course).then(res => {
      createLabObjects(res.data.labs);
    });
    // eslint-disable-next-line
  }, []);

  const handleChange = (_, data) => {
    props.setLab(data.value);
  };

  return (
    <React.Fragment>
      <Grid centered>
        <Grid.Column width={7}>
          <Label as="a" color="violet" image style={{ marginBottom: "3%" }}
>
            {props.course}
            <Label.Detail>Course Name</Label.Detail>
          </Label>

          <Dropdown
            selectOnBlur={false}
            placeholder="Select Lab"
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
