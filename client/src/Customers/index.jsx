import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, useRouteMatch, useHistory } from 'react-router-dom';
import useApi from 'shared/hooks/api';
import { get } from 'lodash';
import useMergeState from 'shared/hooks/mergeState';
import { Breadcrumbs, Modal } from 'shared/components';

import Header from 'shared/components/BoardHeader';
import Filters from 'shared/components/BoardFilters';
import Lists from './CustomerLists';
import CustomerDetails from './CustomerDetails';
import CustomerCreate from './CustomerCreate';

const propTypes = {
  /*
  fetchCustomers: PropTypes.func.isRequired,
  customerlist: PropTypes.object.isRequired,
  updateLocalCustomers: PropTypes.func.isRequired,
  */
};

const defaultFilters = {
  searchTerm: '',
};


/*

      */

const CustomerBoard = ( ) => {
  const match = useRouteMatch();
  const history = useHistory();

  const [{ data, error, isLoading }, fetchCustomers] = useApi.get('/customers',  { lazy: true });
  //const [{ data, error, isLoading }, fetchCustomers] = useApi.get('/customers',{},);
  const customerlist = get(data, 'customers', []);

  const [filters, mergeFilters] = useMergeState(defaultFilters);

  const onClick =() => {
      history.push(`${match.path}/customer/create`);
  };

  const onCreate =()=>{
    
  };

  return (
    <Fragment>
      <Breadcrumbs items={['Customers',  'All Customers']} />
      <Header
       name='Customer List'
       linkText='Create Customer'
       icontype='component'
       onClick={onClick}
       showInsert={true}
      />
      <Filters
        defaultFilters={defaultFilters}
        filters={filters}
        mergeFilters={mergeFilters}
      />
      {customerlist.length > 0 && (
      <Lists 
       filters={filters}
       customerlist={customerlist}
      >
      </Lists>
      )}
      <Route
        path={`${match.path}/customer/:customerId`}
        render={routeProps => (
          <Modal
            isOpen
            testid="modal:customer-details"
            width={1040}
            withCloseIcon={false}
            onClose={() => history.push(match.url)}
            renderContent={modal => (
              <CustomerDetails
                customerId={routeProps.match.params.customerId}
                fetchCustomers={fetchCustomers}
                modalClose={modal.close}
              />
            )}
          />
        )}
      />      
      <Route
        path={`${match.path}/customer/create`}
        render={routeProps => (
          <Modal
            isOpen
            testid="modal:customer-create"
            width={1040}
            withCloseIcon={false}
            onClose={() => history.push(match.url)}
            renderContent={modal => (
              <CustomerCreate
                onCreate={onCreate}
                modalClose={modal.close}
              />
            )}
          />
        )}
      />      
    </Fragment>
  );
};

CustomerBoard.propTypes = propTypes;

export default CustomerBoard;
