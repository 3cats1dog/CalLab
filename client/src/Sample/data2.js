import React from "react";

 export const columns  = [
        {headerName :"Id",  field:'CustomerId', sortable: true},
        {headerName :"Name", field:'Name', sortable: true},
        {headerName :"Phone", field:'Phone', sortable: true},
        {headerName :"Email", field:'Email', sortable: true},
        {headerName :"Address", field:'Address', sortable: true},
    ];
 export const data2=[
        {CustomerId:1, Name:"ufuk", Phone:"asdf", Email:"sdf",Address:"" },
        {CustomerId:2, Name:"ufuk", Phone:"asdf", Email:"sdf",Address:"" },
    ];
export const customers= [
    {"PrimaryColumnName":"CustomerId","CustomerId":9,"Name":"ufuk","Phone":"","Email":"asdf@asdf.com","Address":""},
    {"PrimaryColumnName":"CustomerId","CustomerId":10,"Name":"Ahmet","Phone":"","Email":"ahmet@asdf.com","Address":""}
    ];
