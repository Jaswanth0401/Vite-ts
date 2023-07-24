import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Post  from './Post'; 

interface PostTableProps {
  data: Post[];
}

const PostTable: React.FC<PostTableProps> = ({ data }) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 600 },
  ];

  const rows = data.map((post) => ({
    id: post.id.toString(), 
    title: post.title,
    body: post.body,
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default PostTable;
