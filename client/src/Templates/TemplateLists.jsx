import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import { DataGrid, GridColDef, GridApi, GridCellValue } from '@mui/x-data-grid';
import { History } from 'history';
import { columns } from 'shared/constants/templates';
import { CustomNoRowsOverlay } from 'shared/components/NoRowOverLay';
import { filter, isUndefined } from 'lodash';
import { render } from 'react-dom';

import styled from 'styled-components';

export const Dgrid = styled.div`
  display: flex;
  margin: 26px -5px 0;
  height:600px;
`;


const propTypes = {
  templateList:PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  onSelected:PropTypes.func.isRequired,
};


const TemplateLists = ({ templateList, filters, onSelected }) => {
  const {searchTerm} = filters;
  const match = useRouteMatch();
  const history=useHistory();

  const onRowsSelectionHandler = (ids) => {
    if ( isUndefined(ids)) return;
    if (ids.length==0) return;
    const templatedId=ids[0];
    const selectedTemplate = templateList.find((row) => row.TemplateId === templatedId);
    console.log(selectedTemplate.TemplatedId);
    if (onSelected)
    {
      onSelected(selectedTemplate);
    }
  };

  if (columns.length==4)
  {
    const clickColumn =
    {
      field: 'action',
      headerName: 'Edit',
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          //history.push(`${match.path}/${params.id}`);
          history.push(`/template/${params.id}`);
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

  return (
    <Dgrid>
      <DataGrid 
      rows={templateList}
      columns={columns}
      pageSize={20}
      getRowId={(row) => row.TemplateId}
      rowsPerPageOptions={[20]}
      checkboxSelection ={false}
      filterModel={{
        items: [
          { columnField: 'Name', value: `${searchTerm}`, operatorValue: 'contains' },
        ],
      }}
      onSelectionModelChange={(ids) => { onRowsSelectionHandler(ids);}}
      components={{
        NoRowsOverlay: CustomNoRowsOverlay,
      }}
    />
    </Dgrid>
  );
};

TemplateLists.propTypes = propTypes;

export default TemplateLists;
