import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import { DataGrid, GridColDef, GridApi, GridCellValue } from '@mui/x-data-grid';
import { History } from 'history';
import { columns } from 'shared/constants/categorys';
import { filter,isUndefined } from 'lodash';
import { render } from 'react-dom';

import styled from 'styled-components';

export const Dgrid = styled.div`
  display: flex;
  margin: 26px -5px 0;
  height:600px;
`;

const propTypes = {
  categorylist:PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  onSelected:PropTypes.func,
};


const CategoryLists = ({ categorylist, filters, onSelected }) => {
  const {searchTerm} = filters;
  const match = useRouteMatch();
  const history=useHistory();

  const onRowsSelectionHandler = (ids) => {
    //const selectedRowsData = ids.map((id) => categorylist.find((row) => row.CategoryId === id));
    if ( isUndefined(ids)) return;
    if (ids.length==0) return;
    const categoryId=ids[0];
    const selectedCategory = categorylist.find((row) => row.CategoryId === categoryId);
    console.log(selectedCategory.CategoryId);
    if (onSelected)
    {
      onSelected(selectedCategory);
    }
  };

  if (columns.length==3)
  {
    const clickColumn =
    {
      field: 'action',
      headerName: 'Edit',
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          history.push(`${match.path}/categorys/${params.id}`);
          return;
          const api  = params.api;
          const thisRow = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
            );
          return alert(JSON.stringify(thisRow, null, 4));
        };
        return <Button onClick={onClick} >Edit</Button>;
      },
    };
    columns.unshift(clickColumn);
  }
  {console.log("categorylist");}
  //{select.map((val) => val.Name)}
  return (
    <Dgrid>
      <h1></h1>
      <DataGrid 
      rows={categorylist}
      columns={columns}
      pageSize={20}
      getRowId={(row) => row.CategoryId}
      rowsPerPageOptions={[20]}
      checkboxSelection ={false}
      filterModel={{
        items: [
          { columnField: 'Name', value: `${searchTerm}`, operatorValue: 'contains' },
        ],
      }}
      onSelectionModelChange={(ids) => { onRowsSelectionHandler(ids);}}
    />
    </Dgrid>
  );
};

CategoryLists.propTypes = propTypes;

export default CategoryLists;
