
export const columns  = [
    {headerName :"Id",  field:'CalibrationDataId', sortable: true, hide:true},
    {headerName :"#", field:'StepId', sortable: false, width: 25, hide:true},
    {headerName :"Sub Proc.", field:'SubProcedureId', sortable: false, width: 200, hide:true,
    renderCell: (params) => {
      return <div className="rowitem">
        {params.row?.subProcedure?.Range}
        </div>;
    }},
    {headerName:"Value", field:"InputText", sortable:false, width:200, hide:false},
    {headerName:"Value", field:"Value", sortable:false, width:80,hide:false},
];

  const fakeDataList=[
    {"CalibrationDataId": 1, "StepId":1, "SubProcedureId":1, 'InputText':"1.34", Value:1.34},
    {"CalibrationDataId": 2, "StepId":1, "SubProcedureId":1, 'InputText':"1.33", Value:1.33},
    {"CalibrationDataId": 3, "StepId":1, "SubProcedureId":1, 'InputText':"1,54", Value:1.54},
    {"CalibrationDataId": 4, "StepId":1, "SubProcedureId":1, 'InputText':"1,25", Value:1.25},
    {"CalibrationDataId": 5, "StepId":1, "SubProcedureId":1, 'InputText':"1,29", Value:1.29},
  ];



  export const ScaleType = {
    GIGA:"E+9",
    MEGA: 'E+6',
    KILO:"E+3",
    NONE:"E+0",
    MILI:"E-3",
    MICRO:"E-6",
    NANO: 'E-9',
    PICO:"E-12",
    FEMTO: 'E-15',
  };
  
  
  export const ScaleTypeCopy = {
    [ScaleType.GIGA]: 'G',
    [ScaleType.MEGA]: 'M',
    [ScaleType.KILO]: 'k',
    [ScaleType.NONE]: ' ',
    [ScaleType.MILI]: 'm',
    [ScaleType.MICRO]: 'µ',
    [ScaleType.NANO]: 'n',
    [ScaleType.PICO]: 'p',
    [ScaleType.FEMTO]: 'f',
  };
