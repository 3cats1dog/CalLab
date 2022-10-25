import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import useApi from 'shared/hooks/api';
import api from 'shared/utils/api';
import toast from 'shared/utils/toast';
import Button from '@mui/material/Button';

import { DataGrid} from '@mui/x-data-grid';
import { columns } from 'shared/constants/calibrationdatas';

import styled from 'styled-components';

export const Dgrid = styled.div`
  display: flex;
  margin: 26px -5px 0;
  height:600px;
`;

const propTypes = {
  dataList:PropTypes.array.isRequired,
  fetchData:PropTypes.func.isRequired,
};


const CalibrationDataList = ({ dataList ,fetchData}) => {
  const match = useRouteMatch();
  const history=useHistory();

  const handleDataDelete = async (dataId) => {
    try {
      await api.delete(`/calibrationdatas/${dataId}`);
      fetchData();
    } catch (error) {
      toast.error(error);
    }
  };

  if (columns.length==5)
  {
    const clickColumn =
    {
      field: 'action',
      headerName: 'Remove',
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          handleDataDelete(`${params.id}`)
        };
        if (params.row.Position == "-") return "";
        return <Button onClick={(onClick)} >X</Button>;
      },
    };
    columns.unshift(clickColumn);
  }

  return (
    <Dgrid>
      <DataGrid 
      rows={dataList}
      columns={columns}
      pageSize={20}
      getRowId={(row) => row.CalibrationDataId}
      rowsPerPageOptions={[20]}
      checkboxSelection ={false}
    />
    </Dgrid>
  );
};

CalibrationDataList.propTypes = propTypes;

export default CalibrationDataList;
