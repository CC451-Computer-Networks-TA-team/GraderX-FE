import React, { useState, useEffect } from "react";
import TestCaseForm from "./TestCaseForm";
import {
  Button,
  Modal,
  TextInput,
  Grid,
  Row,
  Column,
  Checkbox,
  FileUploader
} from "carbon-components-react";
import { Delete16, Edit16, Add16 } from "@carbon/icons-react";

const LabForm = (props) => {
  const [isTCModalOpen, setIsTCModalOpen] = useState(false);
  const [disableID, setDisableID] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [testcaseToEdit, setTestCaseToEdit] = useState(null);
  const [formLabId, setFormLabId] = useState("");
  const [formRuntime, setFormRuntime] = useState("");
  const [formInternet, setFormInternet] = useState(false);
  const [formTestcases, setFormTestcases] = useState([]);
  const [formLabGuide, setFormLabGuide] = useState(null)


  const addLab = () => {
    if(formLabId && formRuntime){
        const formData = new FormData();
        formData.append('name', formLabId)
        formData.append('runtime_limit', formRuntime)
        formData.append('disable_internet', !formInternet)
        formData.append('test_cases', JSON.stringify(formTestcases))
        formData.append('lab_guide', formLabGuide)

        props.addLab(formData);
        props.closeLabModal();
        resetAndCloseLabModal()
    }
  }

  const editLab = () => {
    if(formLabId && formRuntime){
        props.editLab(formLabId, formRuntime, formInternet, formTestcases);
        props.closeLabModal();
        resetAndCloseLabModal()
    }
  }

  const resetAndCloseLabModal = () => {
    setFormLabId("");
    setFormRuntime("");
    setFormInternet(false);
    setFormTestcases([]);
    setFormLabGuide(null);
    setDisableID(false);
    setIsEdit(false);
    props.closeLabModal()
  };

  const openEditTestcase = (testCase) => {
    setTestCaseToEdit(testCase);
    props.closeLabModal();
    setIsTCModalOpen(true);
  };

  const closeTCModal = () => {
    setIsTCModalOpen(false);
    props.setOpenModal(true);
    setTestCaseToEdit(null);
  };

  const addTestcase = (formTestcaseID, formTestcaseIN, formTestcaseOUT, formStudentAccessible) => {
    let testcasesClone = formTestcases.slice(0);
    testcasesClone.push({
      id: formTestcaseID,
      input: formTestcaseIN,
      output: formTestcaseOUT,
      public: formStudentAccessible
    });
    setFormTestcases(testcasesClone);
    closeTCModal();
  };

  const editTestcase = (formTestcaseID, formTestcaseIN, formTestcaseOUT) => {
    let testcasesClone = formTestcases.slice(0);
    testcasesClone = testcasesClone.filter(
      (test_case) => test_case.id !== formTestcaseID
    );
    testcasesClone.push({
      id: formTestcaseID,
      input: formTestcaseIN,
      output: formTestcaseOUT,
    });
    setFormTestcases(testcasesClone);
    closeTCModal();
  };

  const deleteTestcase = (id) => {
    let testcasesClone = formTestcases.slice(0);
    setFormTestcases(testcasesClone.filter((test_case) => test_case.id !== id));
  };

  useEffect(() => {
    if (props.labData) {
        setFormLabId(props.labData.name);
        setFormRuntime(props.labData.runtime_limit);
        setFormInternet(!props.labData.disable_internet);
        setFormTestcases(props.labData.test_cases);
        setDisableID(true);
        setIsEdit(true);
    }
  // eslint-disable-next-line
  }, [props.openModal]);

  const labGuideHandler = (e) => {
    setFormLabGuide(e.target.files[0])
  }

  return (
    <React.Fragment>
      <TestCaseForm
        addTestcase={addTestcase}
        editTestcase={editTestcase}
        testCase={testcaseToEdit}
        isTCModalOpen={isTCModalOpen}
        setIsTCModalOpen={setIsTCModalOpen}
        closeTCModal={closeTCModal}
      />
      <Modal
        hasForm
        open={props.openModal}
        onRequestClose={() => {
          resetAndCloseLabModal();
        }}
        primaryButtonText="Save"
        secondaryButtonText="Close"
        onRequestSubmit={() => {
          isEdit ? editLab() : addLab();
        }}
        size="sm"
        modalHeading="Lab"
        modalLabel={isEdit ? "Edit" : "Add"}
      >
        <Grid style={{ padding: "0" }}>
          <Row>
            <Column>
              <TextInput
                labelText="Name"
                value={formLabId}
                onChange={(e) => setFormLabId(e.target.value)}
                disabled={disableID}
              />
            </Column>
            <Column>
              <TextInput
                labelText="Runtime Limit (Seconds)"
                value={formRuntime}
                onChange={(e) => setFormRuntime(e.target.value)}
                type="number"
              />
            </Column>
          </Row>
          <Row style={{ marginTop: "1rem" }}>
            <Column>
              <Checkbox
                labelText={`Enable Internet Access`}
                id="checkbox-label-1"
                checked={formInternet}
                onChange={(e) => setFormInternet(e)}
              />
            </Column>
          </Row>
          <Row style={{ marginTop: "2rem" }}>
            <Column>
              <FileUploader buttonLabel="Select file" labelTitle="Upload Lab Guide (optional)" labelDescription="only .md files" filenameStatus='complete' onChange={labGuideHandler}/>
            </Column>
          </Row>
          <Row style={{ marginTop: "2rem" }}>
            <Column>
              {/* <FileUploader
                buttonLabel="Add file"
                labelTitle="Test Cases"
                labelDescription="Only .json files, 500kb max file size." /> */}
              <div className="test-cases-container">
                {formTestcases.map((test_case) => (
                  <Row key={test_case.id} className="container">
                    <p className="column-1" style={{ display: "inline-block" }}>
                      {test_case.id}
                    </p>

                    <div
                      className="column-2"
                      style={{ display: "inline-block" }}
                    >
                      <Button
                        kind="ghost"
                        size="small"
                        hasIconOnly
                        renderIcon={Edit16}
                        iconDescription="Edit"
                        onClick={() => openEditTestcase(test_case)}
                      ></Button>
                      <Button
                        kind="ghost"
                        size="small"
                        hasIconOnly
                        renderIcon={Delete16}
                        iconDescription="Delete"
                        onClick={() => deleteTestcase(test_case.id)}
                      ></Button>
                    </div>
                  </Row>
                ))}
              </div>

              <Button
                renderIcon={Add16}
                onClick={() => {
                  props.closeLabModal();
                  setIsTCModalOpen(true);
                }}
              >
                Add test case
              </Button>
            </Column>
          </Row>
        </Grid>
      </Modal>
    </React.Fragment>
  );
};

export default LabForm;
