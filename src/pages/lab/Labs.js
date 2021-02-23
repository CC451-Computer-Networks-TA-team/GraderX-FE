import React, { useState, useEffect } from "react";
import apiClient from "../../api-client";
import LabForm from "./LabForm";
import "./styles.scss";
import AppHeader from "../../components/layout/AppHeader";
import { CopyToClipboard } from "react-copy-to-clipboard";

import {
  //Link,
  DataTable,
  DataTableSkeleton,
  Button,
  SelectSkeleton,
  Select,
  SelectItem,
} from "carbon-components-react";
import { Delete16, Edit16, Add16, Copy16, Launch16 } from "@carbon/icons-react";
const {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
} = DataTable;

function LabsPage() {
  const [didMount, setDidMount] = useState(false);
  const [labs, setLabs] = useState([]);
  const [labsLoaded, setLabsLoaded] = useState(false);
  const [courseIds, setCourseIds] = useState([]);
  const [courseIdsLoaded, setCourseIdsLoaded] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [labToEdit, setLabToEdit] = useState(null);
  const [copied, setCopied] = useState(false);

  const createLabsObjects = (labs_array) => {
    let labs_objects = [];

    labs_array.forEach((lab, index, _arr) => {
      lab.id = `${index}`;
      lab.lab_link = formLabLink(lab.name);
      lab.test_cases.forEach((tc) => {
        tc.public = lab.public_test_cases.includes(tc.id)
      })
      labs_objects.push(lab);
    });
    setLabs(labs_objects);
  };

  const formLabLink = (lab_name) => {
    return `${window.origin}/courses/${selectedCourse}/labs/${lab_name}/lab_guide`;
  };

  useEffect(() => {
    if (didMount) {
      setLabsLoaded(true);
    }
    // eslint-disable-next-line
  }, [labs]);

  useEffect(() => {
    if (didMount) {
      setCourseIdsLoaded(true);
    }
    // eslint-disable-next-line
  }, [courseIds]);

  const createCoursesIds = (courses_array) => {
    let courses_ids = [];
    courses_array.forEach((course, index, _arr) => {
      courses_ids.push(course.name);
    });
    setCourseIds(courses_ids);
  };

  const fetchLabs = (course_name) => {
    setLabsLoaded(false);
    apiClient.getLabs(course_name).then((res) => {
      createLabsObjects(res.data.labs);
    });
  };

  const changeLabs = (event) => {
    const course_name = event.target.value;
    setSelectedCourse(course_name);
  };

  useEffect(() => {
    setDidMount(true);
    apiClient.getCourses(true).then((res) => {
      createCoursesIds(res.data.courses);
      setSelectedCourse(res.data.courses[0].name);
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchLabs(selectedCourse);
    }
  }, [selectedCourse]);

  const addLab = (formData) => {
    apiClient
      .addLab(selectedCourse, formData)
      .then((res) => {
        fetchLabs(selectedCourse);
      })
      .catch((error) => {
        alert(error.response.data.status);
      });
  };

  const editLab = (labId, formData) => {
    apiClient
      .editLab(selectedCourse, labId, formData)
      .then((res) => {
        fetchLabs(selectedCourse);
      })
      .catch((error) => {
        alert(error.response.data.status);
      });
  };

  const deleteLab = (lab_name) => {
    apiClient.deleteLab(selectedCourse, lab_name).then((res) => {
      fetchLabs(selectedCourse);
    });
  };

  const openEditLab = (labID) => {
    let labWithLabID = labs.find((lab) => lab.name === labID);
    setLabToEdit(labWithLabID);
    setOpenModal(true);
  };

  const closeLabModal = () => {
    setOpenModal(false);
    setLabToEdit(null);
  };

  return (
    <div>
      <AppHeader />
      <LabForm
        addLab={addLab}
        editLab={editLab}
        openModal={openModal}
        setOpenModal={setOpenModal}
        closeLabModal={closeLabModal}
        labData={labToEdit}
      />
      <div style={{ marginLeft: 16, marginTop: 64, marginRight: 16 }}>
        <div style={{ height: 16 }}></div>
        <h1>Browse Labs</h1>
        <div style={{ height: 40 }}></div>
        {courseIdsLoaded ? (
          <Select id="select-1" labelText="Select Course" onChange={changeLabs}>
            {courseIds.map((course_id) => (
              <SelectItem key={course_id} value={course_id} text={course_id} />
            ))}
          </Select>
        ) : (
          <SelectSkeleton style={{ width: 224 }} />
        )}
        <div style={{ height: 56 }}></div>
        {labsLoaded ? (
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
                key: "lab_link",
                header: "Student Submission Link",
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

                            {cell.info.header === "actions" ? (
                              <span>
                                <Button
                                  kind="ghost"
                                  size="small"
                                  hasIconOnly
                                  renderIcon={Edit16}
                                  iconDescription="Edit"
                                  onClick={() => {
                                    openEditLab(row.cells[1].value);
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
                            ) : cell.info.header === "lab_link" ? (
                              <span class="lab-link-container">
                                <a
                                  class="lab-link"
                                  href={cell.value}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Go To Lab
                                  <Button
                                    class="lab-link-button"
                                    kind="ghost"
                                    size="small"
                                    hasIconOnly
                                    renderIcon={Launch16}
                                    iconDescription="Go To Lab"
                                  />
                                </a>
                                <CopyToClipboard
                                  text={cell.value}
                                  onCopy={() => setCopied(true)}
                                >
                                  <Button
                                    class="lab-link-copy-button"
                                    kind="ghost"
                                    size="small"
                                    hasIconOnly
                                    renderIcon={Copy16}
                                    iconDescription={
                                      copied
                                        ? "Copied To Clipbloard!"
                                        : "Copy To Clipboard"
                                    }
                                    onBlur={() => {
                                      setCopied(false);
                                    }}
                                  />
                                </CopyToClipboard>
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
        ) : (
          <DataTableSkeleton showHeader={false} />
        )}
      </div>
    </div>
  );
}

export default LabsPage;
