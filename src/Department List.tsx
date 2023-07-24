import React, { useState } from 'react';
import { Button, Collapse, List, ListItem, ListItemIcon, ListItemText, Checkbox } from '@mui/material';
import { Department, SubDepartment } from './models';

interface DepartmentTableProps {
  data: Department[];
}

const DepartmentTable: React.FC<DepartmentTableProps> = ({ data }) => {
  const [departments, setDepartments] = useState<Department[]>(data);

  const handleDepartmentClick = (departmentId: number) => {
    const updatedData = departments.map((department) =>
      department.id === departmentId
        ? { ...department, selected: !department.selected, subDepartments: toggleSubDepartments(department.subDepartments, !department.selected) }
        : department
    );
    setDepartments(updatedData);
  };

  const toggleSubDepartments = (subDepartments: SubDepartment[], selected: boolean) => {
    return subDepartments.map((subDepartment) => ({ ...subDepartment, selected }));
  };

  const handleSubDepartmentClick = (departmentId: number, subDepartmentId: number) => {
    const updatedData = departments.map((department) => {
      if (department.id === departmentId) {
        const updatedSubDepartments = department.subDepartments.map((subDepartment) =>
          subDepartment.id === subDepartmentId ? { ...subDepartment, selected: !subDepartment.selected } : subDepartment
        );
        const isAllSubDepartmentsSelected = updatedSubDepartments.every((subDepartment) => subDepartment.selected);
        return { ...department, subDepartments: updatedSubDepartments, selected: isAllSubDepartmentsSelected };
      } else {
        return department;
      }
    });
    setDepartments(updatedData);
  };

  const handleDropDownClick = (departmentId: number) => {
    const updatedData = departments.map((department) =>
      department.id === departmentId ? { ...department, showSubDepartments: !department.showSubDepartments } : department
    );
    setDepartments(updatedData);
  };

  return (
    <List component="nav" dense>
      {departments.map((department) => (
        <React.Fragment key={department.id}>
          <ListItem>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={department.selected}
                tabIndex={-1}
                disableRipple
                onClick={() => handleDepartmentClick(department.id)}
              />
            </ListItemIcon>
            <ListItemText primary={department.name} />
            <Button onClick={() => handleDropDownClick(department.id)}>
              {department.showSubDepartments ? 'Hide Sub-departments' : 'Show Sub-departments'}
            </Button>
          </ListItem>
          <Collapse in={department.showSubDepartments} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.subDepartments.map((subDepartment) => (
                <ListItem key={subDepartment.id} style={{ paddingLeft: 32 }}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={subDepartment.selected}
                      tabIndex={-1}
                      disableRipple
                      onClick={() => handleSubDepartmentClick(department.id, subDepartment.id)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={subDepartment.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default DepartmentTable;
