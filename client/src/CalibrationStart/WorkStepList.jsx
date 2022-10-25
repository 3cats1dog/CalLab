import React, { Fragment } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import { DataGrid} from '@mui/x-data-grid';
import { History } from 'history';
import { columns } from 'shared/constants/calibrationsteps';
import { filter } from 'lodash';
import { render } from 'react-dom';

import styled from 'styled-components';
import { engineeringNotation } from 'shared/utils/engineerNotation';

import { CalibrationStatus } from 'shared/constants/calibration';

export const Dgrid = styled.div`
  display: flex;
  margin: 26px -5px 0;
  height:600px;
`;

import { darken, lighten } from '@mui/material/styles';
import { StepDelete } from './CalibrationSteps';

const getBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);


  function DetailListWithGroupRow (list) {
    let i=0;
    let lastPId=0;
    let newList=[];
    if (list.length==0) return newList;
    while(i<list.length)
    {
      if (lastPId != list[i].ProcedureId)
      {
        lastPId=list[i].ProcedureId;
        var pHeader= { "StepId":"x"+i, "ProcedureId": lastPId, "CalibrationId": list[i].CalibrationId, "Position":"-", "procedure": list[i].procedure};
        newList.push(pHeader);
        //list.splice(i,0, pHeader);
      }
      newList.push(list[i]);
      i++;
    }
    return newList;
  }


const propTypes = {
  stepList:PropTypes.array.isRequired,
  initialLoadingState:PropTypes.bool.isRequired,
  filters: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  fetchSteps:PropTypes.func.isRequired,
};


const WorkStepList = ({ stepList, initialLoadingState, filters, status, fetchSteps }) => {
  const {searchTerm} = filters;
  const match = useRouteMatch();
  const history=useHistory();

  const [loading, setLoading] = React.useState(initialLoadingState);

  const xList= DetailListWithGroupRow(stepList);

  React.useEffect(() => {
    setLoading(initialLoadingState);
  }, [initialLoadingState]);

  if (columns.length==11)
  {
    let isEdit = status ==CalibrationStatus.WAITEDIT;
    const clickColumn =
    {
      field: 'action',
      headerName: 'Edit',
      sortable: false,
      width:isEdit ? "150": "80",
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          if (status ==CalibrationStatus.WAITEDIT)
          {
            history.push(`${match.path.replace(":calibrationId",params.row.CalibrationId)}/stepedit/${params.id}`);
          }else if (status ==CalibrationStatus.INPROGRESS)
          {
            history.push(`${match.path.replace(":calibrationId",params.row.CalibrationId)}/step/${params.id}`);
          }
        };
        if (params.row.Position == "-") return "";
       
        return (
          <Fragment>
            <Button onClick={onClick} > {isEdit ?  "Edit": "Start" }</Button>
            {isEdit && <StepDelete stepId={params.id} refreshBack={fetchSteps}  /> }
          </Fragment>
          );
      },
    };
    columns.unshift(clickColumn);
  }

  columns.find(x=> x.field == "NominalValue").renderCell =(params) => {
      return <div className='rowitem'>{engineeringNotation(params.row?.NominalValue, 0, 1)}</div>
  };

  /*
  columns.find(x => x.field === 'ProcedureId').renderCell =(params) => {
    const onUpClick =(e) => { };
    const onDownClick =(e) => { };
    return <div className="rowitem" style={{fontWeight:"bold"}}>
    {params.row?.Position == "-" ?  params.row?.procedure?.Name: ""}
    </div>;
  };
  */

columns.find(x => x.field === 'Status').cellClassName =(params) => {
  return `super-app-theme--${params.row.Status}`;
};



  const handleRowOrderChange = async (params) => {
    setLoading(true);
    const newRows = await updateRowPosition(
      params.oldIndex,
      params.targetIndex,
      rows,
    );

    setRows(newRows);
    setLoading(false);
  };

  return (
<Box
      sx={{
        height: 600,
        width: '100%',
        '& .super-app-theme--empty': {
          bgcolor: (theme) =>
            getBackgroundColor(theme.palette.info.main, theme.palette.mode),
          '&:hover': {
            bgcolor: (theme) =>
              getHoverBackgroundColor(theme.palette.info.main, theme.palette.mode),
          },
        },
        '& .super-app-theme--passed': {
          bgcolor: (theme) =>
            getBackgroundColor(theme.palette.success.main, theme.palette.mode),
          '&:hover': {
            bgcolor: (theme) =>
              getHoverBackgroundColor(
                theme.palette.success.main,
                theme.palette.mode,
              ),
          },
        },
        '& .super-app-theme--waitmore': {
          bgcolor: (theme) =>
            getBackgroundColor(theme.palette.warning.main, theme.palette.mode),
          '&:hover': {
            bgcolor: (theme) =>
              getHoverBackgroundColor(
                theme.palette.warning.main,
                theme.palette.mode,
              ),
          },
        },
        '& .super-app-theme--error': {
          bgcolor: (theme) =>
            getBackgroundColor(theme.palette.error.main, theme.palette.mode),
          '&:hover': {
            bgcolor: (theme) =>
              getHoverBackgroundColor(theme.palette.error.main, theme.palette.mode),
          },
        },
      }}
    >
      <DataGrid 
      rows={xList}
      columns={columns}
      pageSize={20}
      getRowId={(row) => row.StepId}
      rowsPerPageOptions={[20]}
      checkboxSelection ={false}
      filterModel={{
        items: [
          { columnField: 'Name', value: `${searchTerm}`, operatorValue: 'contains' },
        ],
      }} 
      loading={loading}
      rowReordering
      onRowOrderChange={handleRowOrderChange}
      //getRowClassName={(params) => `super-app-theme--${params.row.Status}`}
    />
    </Box>
  );
};

WorkStepList.propTypes = propTypes;

export default WorkStepList;
