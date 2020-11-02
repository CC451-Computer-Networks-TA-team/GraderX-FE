import React, { useState, useEffect } from "react";
import {
  Modal,
  TextInput,
  Grid,
  Row,
  Column,
  TextArea,
  Checkbox
} from "carbon-components-react";

const TestCaseForm = (props) => {
  const [disableID, setDisableID] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formTestcaseID, setFormTestcaseID] = useState("");
  const [formTestcaseIN, setFormTestcaseIN] = useState("");
  const [formTestcaseOUT, setFormTestcaseOUT] = useState("");
  const [formStudentAccessible, setFormStudentAccessible] = useState(false)

  const addTestcase = () => {
    if (formTestcaseID && formTestcaseIN && formTestcaseOUT) {
      props.addTestcase(formTestcaseID, formTestcaseIN, formTestcaseOUT, formStudentAccessible);
      resetAndCloseTCModal()
    }
  };

  const editTestcase = () => {
    if (formTestcaseID && formTestcaseIN && formTestcaseOUT) {
      props.editTestcase(formTestcaseID, formTestcaseIN, formTestcaseOUT);
      resetAndCloseTCModal()
    }
  };

  const resetAndCloseTCModal = () =>{
    setFormTestcaseID("");
    setFormTestcaseIN("");
    setFormTestcaseOUT("");
    setFormStudentAccessible(false);
    setDisableID(false);
    setIsEdit(false);
    props.closeTCModal()
  }

  useEffect(() => {
    if (props.testCase) {
      setFormTestcaseID(props.testCase.id);
      setFormTestcaseIN(props.testCase.input);
      setFormTestcaseOUT(props.testCase.output);
      setDisableID(true);
      setIsEdit(true);
    }
  }, [props.isTCModalOpen]);

  return (
    <Modal
      hasForm
      open={props.isTCModalOpen}
      onRequestClose={() => {
        resetAndCloseTCModal();
      }}
      onRequestSubmit={() => {
        isEdit ? editTestcase() : addTestcase();
      }}
      primaryButtonText="Save"
      secondaryButtonText="Close"
      size="sm"
      modalHeading="Test Case"
      modalLabel={isEdit ? "Edit" : "Add"}
    >
      <Grid style={{ padding: "0" }}>
        <TextInput
          id="my_input"
          labelText="ID"
          value={formTestcaseID}
          disabled={disableID}
          onChange={(e) => setFormTestcaseID(e.target.value)}
        />
        <div style={{ height: 24 }}></div>
        <Row>
          <Column>
            <TextArea
              cols={50}
              id="test2"
              invalidText="A valid value is required"
              labelText="Test Case Input"
              placeholder={`10\n10`}
              rows={4}
              value={formTestcaseIN}
              onChange={(e) => setFormTestcaseIN(e.target.value)}
            />
          </Column>
          <Column>
            <TextArea
              cols={50}
              id="test2"
              invalidText="A valid value is required"
              labelText="Test Case Output"
              placeholder="20"
              rows={4}
              value={formTestcaseOUT}
              onChange={(e) => setFormTestcaseOUT(e.target.value)}
            />
          </Column>
        </Row>
        <Row style={{ marginTop: "1rem" }}>
          <Column>
            <Checkbox
              labelText={`Visible To Students`}
              id="test-case-privacy"
              checked={formStudentAccessible}
              onChange={(e) => setFormStudentAccessible(e)}
            />
          </Column>
        </Row>
      </Grid>
    </Modal>
  );
};

export default TestCaseForm;
