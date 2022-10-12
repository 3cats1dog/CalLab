import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import { DataGrid, GridColDef, GridApi, GridCellValue } from '@mui/x-data-grid';
import { History } from 'history';
import { columns } from 'shared/constants/calibration';
import { filter } from 'lodash';
import { render } from 'react-dom';
import { CustomNoRowsOverlay } from 'shared/components/NoRowOverLay';
import styled from 'styled-components';

export const Dgrid = styled.div`
  display: flex;
  margin: 26px -5px 0;
  height:600px;
`;


const propTypes = {
  calibrationList:PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
};


const CalibrationLists = ({ calibrationList, filters }) => {
  const {searchTerm} = filters;
  const match = useRouteMatch();
  const history=useHistory();

  if (columns.length==9)
  {
    const clickColumn =
    {
      field: 'action',
      headerName: 'Edit',
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          history.push(`${match.path}/${params.id}`);
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
      rows={calibrationList}
      columns={columns}
      pageSize={5}
      getRowId={(row) => row.CalibrationId}
      rowsPerPageOptions={[20]}
      checkboxSelection ={false}
      filterModel={{
        items: [
          { columnField: 'Remarks', value: `${searchTerm}`, operatorValue: 'contains' },
        ],
      }}
      components={{
        NoRowsOverlay: CustomNoRowsOverlay,
      }}

    />
    </Dgrid>
  );
};

CalibrationLists.propTypes = propTypes;

export default CalibrationLists;
