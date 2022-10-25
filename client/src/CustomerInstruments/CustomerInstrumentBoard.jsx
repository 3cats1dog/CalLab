import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Route, useRouteMatch, useHistory  } from 'react-router-dom';
import useApi from 'shared/hooks/api';
import { get } from 'lodash';
import useMergeState from 'shared/hooks/mergeState';
import { Breadcrumbs, Modal } from 'shared/components';

import Lists from './CustomerInstrumentLists';
import DetailForm from './CustomerInstrumentDetails';
import Header from 'shared/components/BoardHeader';
import Filters from 'shared/components/BoardFilters';
import CustomerInstrumentCreate from './CustomerInstrumentCreate';

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

const CustomerInstrumentBoard = ( ) => {
  const match = useRouteMatch();
  const history = useHistory();

  const [{ data, error, isLoading }, fetchInstruments] = useApi.get('/customerInstruments',  { lazy: true });
  const instrList = get(data, 'instruments', []);
  const [customerId, setCustomer] = useState("9");

  const [filters, mergeFilters] = useMergeState(defaultFilters);

  const onClick =()=>{
    //First select customer;
    //const [{ data, error, isLoading }, fetchInstruments] = useApi.get('/customers',  { lazy: true });
    //const custList = get(data, 'customers', []);

    //then open create form;
      history.push(`${match.path}/create`);
  };

  const onCreate =()=>{
    //Refresh main list;
  };

  const onModalClose =()=>{
    history.push(match.url);
    fetchInstruments();
  };


  return (
    <Fragment>
      <Breadcrumbs items={['Customer Instruments']} />
      <Header
        name='Customer Instrument List'
        icontype='issues'
        linkText='Create New Instrument'
        onClick={onClick}
        showInsert={true}
      />
      <Filters
        defaultFilters={defaultFilters}
        filters={filters}
        mergeFilters={mergeFilters}
      />      
      {instrList.length > 0 && (
      <Lists 
       filters={filters}
       instrumentlist={instrList}
      >
      </Lists>
      )}
      <Route
        path={`${match.path}/instrument/:instrumentId`}
        render={routeProps => (
          <Modal
            isOpen
            testid="modal:labinstrument-details"
            width={1040}
            withCloseIcon={false}
            onClose={onModalClose}
            renderContent={modal => (
              <DetailForm
                instrumentId={routeProps.match.params.instrumentId}
                modalClose={modal.close}
              />
            )}
          />
        )}
      />      
      <Route
        path={`${match.path}/create`}
        render={routeProps => (
          <Modal
            isOpen
            testid="modal:customerinstrument-create"
            width={1040}
            withCloseIcon={false}
            onClose={onModalClose}
            renderContent={modal => (
              <CustomerInstrumentCreate
                customerId={customerId}
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

CustomerInstrumentBoard.propTypes = propTypes;

export default CustomerInstrumentBoard;
