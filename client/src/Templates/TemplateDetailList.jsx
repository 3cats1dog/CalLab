import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import { DataGrid} from '@mui/x-data-grid';
import { History } from 'history';
import { columns } from 'shared/constants/templatedetails';
import { filter } from 'lodash';
import { render } from 'react-dom';

import DeleteByProcedure from './TemplateDetailDeleteProcedure';
import DeleteDetail from './TemplateDetailDelete';
import { engineeringNotation } from 'shared/utils/engineerNotation';
import styled from 'styled-components';
import { data } from 'Dashboard/Board/fakeChartdata';

export const Dgrid = styled.div`
  display: flex;
  margin: 26px -5px 0;
  height:600px;
`;

const propTypes = {
  detailList:PropTypes.array.isRequired,
  fetchDetail:PropTypes.func.isRequired,
  dataType:PropTypes.array,
};


const TemplateDetailList = ({ detailList, fetchDetail,dataType }) => {
  const match = useRouteMatch();
  const history=useHistory();

  let dataUnit="";
  if (dataType){  dataUnit = dataType.Unit ;}
 
  const DetailListWithGroupRow=(list)=>{
    let i=0;
    let lastPId=0;
    let newList=[];
    if (list.length==0) return newList;
    while(i<list.length)
    {
      if (lastPId != list[i].ProcedureId)
      {
        lastPId=list[i].ProcedureId;
        var pHeader= { "TemplateDetailId":"x"+i, "ProcedureId": lastPId, "TemplateId": list[i].TemplateId, "Position":"-", "procedure": list[i].procedure};
        newList.push(pHeader);
        //list.splice(i,0, pHeader);
      }
      newList.push(list[i]);
      i++;
    }
    return newList;
  }

  const xList= DetailListWithGroupRow(detailList);
  if (columns.length==7)
  {
    const clickColumn =
    {
      field: 'action',
      headerName: 'Delete',
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          history.push(`${match.path}/data/${params.id}`);
        };
        if (params.row.Position=="-")
        {
          return <DeleteByProcedure 
          procedure={params.row.procedure} 
          templateId={params.row.TemplateId} 
          modalClose={fetchDetail} 
          />
        }else
        {
          return <DeleteDetail 
            templateDetailId={params.id}
            modalClose={fetchDetail} 
          />
        }
      },
    };
    columns.unshift(clickColumn);
  }


  function setPosition(params) {
    const [Position]=params.value
    return {...params.row, Position};
  }

  columns.find(x => x.field === 'Position').valueSetter = setPosition;
  columns.find(x => x.field === 'NominalValue').renderCell = (params) => {
    return <div className='rowitem'>{engineeringNotation(params.row.NominalValue,0,1)}{dataUnit}</div>
  };

  columns.find(x => x.field === 'ProcedureId').renderCell =(params) => {
      const onUpClick =(e) => { };
      const onDownClick =(e) => { };
      return <div className="rowitem" style={{fontWeight:"bold"}}>
      {params.row?.Position == "-" ?  params.row?.procedure?.Name: ""}
      </div>;
  };

  return (
    <Dgrid>
      <DataGrid 
      rows={xList}
      columns={columns}
      pageSize={50}
      getRowId={(row) => row.TemplateDetailId}
      rowsPerPageOptions={[20]}
      checkboxSelection ={false}
    />
    </Dgrid>
  );
};

TemplateDetailList.propTypes = propTypes;

export default TemplateDetailList;
