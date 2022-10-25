
export const columns  = [
    {headerName :"Id",  field:'TemplateDetailId', sortable: true, hide:true},
    {headerName :"#", field:'Position', sortable: false, width: 25, editable: true, hide:true},
    {headerName:"Prodecure", field:"ProcedureId", sortable:false, width:150,},
    {headerName :"Sub Proc.", field:'SubProcedureId', sortable: false, width: 200,
    renderCell: (params) => {
      return <div className="rowitem">
        {params.row?.subProcedure?.Range}
        </div>;
    }},
    {headerName:"Nominal Value", field:"NominalValue", sortable:false, width:200, editable:true},
    {headerName:"Count", field:"DataCount", sortable:false, width:80, hide:false},
    {headerName:"Uncertinity", field:"Uncertinity", sortable:false, width:200,
     renderCell: (params) => {
      return <div className="rowitem">
        {params.row?.subProcedure?.Uncertinity}
        </div>;
    }},
];

  const fakeStepList=[
    {"StepId": 1, "ProcedureId":1, "SubProcedureId":1, 'Position':1},
    {"StepId": 2, "ProcedureId":1, "SubProcedureId":2, 'Position':2},
    {"StepId": 3, "ProcedureId":1, "SubProcedureId":3, 'Position':3},
    {"StepId": 4, "ProcedureId":1, "SubProcedureId":4, 'Position':4},
    {"StepId": 5, "ProcedureId":1, "SubProcedureId":5, 'Position':5},
  ];