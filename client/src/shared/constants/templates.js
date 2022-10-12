export const columns  = [
    {headerName :"Id",  field:'TemplateId', sortable: true},
    {headerName :"Name", field:'Name', sortable: true, width: 200},
    {headerName :"Procedure", field:'ProcedureId', sortable: true, width: 200,
    renderCell: (params) => {
      return <div className="rowitem">{params.row?.procedure?.Name}</div>;
    },},
    {headerName :"Description", field:'Description', sortable: true, width: 200},
];