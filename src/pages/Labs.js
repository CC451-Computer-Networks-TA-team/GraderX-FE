import React, {useState, useEffect} from 'react';
import apiClient from "../api-client";
import "./styles.scss"

import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem
} from "carbon-components-react/lib/components/UIShell";

import {
  Link, DataTable, Button,
  Modal, TextInput, Select, SelectItem, Grid, Row, Column, FileUploader, Checkbox, TextArea
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

function LabsPage() {
  const [labs, setLabs] = useState([]);
  const [courseIds, setCourseIds] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false)


  const createLabsObjects = labs_array => {
    let labs_objects = [];

    labs_array.forEach((lab, index, _arr) => {
      lab.id = `${index}`;
      labs_objects.push(lab);
    });

    setLabs(labs_objects);
  };

  const createCoursesIds = courses_array => {
    let courses_ids = [];
    courses_array.forEach((course, index, _arr) => {
      courses_ids.push(course.name);
    });
    setCourseIds(courses_ids);
  };

  const changeLabs = (event) =>{
    const course_name = event.target.value 
    apiClient.getCourses().then(res => {
      res.data.courses.forEach((course) => {
        if(course.name === course_name){
          createLabsObjects(course.labs)
        }
      })
    });
  }

  useEffect(() => {
    apiClient.getCourses().then(res => {
      createCoursesIds(res.data.courses)
      createLabsObjects(res.data.courses[0].labs);
    });
  }, []);

  const addLab = () => {
    
  }

  return (
    <div>
      <div style={{ marginLeft: 16, marginTop: 64, marginRight: 16 }}>
        <Link href="#">Labs</Link>
        <div style={{ height: 16 }}></div>
        <h1>Browse Labs</h1>
        <div style={{ height: 40 }}></div>
        <Select id="select-1" labelText="Select Course" onChange={changeLabs}>

          {/* <SelectItem
            disabled
            hidden
            value="placeholder-item"
            text="Select"
          /> */}
          {courseIds.map(course_id => (
            <SelectItem key={course_id} value={course_id} text={course_id} />
          ))}          
        </Select>
        <Modal
        hasForm
        open={openModal}
        onRequestClose={() => {
          setOpenModal(false);
        }}
        primaryButtonText='Save'
        secondaryButtonText='Close'
        onRequestSubmit={() => {
          addLab();
          setOpenModal(false);
        }}
        size='sm'
        modalHeading="Lab"
        modalLabel="Add"
      >
        <Grid style={{ padding: "0" }}>
          <Row>
            <Column>
              <TextInput
                id="my_input"
                labelText="Name"
              />
            </Column>
            <Column>
              <TextInput
                id="my_input2"
                labelText="Runtime Limit (Seconds)"
              />
            </Column>
          </Row>
          <Row style={{ marginTop: "1rem" }}>
            <Column>
              <Checkbox labelText={`Enable Internet Access`} id="checkbox-label-1" />
            </Column>
          </Row>
          <Row style={{ marginTop: "2rem" }}>
            <Column>
              <FileUploader
                buttonLabel="Add file"
                labelTitle="Test Cases"
                labelDescription="Only .json files, 500kb max file size." />

              <div style={{ marginLeft: 16, marginTop: 8, marginBottom: 8 }}>
                <Row className="container">
                  <p className='column-1' style={{ display: "inline-block" }}>Test case 1</p>

                  <div className='column-2' style={{ display: "inline-block" }}>
                    <Button kind="ghost" size="small" hasIconOnly renderIcon={Edit16} iconDescription="Edit"></Button>
                    <Button kind="ghost" size="small" hasIconOnly renderIcon={Delete16} iconDescription="Delete"></Button>
                  </div>
                </Row>
              </div>

              <div style={{ marginLeft: 16, marginTop: 8, marginBottom: 8 }}>
                <Row className="container">
                  <p className='column-1' style={{ display: "inline-block" }}>T 1</p>

                  <div className='column-2' style={{ display: "inline-block" }}>
                    <Button kind="ghost" size="small" hasIconOnly renderIcon={Edit16} iconDescription="Edit"></Button>
                    <Button kind="ghost" size="small" hasIconOnly renderIcon={Delete16} iconDescription="Delete"></Button>
                  </div>
                </Row>
              </div>

              <Button renderIcon={Add16} onClick={() => { setIsEdit(true); }}>
                Add test case
                </Button>
            </Column>
          </Row>
        </Grid>
      </Modal>
      <Modal
        hasForm
        open={isEdit}
        onRequestClose={() => {
          setIsEdit(false);
        }}
        primaryButtonText='Save'
        secondaryButtonText='Close'
        onRequestSubmit={() => {

        }}
        size='sm'
        modalHeading="Test Case"
        modalLabel="Add"
      >
        <Grid style={{ padding: "0" }}>
          <TextInput
            id="my_input"
            labelText="Name"
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
                    setOpenModal(true);
                  }}>Add Lab</Button>
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
                          cell.value === row.cells[2].value?
                          cell.value ? "Disable" : "Enable"
                          :
                          null
                        }
                        {
                          cell.value === row.cells[4].value ?
                            <span>
                              <Button kind="ghost" size="small" hasIconOnly renderIcon={Edit16} iconDescription="Edit"
                                onClick={() => {
                                  setIsEdit(true);
                                  // setFormTitle('Edit');
                                  // setOpenModal(true);
                                }}
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

export default LabsPage;
