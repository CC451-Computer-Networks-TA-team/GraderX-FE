import React, { useState, useEffect } from 'react';
import apiClient from "../api-client";

import {
  Link, Tile, DataTable, Button,
  TextInput, Dropdown, Modal, DataTableSkeleton
} from 'carbon-components-react';
import AppHeader from "../components/layout/AppHeader";

import { Delete16, Edit16, Add16 } from '@carbon/icons-react';

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

function CoursesPage() {
  const [didMount, setDidMount] = useState(false)
  const [courses, setCourses] = useState([]);
  const [coursesLoaded, setCoursesLoaded] = useState(false)
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  /// Form props

  const [formTitle, setFormTitle] = useState('Add');
  const [fromCourseName, setFormCourseName] = useState('');
  const [formCourseLang, setFormCourseLang] = useState('');
  const [oldCourseName, setOldCourseName] = useState('');


  const createCoursesObjects = labs_array => {
    let courses_objects = [];

    labs_array.forEach((lab, index, _arr) => {
      lab.id = `${index}`;
      courses_objects.push(lab);
    });

    setCourses(courses_objects);
  };

  useEffect(() => {
    if (didMount) {
      setCoursesLoaded(true)
    }
  }, [courses])

  useEffect(() => {
    setDidMount(true)
    apiClient.getCourses(true).then(res => {
      createCoursesObjects(res.data.courses);
    });
  }, []);

  const addCourse = () => {
    let newCourse = {
      "name": fromCourseName,
      "variant": formCourseLang,
      "labs": []
    };

    apiClient.addCourse(newCourse).then(rest => {
      setFormTitle('Add');
      setFormCourseName('');
      apiClient.getCourses(true).then(res => {
        createCoursesObjects(res.data.courses);
      });
    });
  };

  const editCourse = () => {
    apiClient.getCourseEdit(oldCourseName).then(res => {

      let course = res.data;
      let temp = {};

      temp.name = fromCourseName;
      temp.type = course.type;
      temp.labs = course.labs;
      temp.variant = formCourseLang;

      apiClient.updateCourse(temp, oldCourseName).then(_res => {
        apiClient.getCourses(true).then(res => {
          createCoursesObjects(res.data.courses);

          setFormTitle('Add');
          setFormCourseName('');
        });
      });
    });
  };

  const deleteCourse = (courseName) => {
    apiClient.deleteCourse(courseName).then(_res => {
      apiClient.getCourses(true).then(res => {
        createCoursesObjects(res.data.courses);

        setFormTitle('Add');
        setFormCourseName('');
      });
    });
  };


  return (
    <div>
      <AppHeader />
      <Modal
        hasForm
        open={openModal}
        onRequestClose={() => {
          setOpenModal(false);
          setFormTitle('Add');
          setFormCourseName('');
        }}
        primaryButtonText='Save'
        secondaryButtonText='Close'
        onRequestSubmit={() => {
          if (isEdit) {
            editCourse();
          } else {
            addCourse();
          }

          setOpenModal(false);
        }}
        size='sm'
        modalHeading="Course"
        modalLabel={formTitle.toString()}
      >
        <div style={{ height: 32 }}></div>
        <TextInput
          disabled={isEdit}
          helperText="E.G: CC451-Computer Networks"
          id="courseName"
          labelText="Name"
          value={fromCourseName}
          onChange={(data) => { setFormCourseName(data.target.value); }}
          placeholder="Enter course name"
        />
        <div style={{ height: 24 }}></div>
        <Dropdown
          id="langDropdown"
          titleText="Select Language"

          label="Select"
          selectedItem={formCourseLang}
          onChange={(data) => {
            setFormCourseLang(data.selectedItem);
          }}
          items={['C', 'Java', 'Python']}
        />
        <div style={{ height: 40 }}></div>
      </Modal>
      <div style={{ marginLeft: 16, marginTop: 64, marginRight: 16 }}>
        <div style={{ height: 16 }}></div>
        <h1>Browse Courses</h1>
        <div style={{ height: 40 }}></div>
        <p>Data Analysis</p>
        <div style={{ height: 8 }}></div>
        <div style={{ width: 208 }}>
          <Tile>
            Total Courses
            <h3>{courses.length}</h3>
          </Tile>
        </div>
        <div style={{ height: 56 }}></div>
        {
          coursesLoaded ?
            (
              <DataTable
                rows={courses}
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
                    key: "variant",
                    header: "Variant",
                  },
                  {
                    key: 'actions',
                    header: "Actions"
                  }
                ]}
                render={({
                  rows,
                  headers,
                  onInputChange,
                }) => (
                    <TableContainer>
                      <TableToolbar aria-label="data table toolbar">
                        <TableToolbarContent>
                          <TableToolbarSearch onChange={onInputChange} />
                        </TableToolbarContent>
                        <Button
                          renderIcon={Add16}
                          onClick={
                            () => {
                              setIsEdit(false);
                              setFormTitle('Add');
                              setFormCourseName('');
                              setOpenModal(true);
                            }}>Add Course</Button>
                      </TableToolbar>
                      <Table>
                        <TableHead>
                          <TableRow>
                            {headers.map((header) => (
                              <TableHeader>
                                {header.header}
                              </TableHeader>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow>
                              {row.cells.map((cell) => (
                                <TableCell key={cell.id}>
                                  {
                                    cell.value === row.cells[3].value ?
                                      <span>
                                        <Button kind="ghost" size="small" hasIconOnly renderIcon={Edit16} iconDescription="Edit"
                                          onClick={() => {
                                            setOldCourseName(row.cells[1].value);
                                            setFormCourseName(row.cells[1].value);
                                            setFormCourseLang(row.cells[2].value)
                                            setIsEdit(true);
                                            setFormTitle('Edit');
                                            setOpenModal(true);
                                          }}
                                        />
                                        <Button kind="ghost" size="small" hasIconOnly renderIcon={Delete16} iconDescription="Delete"
                                          onClick={() => { deleteCourse(row.cells[1].value); }}
                                        />
                                      </span>
                                      : cell.value
                                  }
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

export default CoursesPage;
