import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, useRouteMatch, useHistory } from 'react-router-dom';
import useApi from 'shared/hooks/api';
import { get } from 'lodash';
import useMergeState from 'shared/hooks/mergeState';
import { Breadcrumbs, Modal } from 'shared/components';

import Lists from './CategoryLists';
import DetailForm from './CategoryDetails';
import CreateForm from './CategoryCreate';
import Header from 'shared/components/BoardHeader';
import Filters from 'shared/components/BoardFilters';


const propTypes = {
  showInsert:PropTypes.bool.isRequired,
  onSelected:PropTypes.func,
};

const defaultFilters = {
  searchTerm: '',
};


const CategoryBoard = ({showInsert, onSelected} ) => {
  const match = useRouteMatch();
  const history = useHistory();

  const [{ data, error, isLoading }, fetchCategory] = useApi.get('/categorys',  { lazy: true });
  const categroyList = get(data, 'categorys', []);

  const [filters, mergeFilters] = useMergeState(defaultFilters);

  const onClick =()=>{
      history.push(`${match.path}/categorys/create`);
  };

  const onModalClose =()=>{
    history.push(match.url); 
    fetchCategory();
  }


  return (
    <Fragment>
      <Breadcrumbs items={['Category']} />
      <Header
        name='Category List'
        icontype='issues'
        linkText='Create New Category'
        onClick={onClick}
        showInsert={showInsert ==true}
      />
      <Filters
        defaultFilters={defaultFilters}
        filters={filters}
        mergeFilters={mergeFilters}
      />      
      {categroyList.length > 0 && (
      <Lists 
       filters={filters}
       categorylist={categroyList}
       onSelected ={onSelected}
      >
      </Lists>
      )}
      <Route
        path={`${match.path}/categorys/:categoryId`}
        render={routeProps => (
          <Modal
            isOpen
            testid="modal:category-details"
            width={1040}
            withCloseIcon={false}
            onClose={onModalClose}
            renderContent={modal => (
              <DetailForm
                categoryId={routeProps.match.params.categoryId}
                modalClose={modal.close}
              />
            )}
          />
        )}
      />      
      <Route
        path={`${match.path}/categorys/create`}
        render={routeProps => (
          <Modal
            isOpen
            testid="modal:category-create"
            width={1040}
            withCloseIcon={false}
            onClose={onModalClose}
            renderContent={modal => (
              <CreateForm
                modalClose={modal.close}
              />
            )}
          />
        )}
      />      
    </Fragment>
  );
};

CategoryBoard.propTypes = propTypes;

export default CategoryBoard;
