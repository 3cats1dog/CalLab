import { engineeringNotation } from "shared/utils/engineerNotation";
 
export const columns  = [
    {headerName :"Id",  field:'StepId', sortable: true, hide:true},
    {headerName :"#", field:'Position', sortable: false, width: 25, hide:true},
    {headerName:"Prodecure", field:"ProcedureId", sortable:false, width:200, hide:true},
    {headerName :"Sub Proc.", field:'SubProcedureId', sortable: false, width: 200,
    renderCell: (params) => {
      if (params.row?.Position == "-")
      {
        return <div className="rowitem" style={{fontWeight:"bold"}}>
        {params.row?.Position == "-" ?  params.row?.procedure?.Name: ""}</div>
      }
      return <div className="rowitem">
        {params.row?.subProcedure?.Range}
        </div>;
    }},
    {headerName:"Status", field:"action3", sortable:false, width:200,hide:true},
    {headerName:"Nominal Value", field:"NominalValue", sortable:false, width:80},
    {headerName:"Count", field:"DataCount", sortable:false, width:80, hide:false, renderCell:(params)=>{
      return <div className="rowitem">
          {params.row.Position != "-" ? params.row?.TotalCount + "/" + params.row?.DataCount: ""}
        </div>;
    }},
    {headerName:"Status", field:"Status", sortable:false, width:200, renderCell:(params)=>{
      return <div className="rowitem">
        {StepStatusTypeCopy[params.row?.Status]}
        </div>;
    }},
    {headerName:"Average", field:"AverageValue", sortable:false, width:200, renderCell:(params)=>{
      return <div className="rowitem">
        {engineeringNotation(params.row?.AverageValue,1,2)}
        </div>;
    }},
    {headerName:"Standart Deviation", field:"StandartDeviation", sortable:false, width:200, renderCell:(params)=>{
      return <div className="rowitem">
        {engineeringNotation(params.row?.StandartDeviation,1,2)}
        </div>;
    }},
    {headerName:"Error", field:"Error", sortable:false, width:200, renderCell:(params)=>{
      return <div className="rowitem">
        {engineeringNotation(params.row?.Error,1,2)}
        </div>;
    }},
];

  const fakeStepList=[
    {"StepId": 1, "SubProcedureId":1, 'OrderNo':1},
    {"StepId": 2, "SubProcedureId":2, 'OrderNo':2},
    {"StepId": 3, "SubProcedureId":3, 'OrderNo':3},
    {"StepId": 4, "SubProcedureId":4, 'OrderNo':4},
    {"StepId": 5, "SubProcedureId":5, 'OrderNo':5},
  ];



  export const StepStatusType = {
    EMPTY:"empty",
    PASSED: 'passed',
    WAITMORE:"waitmore",
    ERROR:"error",
    FAIL:"fail",
  };
  
  
  export const StepStatusTypeCopy = {
    [StepStatusType.EMPTY]: 'Wait for data',
    [StepStatusType.PASSED]: 'Passed',
    [StepStatusType.WAITMORE]: 'Wait more data',
    [StepStatusType.ERROR]: 'Some error',
    [StepStatusType.FAIL]: 'Fail on measurement',
  };
