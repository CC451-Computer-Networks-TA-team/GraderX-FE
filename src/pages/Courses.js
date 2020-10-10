import React, { useState, useEffect } from 'react';
import apiClient from "../api-client";

import {
  Link, Tile, DataTable, Button,
  TextInput, Dropdown, Modal,
} from 'carbon-components-react';


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
  let [courses, setCourses] = useState([]);
  let [openModal, setOpenModal] = useState(false);
  let [isEdit, setIsEdit] = useState(false);
  /// Form props

  let [formTitle, setFormTitle] = useState('Add');
  let [fromCourseName, setFormCourseName] = useState('');
  let [formCourseLang, setFormCourseLang] = useState('');
  let [oldCourseName, setOldCourseName] = useState('');


  const createCoursesObjects = labs_array => {
    let courses_objects = [];
    labs_array.forEach((lab, index, _arr) => {
      courses_objects.push({ id: `${index}`, key: lab, text: lab, value: lab });
    });
    setCourses(courses_objects);
  };

  useEffect(() => {
    apiClient.getCourses().then(res => {
      createCoursesObjects(res.data.courses);
    });
  }, []);

  const addCourse = () => {
    let newCourse = {
      "name": fromCourseName,
      "variant": formCourseLang.toLowerCase(),
      "labs": []
    };

    apiClient.addCourse(newCourse).then(rest => {
      setFormTitle('Add');
      setFormCourseName('');

      apiClient.getCourses().then(res => {
        createCoursesObjects(res.data.courses);
      });
    });
  };

  const editCourse = () => {
    apiClient.getCourseEdit(oldCourseName).then(res => {
      let course = res.data;
      let temp = {};

      temp.variant = formCourseLang;
      temp.name = fromCourseName;
      temp.labs = course.labs;

      apiClient.updateCourse(temp, oldCourseName).then(_res => {
        apiClient.getCourses().then(res => {
          createCoursesObjects(res.data.courses);

          setFormTitle('Add');
          setFormCourseName('');
        });
      });
    });
  };

  const deleteCourse = (couseName) => {
    console.log(couseName);

    // TODO: consume API

    apiClient.getCourses().then(res => {
      createCoursesObjects(res.data.courses);

      // refresh data
    });
  };


  return (
    <div>
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
          onChange={(data) => {
            setFormCourseLang(data.selectedItem);
          }}
          items={['C', 'Java', 'Python']}
        />
        <div style={{ height: 40 }}></div>
      </Modal>
      <div style={{ marginLeft: 16, marginTop: 64, marginRight: 16 }}>
        <Link href="#">Courses</Link>
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
        <DataTable
          rows={courses}
          headers={[
            {
              key: "key",
              header: "Name",
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
                    <TableToolbarMenu>
                      <TableToolbarAction
                        onClick={() => { }}
                      > Delete All
                      </TableToolbarAction>
                    </TableToolbarMenu>

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
                              cell.value === row.cells[1].value ?
                                <span>
                                  <Button kind="ghost" size="small" hasIconOnly renderIcon={Edit16} iconDescription="Edit"
                                    onClick={() => {
                                      setOldCourseName(row.cells[0].value);
                                      setFormCourseName(row.cells[0].value);
                                      setIsEdit(true);
                                      setFormTitle('Edit');
                                      setOpenModal(true);
                                    }}
                                  />
                                  <Button kind="ghost" size="small" hasIconOnly renderIcon={Delete16} iconDescription="Delete"
                                    onClick={() => { deleteCourse(row.cells[0].value); }}
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
      </div>
    </div>

  );
}

export default CoursesPage;
