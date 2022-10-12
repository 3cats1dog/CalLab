import React from 'react';
import { Route, Redirect, useRouteMatch, useHistory } from 'react-router-dom';
import useApi from 'shared/hooks/api';
import { get } from 'lodash';
import { useMemo } from 'react';

import { DataGrid  } from '@mui/x-data-grid';
import { PageLoader, PageError, Modal } from 'shared/components';
import { Button } from 'shared/components';
import { Header, BoardName } from './Styles';

import { columns, data2 } from "./data2";

const Sample = () => {
    const match = useRouteMatch();
    const history = useHistory();    
    const [{ data, error }, fetchCustomers] = useApi.get('/customers');

    if (!data) return <PageLoader />;
    if (error) return <PageError />;

    const rows=data.customers;
    //const matchingCustomers = get(data, 'customer', []);
    //const rows =   useMemo(() => data, [data])
    const tableData = { columns, data2 };

    /*
        {JSON.stringify(data)}
  */
  return (
  <Header>
    <BoardName>
    <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        getRowId={(row) => row.CustomerId}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </BoardName>
    <a onClick={fetchCustomers}>
      <Button>Refresh Data</Button>
    </a>
      </Header>
    );
};

export default Sample;