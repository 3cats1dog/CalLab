export const columns  = [
    {headerName :"Id",  field:'CalibrationId', sortable: true},
    {headerName :"Type", field:'Type', sortable: true, width: 200},
    {headerName :"Status", field:'Status', sortable: true, width: 200},
    {headerName :"Remarks", field:'Remarks', sortable: true, width: 200},
    {headerName :"CustomerReq", field:'CustomerReq', sortable: true, width: 200},
    {headerName :"DeviceReq", field:'DeviceReq', sortable: true, width: 200},
    {headerName :"Instrument", field:'InstrumentId', sortable: true, width: 200 ,
    renderCell: (params) => {
      return <div className="rowitem">{params.row?.instrument?.Name}</div>;
    }},
    {headerName :"Customer", field:'CustomerId', sortable: true, width: 200,
    renderCell: (params) => {
      return <div className="rowitem">{params.row?.customer?.Name}</div>;
    },},
    {headerName :"Assign User", field:'AssignUserID', sortable: true, width: 200},
];


export const CalibrationType = {
    TASK: 'task',
    BUG: 'bug',
    STORY: 'story',
  };
  
  export const CalibrationStatus = {
    BACKLOG: 'backlog',
    SELECTED: 'selected',
    INPROGRESS: 'inprogress',
    DONE: 'done',
  };
  
  export const CalibrationPriority = {
    HIGHEST: '5',
    HIGH: '4',
    MEDIUM: '3',
    LOW: '2',
    LOWEST: '1',
  };
  
  export const CalibrationTypeCopy = {
    [CalibrationType.TASK]: 'Task',
    [CalibrationType.BUG]: 'Bug',
    [CalibrationType.STORY]: 'Story',
  };
  
  export const CalibrationStatusCopy = {
    [CalibrationStatus.BACKLOG]: 'Backlog',
    [CalibrationStatus.SELECTED]: 'Selected for development',
    [CalibrationStatus.INPROGRESS]: 'In progress',
    [CalibrationStatus.DONE]: 'Done',
  };
  
  export const CalibrationPriorityCopy = {
    [CalibrationPriority.HIGHEST]: 'Highest',
    [CalibrationPriority.HIGH]: 'High',
    [CalibrationPriority.MEDIUM]: 'Medium',
    [CalibrationPriority.LOW]: 'Low',
    [CalibrationPriority.LOWEST]: 'Lowest',
  };
  
  const fakeCustomers=[
    {"CustomerId": 9, "Name":"Ufuk"},
    {"CustomerId": 10, "Name":"Ali"},
    {"CustomerId": 11, "Name":"Veli"},
  ];