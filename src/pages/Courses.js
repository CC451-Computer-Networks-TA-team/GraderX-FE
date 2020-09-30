import React, { useState, useEffect } from 'react';
import apiClient from "../api-client";

import {
  Link, Tile, DataTable, Button,
  ModalWrapper, TextInput, Select, SelectItem
} from 'carbon-components-react';


import { Delete16, Edit16 } from '@carbon/icons-react';

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
  const [courses, setCourses] = useState([]);

  return (
    <div>
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
            <h3>13</h3>
          </Tile>
        </div>
        <div style={{ height: 56 }}></div>
        <DataTable
          rows={[
            {
              id: "a",
              name: "Load Balancer 3",
              protocol: "HTTP",
              port: 3000,
              rule: "Round robin",
              attached_groups: "Kevin’s VM Groups",
              status: "Disabled",
            },
            {
              id: "b",
              name: "Load Balancer 1",
              protocol: "HTTP",
              port: 443,
              rule: "Round robin",
              attached_groups: "Maureen’s VM Groups",
              status: "Starting",
            },
            {
              id: "c",
              name: "Load Balancer 2",
              protocol: "HTTP",
              port: 80,
              rule: "DNS delegation",
              attached_groups: "Andrew’s VM Groups",
              status: "Active",
            },
            {
              id: "d",
              name: "Load Balancer 6",
              protocol: "HTTP",
              port: 3000,
              rule: "Round robin",
              attached_groups: "Marc’s VM Groups",
              status: "Disabled",
            },
            {
              id: "e",
              name: "Load Balancer 4",
              protocol: "HTTP",
              port: 443,
              rule: "Round robin",
              attached_groups: "Mel’s VM Groups",
              status: "Starting",
            },
            {
              id: "f",
              name: "Load Balancer 5",
              protocol: "HTTP",
              port: 80,
              rule: "DNS delegation",
              attached_groups: "Ronja’s VM Groups",
              status: "Active",
            },
          ]}
          headers={[
            {
              key: "name",
              header: "Name",
            },
            {
              key: "protocol",
              header: "Protocol",
            },
            {
              key: "port",
              header: "Port",
            },
            {
              key: "rule",
              header: "Rule",
            },
            {
              key: "attached_groups",
              header: "Attached Groups",
            },
            {
              key: "status",
              header: "Status",
            },
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
                        onClick={function name() { }}

                      > Delete All
                      </TableToolbarAction>

                    </TableToolbarMenu>

                  </TableToolbarContent>
                  <ModalWrapper
                    hasForm
                    size='sm'
                    buttonTriggerText="Add"
                    modalHeading="Course"
                    modalLabel="Add Course"
                  >
                    <TextInput
                      helperText="E.G: CC451-Computer Networks"
                      id="courseName"
                      labelText="Name"
                      placeholder="Enter course name"
                    />
                    <div style={{ height: 24 }}></div>
                    <Select id="select-1" labelText="Select Language">
                      <SelectItem
                        disabled
                        hidden
                        value="placeholder-item"
                        text="Select a language"
                      />
                      <SelectItem value="option-1" text="C" />
                      <SelectItem value="option-2" text="Python" />
                      <SelectItem value="option-3" text="Java" />
                    </Select>
                  </ModalWrapper>
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
                              cell.value === row.cells[5].value ?
                                <span>
                                  <Button kind="ghost" size="small" hasIconOnly renderIcon={Edit16} iconDescription="Edit" />
                                  <Button kind="ghost" size="small" hasIconOnly renderIcon={Delete16} iconDescription="Delete" />
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
