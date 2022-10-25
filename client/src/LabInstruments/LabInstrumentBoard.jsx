import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, useRouteMatch, useHistory } from 'react-router-dom';
import useApi from 'shared/hooks/api';
import { get } from 'lodash';
import useMergeState from 'shared/hooks/mergeState';
import { Breadcrumbs, Modal } from 'shared/components';

import Lists from './LabInstrumentLists';
import DetailForm from './LabInstrumentDetails';
import Header from 'shared/components/BoardHeader';
import Filters from 'shared/components/BoardFilters';
import LabInstrumentCreate from './LabInstrumentCreate';

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

const LabInstrumentBoard = ( ) => {
  const match = useRouteMatch();
  const history = useHistory();

  const [{ data, error, isLoading }, fetchInstruments] = useApi.get('/labinstruments',  { lazy: true });
  const instrList = get(data, 'instrs', []);

  const [filters, mergeFilters] = useMergeState(defaultFilters);

  const onClick =()=>{
      history.push(`${match.path}/create`);
  };

  const onCreate =()=>{
    //Refresh main list;
  };

  return (
    <Fragment>
      <Breadcrumbs items={['Lab. Instruments']} />
      <Header
        name='Laboratory Equipment List'
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
        path={`${match.path}/labinstruments/:LabInstrId`}
        render={routeProps => (
          <Modal
            isOpen
            testid="modal:labinstrument-details"
            width={1040}
            withCloseIcon={false}
            onClose={() => history.push(match.url)}
            renderContent={modal => (
              <DetailForm
                LabInstrId={routeProps.match.params.LabInstrId}
                fetchInstruments={fetchInstruments}
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
            testid="modal:labinstrument-create"
            width={1040}
            withCloseIcon={false}
            onClose={() => history.push(match.url)}
            renderContent={modal => (
              <LabInstrumentCreate
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

LabInstrumentBoard.propTypes = propTypes;

export default LabInstrumentBoard;
