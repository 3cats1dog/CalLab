import React, {Fragment, useState} from 'react';
import { Route, Redirect, useRouteMatch, useHistory } from 'react-router-dom';
import Header from 'shared/components/BoardHeader';
import { get } from 'lodash';
import useApi from 'shared/hooks/api';
import { useLocalStorage } from 'shared/utils/useLocalStorage';
import { updateArrayItemById } from 'shared/utils/javascript';
import { createQueryParamModalHelpers } from 'shared/utils/queryParamModal';
import { Breadcrumbs, PageLoader, PageError, Modal } from 'shared/components';

import {CategoryBoard} from 'Category';
import {ProcedureBoard, SubProcedureBoard} from 'Procedures'; 
import {Content, Left,Right, Full } from './Styles';
import { Col, Row } from 'react-bootstrap';
 
const ScopeBoard = () => {
  const match = useRouteMatch();
  const history = useHistory();

  const [{ data, error, isLoading }, fetchCategory] = useApi.get('/categorys',  { lazy: true });
  const categroyList = get(data, 'categorys', []);

  const [ category, setCategory] =useLocalStorage("category",{ });// useState("");
  const [ procedure, setProcedure] =useLocalStorage("procedure",{ });  //useState({});

  if (categroyList.length>0)
  {
    if (!category?.CategoryId)
    setCategory(categroyList[0]);
  }
  //{"ProcedureId":8, Name:"Default"}

  return (
    <Fragment>
      <Breadcrumbs items={['Kapsam', 'Akreditasyon Kapsami']} />
      <Row>
        <Col lg={4} sm={12}>
          <CategoryBoard
                  showInsert={false}
                  onSelected={setCategory}
                  />
        </Col>
        <Col lg={8} sm={12}>
        </Col>
        <ProcedureBoard
                showInsert={true}
                category={category}
                onSelected={setProcedure}
                categroyList={categroyList}
                />
      </Row>
      <Row>
        <SubProcedureBoard
                  showInsert={true}
                  procedure={procedure}
                />
      </Row>
      <Route
        path={`${match.path}/settings/subprocedure/:subprocedureId`}
        render={routeProps => (
          <Modal
            isOpen
            testid="modal:customer-create"
            width={1040}
            withCloseIcon={false}
            onClose={() => history.push(match.url)}
            renderContent={modal => (
                <h1>Sub Procedure</h1>
            )}
          />
        )}
      />      
    </Fragment>
  );
};

export default ScopeBoard;
