import React, {Fragment, useState} from 'react';
import { Route, Redirect, useRouteMatch, useHistory } from 'react-router-dom';
import Header from 'shared/components/BoardHeader';
import { get } from 'lodash';
import useApi from 'shared/hooks/api';
import { updateArrayItemById } from 'shared/utils/javascript';
import { createQueryParamModalHelpers } from 'shared/utils/queryParamModal';
import { Breadcrumbs, PageLoader, PageError, Modal } from 'shared/components';

import CategoryBoard from 'Category';
import ProcedureBoard from 'Procedures'; 
import { Content, Left,Right, Full } from './Styles';
import SubProcedureBoard from 'Procedures/SubProcedures';

const ScopeBoard = () => {
  const match = useRouteMatch();
  const history = useHistory();

  const [{ data, error, isLoading }, fetchCategory] = useApi.get('/categorys',  { lazy: true });
  const categroyList = get(data, 'categorys', []);

  const [ categoryId, setCategory] =useState("");
  const [ procedure, setProcedure] =useState({});
  //{"ProcedureId":8, Name:"Default"}

  return (
    <Fragment>
      <Breadcrumbs items={['Kapsam', 'Akreditasyon Kapsami']} />
        <Content>
            <Left>
                <CategoryBoard
                showInsert={false}
                onSelected={setCategory}
                />
            </Left>
            <Right>
                <ProcedureBoard
                showInsert={true}
                categoryId={categoryId}
                onSelected={setProcedure}
                categroyList={categroyList}
                />
            </Right>
        </Content>
        <Content>
          <Full>
            <SubProcedureBoard
                showInsert={true}
                procedure={procedure}
              />
          </Full>
        </Content>

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
