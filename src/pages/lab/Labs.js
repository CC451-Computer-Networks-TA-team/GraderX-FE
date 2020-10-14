import React, { useState, useEffect } from "react";
import apiClient from "../../api-client";
import "./styles.scss";

import {
  Link,
  DataTable,
  Button,
  Modal,
  TextInput,
  Select,
  SelectItem,
  Grid,
  Row,
  Column,
  FileUploader,
  Checkbox,
  TextArea,
} from "carbon-components-react";
import { Delete16, Edit16, Add16 } from "@carbon/icons-react";
const {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
} = DataTable;

function LabsPage() {
  const [labs, setLabs] = useState([]);
  const [courseIds, setCourseIds] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isTCModalOpen, setIsTCModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  // Add lab form
  const [formLabId, setFormLabId] = useState("");
  const [formRuntime, setFormRuntime] = useState("");
  const [formInternet, setFormInternet] = useState(false);
  const [formTestcases, setFormTestcases] = useState([]);
  // Testcase form
  const [formTestcaseID, setFormTestcaseID] = useState("");
  const [formTestcaseIN, setFormTestcaseIN] = useState("");
  const [formTestcaseOUT, setFormTestcaseOUT] = useState("");

  const createLabsObjects = (labs_array) => {
    let labs_objects = [];

    labs_array.forEach((lab, index, _arr) => {
      lab.id = `${index}`;
      labs_objects.push(lab);
    });

    setLabs(labs_objects);
  };

  const createCoursesIds = (courses_array) => {
    let courses_ids = [];
    courses_array.forEach((course, index, _arr) => {
      courses_ids.push(course.name);
    });
    setCourseIds(courses_ids);
  };

  const clearForm = () => {
    setFormLabId("");
    setFormRuntime("");
  };

  const fetchLabs = (course_name) => {
    apiClient.getLabs(course_name).then((res) => {
      createLabsObjects(res.data.labs);
      setSelectedCourse(course_name);
    });
  };

  const changeLabs = (event) => {
    const course_name = event.target.value;
    fetchLabs(course_name);
  };

  useEffect(() => {
    apiClient.getCourses().then((res) => {
      createCoursesIds(res.data.courses);
      createLabsObjects(res.data.courses[0].labs);
      setSelectedCourse(res.data.courses[0].name);
    });
  }, []);

  const addLab = () => {
    apiClient
      .addLab(selectedCourse, formLabId, formRuntime, formInternet)
      .then((res) => {
        fetchLabs(selectedCourse);
      })
      .catch((res) => {
        alert("Failed to add a new lab");
      });
  };

  const addTestcase = () => {
    console.log("INSIDE")
    let testcasesClone = formTestcases.slice(0)
    console.log(testcasesClone)
    testcasesClone.push({id: formTestcaseID, input: formTestcaseIN, output: formTestcaseOUT})
    console.log(testcasesClone)
    setFormTestcases(testcasesClone)

  }
  const deleteLab = (lab_name) => {
    apiClient.deleteLab(selectedCourse, lab_name).then((res) => {
      fetchLabs(selectedCourse);
    });
  };

  return (
    <div>
      <div style={{ marginLeft: 16, marginTop: 64, marginRight: 16 }}>
        <Link href="#">Labs</Link>
        <div style={{ height: 16 }}></div>
        <h1>Browse Labs</h1>
        <div style={{ height: 40 }}></div>
        <Select id="select-1" labelText="Select Course" onChange={changeLabs}>
          {courseIds.map((course_id) => (
            <SelectItem key={course_id} value={course_id} text={course_id} />
          ))}
        </Select>
        <Modal
          hasForm
          open={openModal}
          onRequestClose={() => {
            clearForm();
            setOpenModal(false);
          }}
          primaryButtonText="Save"
          secondaryButtonText="Close"
          onRequestSubmit={() => {
            addLab();
            setOpenModal(false);
          }}
          size="sm"
          modalHeading="Lab"
          modalLabel="Add"
        >
          <Grid style={{ padding: "0" }}>
            <Row>
              <Column>
                <TextInput
                  labelText="Name"
                  value={formLabId}
                  onChange={(e) => setFormLabId(e.target.value)}
                />
              </Column>
              <Column>
                <TextInput
                  labelText="Runtime Limit (Seconds)"
                  value={formRuntime}
                  onChange={(e) => setFormRuntime(e.target.value)}
                />
              </Column>
            </Row>
            <Row style={{ marginTop: "1rem" }}>
              <Column>
                <Checkbox
                  labelText={`Enable Internet Access`}
                  id="checkbox-label-1"
                  onChange={(e) => setFormInternet(e)}
                />
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
                      <p
                        className="column-1"
                        style={{ display: "inline-block" }}
                      >
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
                        ></Button>
                        <Button
                          kind="ghost"
                          size="small"
                          hasIconOnly
                          renderIcon={Delete16}
                          iconDescription="Delete"
                        ></Button>
                      </div>
                    </Row>
                  ))}
                </div>

                <Button
                  renderIcon={Add16}
                  onClick={() => {
                    setOpenModal(false);
                    setIsTCModalOpen(true);
                  }}
                >
                  Add test case
                </Button>
              </Column>
            </Row>
          </Grid>
        </Modal>
        <Modal
          hasForm
          open={isTCModalOpen}
          onRequestClose={() => {
            setIsTCModalOpen(false);
            setOpenModal(true);
          }}
          onRequestSubmit={() => {
            addTestcase();
            setIsTCModalOpen(false);
            setOpenModal(true);
          }}
          primaryButtonText="Save"
          secondaryButtonText="Close"
          size="sm"
          modalHeading="Test Case"
          modalLabel="Add"
        >
          <Grid style={{ padding: "0" }}>
            <TextInput
              id="my_input"
              labelText="ID"
              value={formTestcaseID}
              onChange={(e) => setFormTestcaseID(e.target.value)}
            />
            <div style={{ height: 24 }}></div>
            <Row>
              <Column>
                <TextArea
                  cols={50}
                  helperText="Optional helper text"
                  id="test2"
                  invalidText="A valid value is required"
                  labelText="Text area label"
                  placeholder="Placeholder text"
                  rows={4}
                  value={formTestcaseIN}
                  onChange={(e) => setFormTestcaseIN(e.target.value)}
                />
              </Column>
              <Column>
                <TextArea
                  cols={50}
                  helperText="Optional helper text"
                  id="test2"
                  invalidText="A valid value is required"
                  labelText="Text area label"
                  placeholder="Placeholder text"
                  rows={4}
                  value={formTestcaseOUT}
                  onChange={(e) => setFormTestcaseOUT(e.target.value)}
                />
              </Column>
            </Row>
          </Grid>
        </Modal>

        <div style={{ height: 56 }}></div>
        <DataTable
          rows={labs}
          headers={[
            {
              key: "id",
              header: "Id",
            },
            {
              key: "name",
              header: "Name",
            },
            {
              key: "disable_internet",
              header: "Internet",
            },
            {
              key: "runtime_limit",
              header: "Runtime Limit",
            },
            {
              key: "actions",
              header: "Actions",
            },
          ]}
          render={({ rows, headers, onInputChange }) => (
            <TableContainer>
              <TableToolbar aria-label="data table toolbar">
                <TableToolbarContent>
                  <TableToolbarSearch onChange={onInputChange} />
                </TableToolbarContent>
                <Button
                  renderIcon={Add16}
                  onClick={() => {
                    setIsEdit(false);
                    setOpenModal(true);
                  }}
                >
                  Add Lab
                </Button>
              </TableToolbar>
              <Table>
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHeader>{header.header}</TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>
                          {cell.value === row.cells[2].value
                            ? cell.value
                              ? "Disabled"
                              : "Enabled"
                            : null}
                          {cell.value === row.cells[4].value ? (
                            <span>
                              <Button
                                kind="ghost"
                                size="small"
                                hasIconOnly
                                renderIcon={Edit16}
                                iconDescription="Edit"
                                onClick={() => {
                                  setIsEdit(true);
                                  // setFormTitle('Edit');
                                  // setOpenModal(true);
                                }}
                              />
                              <Button
                                kind="ghost"
                                size="small"
                                hasIconOnly
                                renderIcon={Delete16}
                                iconDescription="Delete"
                                onClick={() => {
                                  deleteLab(row.cells[1].value);
                                }}
                              />
                            </span>
                          ) : (
                            cell.value
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        />
      </div>
    </div>
  );
}

export default LabsPage;
