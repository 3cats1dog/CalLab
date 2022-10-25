import { Left } from 'Settings/Styles';
import {IssueTypeIcon} from 'shared/components';

export const columns  = [
    {headerName :"Id",  field:'CalibrationId', sortable: true, hide:true},
    {headerName :"Type", field:'Type', sortable: true, width: 200,
    renderCell: (params) => {
      return <div className="rowitem">
        <IssueTypeIcon type={params.row?.Type} top={1}  />
        <label style={{ marginLeft: 5 }}>{CalibrationTypeCopy[params.row?.Type]}</label>
        </div>;
    }},
    {headerName :"Status", field:'Status', sortable: true, width: 200,
    renderCell: (params) => {
      return <div className="rowitem">
        {CalibrationStatusCopy[params.row?.Status]}
        </div>;
    }},
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
    TASK: 'task', //icon type task
    BUG: 'bug',   //icon type bug
    STORY: 'story', //icon type story
  };
  
  export const CalibrationStatus = {
    BACKLOG: 'backlog',
    CREATED: 'created',
    INPROGRESS: 'inprogress',
    WAITEDIT: 'waitedit',
    DONE: 'done',
    REPORTED:'reported',
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
    [CalibrationStatus.CREATED]: 'Just create empty work',
    [CalibrationStatus.INPROGRESS]: 'In progress',
    [CalibrationStatus.WAITEDIT]: 'Waiting definition',
    [CalibrationStatus.DONE]: 'Done',
    [CalibrationStatus.REPORTED]: 'Done&Reported',
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