// DepartmentTable.tsx
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Checkbox } from '@mui/material';
import { Department } from './models';

interface DepartmentListProps {
  data: Department[];
}

const DepartmentList: React.FC<DepartmentListProps> = ({ data }) => {
  const [departments, setDepartments] = useState<Department[]>(data);

  const handleDepartmentChange = (departmentId: number, checked: boolean) => {
    const updatedDepartments = departments.map((dept) => {
      if (dept.id === departmentId) {
        dept.selected = checked;
        dept.subDepartments.forEach((subDept) => (subDept.selected = checked));
      } else {
        const allSubSelected = dept.subDepartments.every((subDept) => subDept.selected);
        if (allSubSelected) dept.selected = true;
        else dept.selected = false;
      }
      return dept;
    });

    setDepartments(updatedDepartments);
  };

  const handleSubDepartmentChange = (departmentId: number, subDepartmentId: number, checked: boolean) => {
    const updatedDepartments = departments.map((dept) => {
      if (dept.id === departmentId) {
        const subDept = dept.subDepartments.find((sub) => sub.id === subDepartmentId);
        if (subDept) {
          subDept.selected = checked;
          const allSubSelected = dept.subDepartments.every((sub) => sub.selected);
          dept.selected = allSubSelected;
        }
      }
      return dept;
    });

    setDepartments(updatedDepartments);
  };

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {departments.map((dept) => (
            <React.Fragment key={dept.id}>
              <TableRow>
                <TableCell>
                  <Checkbox
                    checked={dept.selected}
                    onChange={(e) => handleDepartmentChange(dept.id, e.target.checked)}
                  />
                </TableCell>
                <TableCell>{dept.name}</TableCell>
                <TableCell />
              </TableRow>
              {dept.subDepartments.map((subDept) => (
                <TableRow key={subDept.id}>
                  <TableCell />
                  <TableCell>{subDept.name}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={subDept.selected}
                      onChange={(e) => handleSubDepartmentChange(dept.id, subDept.id, e.target.checked)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DepartmentList;
