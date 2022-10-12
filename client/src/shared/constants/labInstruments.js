export const columns  = [
    {headerName :"Id",  field:'LabInstrId', sortable: true},
    {headerName :"Name", field:'Name', sortable: true, width: 200},
    {headerName :"Brand", field:'Brand', sortable: true, width: 200},
    {headerName :"Model", field:'Model', sortable: true, width: 200},
    {headerName :"SerialNo", field:'SerialNo', sortable: true, width: 200},
    {headerName :"TagNo", field:'TagNo', sortable: true, width: 200},
    {headerName :"Last Calib. Date", field:'LastCalibDate', sortable: true, width: 200},
];


export const TagType = {
    TASK: 'task',
    BUG: 'bug',
    STORY: 'story',
  };
  
  
  export const TagTypeCopy = {
    [TagType.TASK]: 'Task',
    [TagType.BUG]: 'Bug',
    [TagType.STORY]: 'Story',
  };