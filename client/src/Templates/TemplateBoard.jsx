import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, useRouteMatch, useHistory } from 'react-router-dom';
import useApi from 'shared/hooks/api';
import { get } from 'lodash';
import { useLocalStorage } from 'shared/utils/useLocalStorage';

import useMergeState from 'shared/hooks/mergeState';
import { Breadcrumbs, Modal } from 'shared/components';

import Lists from './TemplateLists';
import DetailForm from './TemplateDetails';
import CreateForm from './TemplateCreate';
import Header from 'shared/components/BoardHeader';
import Filters from 'shared/components/BoardFilters';
import CategoryFilter from './CategoryFilter';


const propTypes = {
  showInsert:PropTypes.bool.isRequired,
};

const defaultProps = {
  showInsert:true,
};

const defaultFilters = {
  searchTerm: '',
};

const TemplateBoard = ( { showInsert }) => {
  const match = useRouteMatch();
  const history = useHistory();
  const [category, setCategory] =useLocalStorage("category", {"CategoryId":0});
  const {CategoryId}= category;

  const [fetchCategory] = useApi.get(`/categorys`, { layz:true});
  const categoryList=get(fetchCategory.data,"categorys", []);


  const [{ data, error, isLoading }, fetchTemplate] = useApi.get(`/templates/category/${CategoryId}`,{CategoryId}, { lazy: true });
  const templateList = get(data, 'templates', []);

  /*
  const setDefaultCategory=()=>{setCategory({"CategoryId":0});}

  useEffect(() => {
    const categorylocal = JSON.parse(localStorage.getItem('category'));
    if (categorylocal) {
      setCategory(categorylocal);
      console.log("Find local category");
    }else{
      setDefaultCategory();
      console.log("Can't Find local category");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('category', JSON.stringify(category));
  }, [category]);
*/

  const selectCategory=(e)=> {
    if (!e)
    {
      setDefaultCategory();
      return;
    } 
    setCategory(e);
    fetchTemplate();
  }

  const onSelected =(e) => {
    console.log(e);
  };

  const [filters, mergeFilters] = useMergeState(defaultFilters);

  const onClick =()=>{
      history.push(`${match.path}/create`);
  };

  const onModalClose =()=>{
    history.push(match.url); 
    fetchTemplate();
  }


  return (
    <Fragment>
      <Breadcrumbs items={["Templates"]} />
      <Header
        name='Template List'
        icontype='issues'
        linkText='Create New Template'
        onClick={onClick}
        showInsert={showInsert}
      />
      <CategoryFilter 
          selectCategory={selectCategory}
          categoryList={categoryList}
          category={category}
      />
      <Filters
        defaultFilters={defaultFilters}
        filters={filters}
        mergeFilters={mergeFilters}
      />
      <Lists  
       filters={filters}
       templateList={templateList}
       onSelected={onSelected}
       />
      <Route
        path={`${match.path}/templates/:templateId`}
        render={routeProps => (
          <Modal
            isOpen
            testid="modal:template-details"
            width={1040}
            withCloseIcon={false}
            onClose={onModalClose}
            renderContent={modal => (
              <DetailForm
                templateId={routeProps.match.params.templateId}
                modalClose={modal.close}
              />
            )}
          />
        )}
      />      
      <Route
        path={`${match.path}/template/:templateId`}
        render={routeProps => (
          <DetailForm
            templateId={routeProps.match.params.templateId}
        />
        )}
      />      
      <Route
        path={`${match.path}/create`}
        render={routeProps => (
          <Modal
            isOpen
            testid="modal:template-create"
            width={1040}
            withCloseIcon={false}
            onClose={onModalClose}
            renderContent={modal => (
              <CreateForm
                categoryList={categoryList}
                modalClose={modal.close}
              />
            )}
          />
        )}
      />      
    </Fragment>
  );
};

TemplateBoard.propTypes = propTypes;
TemplateBoard.defaultProps = defaultProps;

export default TemplateBoard;
