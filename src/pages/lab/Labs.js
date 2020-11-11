import React, { useState, useEffect } from "react";
import apiClient from "../../api-client";
import LabForm from "./LabForm";
import "./styles.scss";
import AppHeader from "../../components/layout/AppHeader";
import {
  Link,
  DataTable,
  DataTableSkeleton,
  Button,
  SelectSkeleton,
  Select,
  SelectItem,
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
  TableToolbarContent,
  TableToolbarSearch,
} = DataTable;

function LabsPage() {
  const [didMount, setDidMount] = useState(false)
  const [labs, setLabs] = useState([]);
  const [labsLoaded, setLabsLoaded] = useState(false)
  const [courseIds, setCourseIds] = useState([]);
  const [courseIdsLoaded, setCourseIdsLoaded] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [labToEdit, setLabToEdit] = useState(null)

  const createLabsObjects = (labs_array) => {
    let labs_objects = [];

    labs_array.forEach((lab, index, _arr) => {
      lab.id = `${index}`;
      labs_objects.push(lab);
    });

    setLabs(labs_objects);
  };

  useEffect(() => {
    if (didMount) {
      setLabsLoaded(true)
    }
  }, [labs])

  useEffect(() => {
    if (didMount) {
      setCourseIdsLoaded(true)
    }
  }, [courseIds])

  const createCoursesIds = (courses_array) => {
    let courses_ids = [];
    courses_array.forEach((course, index, _arr) => {
      courses_ids.push(course.name);
    });
    setCourseIds(courses_ids);
  };

  const fetchLabs = (course_name) => {
    setLabsLoaded(false)
    apiClient.getLabs(course_name).then((res) => {
      createLabsObjects(res.data.labs);
      setSelectedCourse(course_name);
    })
  };

  const changeLabs = (event) => {
    const course_name = event.target.value;
    fetchLabs(course_name);
  };

  useEffect(() => {
    setDidMount(true)
    apiClient.getCourses(true).then((res) => {
      createCoursesIds(res.data.courses);
      fetchLabs(res.data.courses[0].name)
      setSelectedCourse(res.data.courses[0].name);
    })
  }, []);

  const addLab = (formData) => {
    apiClient
      .addLab(
        selectedCourse,
        formData
      )
      .then((res) => {
        fetchLabs(selectedCourse);
      })
      .catch((error) => {
        alert(error.response.data.status);
      });
  };


  const editLab = (formLabId, formRuntime, formInternet, formTestcases) => {
    apiClient
      .editLab(
        selectedCourse,
        formLabId,
        formRuntime,
        formInternet,
        formTestcases
      )
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
    let labWithLabID = labs.find(lab => lab.name == labID)
    setLabToEdit(labWithLabID)
    setOpenModal(true)
  }

  const closeLabModal = () => {
    setOpenModal(false)
    setLabToEdit(null)
  }


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
        {
          courseIdsLoaded ?
            (
              <Select id="select-1" labelText="Select Course" onChange={changeLabs}>
                {courseIds.map((course_id) => (
                  <SelectItem key={course_id} value={course_id} text={course_id} />
                ))}
              </Select>
            ) :
            (
              <SelectSkeleton style={{ width: 224 }} />
            )
        }
        <div style={{ height: 56 }}></div>
        {
          labsLoaded ?
            (
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
                                        openEditLab(row.cells[1].value)
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
            ) :
            (
              <DataTableSkeleton showHeader={false} />
            )
        }

      </div>
    </div>
  );
}

export default LabsPage;
