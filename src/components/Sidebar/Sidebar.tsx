import React from 'react';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import { Typography } from '@mui/material';
import Select from '@mui/material/Select';
interface Column {
  name: string;
  type: string;
}

interface Table {
  name: string;
  columns: Column[];
}

const tables: Table[] = [
  { name: 'Users', columns: [
    { name: 'id', type: 'INT' },
    { name: 'name', type: 'VARCHAR' },
    { name: 'email', type: 'VARCHAR' },
  ] },
  { name: 'Orders', columns: [
    { name: 'id', type: 'INT' },
    { name: 'user_id', type: 'INT' },
    { name: 'total_price', type: 'DECIMAL' },
  ] },
  { name: 'Products', columns: [
    { name: 'id', type: 'INT' },
    { name: 'name', type: 'VARCHAR' },
    { name: 'price', type: 'DECIMAL' },
  ] },
  { name: 'Categories', columns: [
    { name: 'id', type: 'INT' },
    { name: 'name', type: 'VARCHAR' },
  ] },
  { name: 'Customers', columns: [
    { name: 'id', type: 'INT' },
    { name: 'name', type: 'VARCHAR' },
    { name: 'phone', type: 'VARCHAR' },
  ] },
  { name: 'Payments', columns: [
    { name: 'id', type: 'INT' },
    { name: 'order_id', type: 'INT' },
    { name: 'amount', type: 'DECIMAL' },
  ] },
  { name: 'Reviews', columns: [
    { name: 'id', type: 'INT' },
    { name: 'product_id', type: 'INT' },
    { name: 'rating', type: 'INT' },
  ] },
  { name: 'Shipping', columns: [
    { name: 'id', type: 'INT' },
    { name: 'order_id', type: 'INT' },
    { name: 'address', type: 'VARCHAR' },
  ] },
  { name: 'Employees', columns: [
    { name: 'id', type: 'INT' },
    { name: 'name', type: 'VARCHAR' },
    { name: 'department', type: 'VARCHAR' },
  ] },
  { name: 'Suppliers', columns: [
    { name: 'id', type: 'INT' },
    { name: 'name', type: 'VARCHAR' },
    { name: 'contact', type: 'VARCHAR' },
  ] },
];

const Sidebar: React.FC = () => {
  return (
    <div>
      <div style={{ display: 'flex',
        justifyContent: 'space-evenly',
        height:  '80%', alignItems: 'center', paddingLeft: 8 }}>
        <Typography
          variant="h6"
          component="h2"
          color='primary'
        >
          Database Tables
        </Typography>
        <Select
          variant="outlined"
          defaultValue="beta"
          size='small'
        >
          <option value="beta">Beta</option>
          <option value="stage">Stage</option>
          <option value="prod">Prod</option>
        </Select>
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
