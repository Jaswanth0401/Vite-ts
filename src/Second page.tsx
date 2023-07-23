// SecondPage.tsx
import React, { useState, useEffect } from 'react';
import PostTable from './PostTable';
import DepartmentTable from './Department List';
import { Department } from './models';

const SecondPage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [showDepartmentTable, setShowDepartmentTable] = useState(false);

  useEffect(() => {
    // Fetch posts data from API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.log('Error fetching posts:', error));

    // Sample JSON data for departments and sub-departments
    const departmentsData: Department[] = [
      {
        id: 1,
        name: 'Department A',
        subDepartments: [
          { id: 11, name: 'Sub-Department A1', selected: false },
          { id: 12, name: 'Sub-Department A2', selected: false },
        ],
        selected: false,
      },
      {
        id: 2,
        name: 'Department B',
        subDepartments: [
          { id: 21, name: 'Sub-Department B1', selected: false },
          { id: 22, name: 'Sub-Department B2', selected: false },
          { id: 23, name: 'Sub-Department B3', selected: false },
        ],
        selected: false,
      },
    ];

    setDepartments(departmentsData);
  }, []);

  const handleNextButtonClick = () => {
    setShowDepartmentTable(true);
  };

  return (
    <div>
      <h1>Fetching data</h1>
      <h2>Table</h2>
      <PostTable data={posts} />
      {showDepartmentTable ? (
        <DepartmentTable data={departments} />
      ) : (
        <button onClick={handleNextButtonClick}>Click to show the department list</button>
      )}
    </div>
  );
};

export default SecondPage;