import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Route, useRouteMatch, useHistory  } from 'react-router-dom';
import useApi from 'shared/hooks/api';
import { get } from 'lodash';
import useMergeState from 'shared/hooks/mergeState';
import { Breadcrumbs, Modal } from 'shared/components';

import Lists from './CalibrationLists';
import DetailForm from './CalibrationDetails';
import Header from 'shared/components/BoardHeader';
import Filters from 'shared/components/BoardFilters';
import CustomerInstrumentCreate from './CalibrationCreate';

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

const CalibrationBoard = ( ) => {
  const match = useRouteMatch();
  const history = useHistory();

  const [{ data, error, isLoading }, fetchCalibration] = useApi.get('/calibrations',  { lazy: true });
  const calibrationList = get(data, 'calibrations', []);
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
    fetchCalibration();
  };


  return (
    <Fragment>
      <Breadcrumbs items={['Calibration Works']} />
      <Header
        name='Work List'
        icontype='issues'
        linkText='Create New Calibration Work'
        onClick={onClick}
        showInsert={true}
      />
      <Filters
        defaultFilters={defaultFilters}
        filters={filters}
        mergeFilters={mergeFilters}
      />      
      <Lists 
       filters={filters}
       calibrationList={calibrationList}
      >
      </Lists>
      <Route
        path={`${match.path}/:calibrationId`}
        render={routeProps => (
          <Modal
            isOpen
            testid="modal:calibration-details"
            width={1040}
            withCloseIcon={false}
            onClose={onModalClose}
            renderContent={modal => (
              <DetailForm
                calibrationId={routeProps.match.params.calibrationId}
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
            testid="modal:calibration-create"
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

CalibrationBoard.propTypes = propTypes;

export default CalibrationBoard;
