import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, useRouteMatch, useHistory } from 'react-router-dom';
import useApi from 'shared/hooks/api';
import { get } from 'lodash';
import useMergeState from 'shared/hooks/mergeState';
import { Breadcrumbs, Modal } from 'shared/components';

import Lists from './SubProcedureLists';
import DetailForm from './SubProcedureDetails';
import CreateForm from './SubProcedureCreate';
import Header from 'shared/components/BoardHeader';
import Filters from 'shared/components/BoardFilters';


const propTypes = {
  procedure: PropTypes.object.isRequired,
  showInsert:PropTypes.bool.isRequired,
};

const defaultFilters = {
  searchTerm: '',
};

const SubProcedureBoard = ( { procedure, showInsert}) => {
  const match = useRouteMatch();
  const history = useHistory();

const procedureId = procedure.ProcedureId;
const dataTypeId=procedure.DataTypeId;

const [{ data, error, isLoading }, fetchSubProcedure] = useApi.get(`/subprocedures/procedure/${procedureId}`, {procedureId} ,{ lazy: true });
const subprocedureList = get(data, 'subprocedures', []);


  const [filters, mergeFilters] = useMergeState(defaultFilters);

  const onClick =()=>{
      history.push(`${match.path}/subprocedure-create`);
  };

  const onModalClose=()=>{
    history.push(match.url);
    fetchSubProcedure();
  }
  console.log(`/subprocedures/procedure/${procedure.ProcedureId}, List.length: ${subprocedureList.length}`);

  return (
    <div style={{marginTop:20}}>
      <Breadcrumbs items={[`${procedure.Name} / ${procedure.Description}`]}  maxlimit={150} />
      <Header
        name='SubProcedure List'
        icontype='issues'
        linkText='Create New Sub Procedure'
        onClick={onClick}
        showInsert={showInsert}
      />
      <Filters
        defaultFilters={defaultFilters}
        filters={filters}
        mergeFilters={mergeFilters}
      />      
      <Lists  
       filters={filters}
       subprocedureList={subprocedureList}
       />
      <Route
        path={`${match.path}/subprocedure/:subprocedureId`}
        render={routeProps => (
          <Modal
            isOpen
            testid="modal:subprocedure-details"
            width={1040}
            withCloseIcon={false}
            onClose={onModalClose}
            renderContent={modal => (
              <DetailForm
                SubProcedureId={routeProps.match.params.subprocedureId}
                modalClose={modal.close}
              />
            )}
          />
        )}
      />      
      <Route
        path={`${match.path}/subprocedure-create`}
        render={routeProps => (
          <Modal
            isOpen
            testid="modal:subprocedure-create"
            width={1040}
            withCloseIcon={false}
            onClose={onModalClose}
            renderContent={modal => (
              <CreateForm
                procedure={procedure}
                modalClose={modal.close}
              />
            )}
          />
        )}
      />      
    </div>
  );
};

SubProcedureBoard.propTypes = propTypes;

export default SubProcedureBoard;
