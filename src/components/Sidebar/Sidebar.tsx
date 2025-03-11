import React from 'react';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import { Typography } from '@mui/material';

import './Sidebar.css';

interface Column {
  name: string;
  type: string;
}

interface Table {
  name: string;
  columns: Column[];
}

const tables: Table[] = [
  { name: 'users', columns: [
    { name: 'id', type: 'int' },
    { name: 'name', type: 'varchar' },
    { name: 'email', type: 'varchar' },
  ] },
  { name: 'orders', columns: [
    { name: 'id', type: 'int' },
    { name: 'user_id', type: 'int' },
    { name: 'total_price', type: 'decimal' },
  ] },
  { name: 'products', columns: [
    { name: 'id', type: 'int' },
    { name: 'name', type: 'varchar' },
    { name: 'price', type: 'decimal' },
  ] },
  { name: 'categories', columns: [
    { name: 'id', type: 'int' },
    { name: 'name', type: 'varchar' },
  ] },
  { name: 'customers', columns: [
    { name: 'id', type: 'int' },
    { name: 'name', type: 'varchar' },
    { name: 'phone', type: 'varchar' },
  ] },
  { name: 'payments', columns: [
    { name: 'id', type: 'int' },
    { name: 'order_id', type: 'int' },
    { name: 'amount', type: 'decimal' },
  ] },
  { name: 'reviews', columns: [
    { name: 'id', type: 'int' },
    { name: 'product_id', type: 'int' },
    { name: 'rating', type: 'int' },
  ] },
  { name: 'shipping', columns: [
    { name: 'id', type: 'int' },
    { name: 'order_id', type: 'int' },
    { name: 'address', type: 'varchar' },
  ] },
  { name: 'employees', columns: [
    { name: 'id', type: 'int' },
    { name: 'name', type: 'varchar' },
    { name: 'department', type: 'varchar' },
  ] },
  { name: 'suppliers', columns: [
    { name: 'id', type: 'int' },
    { name: 'name', type: 'varchar' },
    { name: 'contact', type: 'varchar' },
  ] },
];

const Sidebar: React.FC = () => {
  return (
    <div className='sidebar'>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 8
        }}>
        <Typography
          variant="h6"
          component="h2"
          color='primary'
        >
          Tables
        </Typography>
      </div>
      <SimpleTreeView aria-label="database schema">
        {tables.map((table, index) => (
          <TreeItem itemId={table.name} label={table.name} key={index}>
            {table.columns.map((column, colIndex) => (
              <TreeItem
                itemId={`${table.name}-${column.name}`}
                label={`${column.name} (${column.type})`}
                key={colIndex}
              />
            ))}
          </TreeItem>
        ))}
      </SimpleTreeView>
    </div>
  );
};

export default Sidebar;
