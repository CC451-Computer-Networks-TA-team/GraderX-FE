import React, { useState, useEffect } from "react";
import apiClient from "../../api-client";
import '../styles.scss';

import {
  Dropdown
} from 'carbon-components-react';

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
  }, []);

  const handleChange = (data) => {
    props.setLab(data.value);
  };

  return (
    <React.Fragment>
      <div className="moss-container">
        <div style={{ paddingTop: 50 }}>
          <h1>Select Lab</h1>
          <div style={{ height: 32 }}></div>
          <Dropdown
            id="courseDropdown"
            titleText="Select Course"
            label="Select"
            onChange={(data) => {
              handleChange(data.selectedItem);
            }}
            itemToString={(item) => (item ? item.text : '')}
            items={labs}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default LabSelector;
