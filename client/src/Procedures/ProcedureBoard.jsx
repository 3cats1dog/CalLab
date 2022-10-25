import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, useRouteMatch, useHistory } from 'react-router-dom';
import useApi from 'shared/hooks/api';
import { get } from 'lodash';
import useMergeState from 'shared/hooks/mergeState';
import { Breadcrumbs, Modal } from 'shared/components';

import Lists from './ProcedureLists';
import DetailForm from './ProcedureDetails';
import CreateForm from './ProcedureCreate';
import Header from 'shared/components/BoardHeader';
import Filters from 'shared/components/BoardFilters';


const propTypes = {
  category: PropTypes.object.isRequired,
  showInsert:PropTypes.bool.isRequired,
  onSelected:PropTypes.func.isRequired,
  categroyList: PropTypes.array.isRequired,
};

const defaultFilters = {
  searchTerm: '',
};

const ProcedureBoard = ( { category, showInsert, onSelected, categroyList}) => {
  const match = useRouteMatch();
  const history = useHistory();

  const categoryId = category.CategoryId;

  const [{ data, error, isLoading }, fetchProcedure] = useApi.get(`/procedures/category/${categoryId}`, {categoryId} ,{ lazy: true });
  const procedureList = get(data, 'procedures', []);

  const [filters, mergeFilters] = useMergeState(defaultFilters);

  //const category = categroyList.find((row) => row.CategoryId.toString() === categoryId);

  const onClick =()=>{
      history.push(`${match.path}/procedure-create`);
  };

  const onModalClose =()=>{
    history.push(match.url); 
    fetchProcedure();
  }

  console.log(`/procedures/category/${categoryId}, procedureList.length: ${procedureList.length}`);

  return (
    <div style={{marginTop:20}}>
      <Breadcrumbs items={[`${category?.Name}`]} />
      <Header
        name='Procedure List'
        icontype='issues'
        linkText='Create New Procedure'
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
       procedureList={procedureList}
       onSelected={onSelected}
       />
      <Route
        path={`${match.path}/procedure/:procedureId`}
        render={routeProps => (
          <Modal
            isOpen
            testid="modal:procedure-details"
            width={1040}
            withCloseIcon={false}
            onClose={onModalClose}
            renderContent={modal => (
              <DetailForm
                ProcedureId={routeProps.match.params.procedureId}
                categroyList={categroyList}
                modalClose={modal.close}
              />
            )}
          />
        )}
      />      
      <Route
        path={`${match.path}/procedure-create`}
        render={routeProps => (
          <Modal
            isOpen
            testid="modal:category-create"
            width={1040}
            withCloseIcon={false}
            onClose={onModalClose}
            renderContent={modal => (
              <CreateForm
                categoryId={categoryId}
                modalClose={modal.close}
              />
            )}
          />
        )}
      />      
    </div>
  );
};

ProcedureBoard.propTypes = propTypes;

export default ProcedureBoard;
