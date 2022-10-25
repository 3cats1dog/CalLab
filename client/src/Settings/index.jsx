import React, {Fragment, useState} from 'react';
import { Route, Redirect, useRouteMatch, useHistory } from 'react-router-dom';
import Header from 'shared/components/BoardHeader';
import { get } from 'lodash';
import useApi from 'shared/hooks/api';
import { updateArrayItemById } from 'shared/utils/javascript';
import { createQueryParamModalHelpers } from 'shared/utils/queryParamModal';
import { Breadcrumbs, PageLoader, PageError, Modal } from 'shared/components';
import { Content, Left,Right, Full } from './Styles';

const SettingBoard = () => {
  const match = useRouteMatch();
  const history = useHistory();

  return (
    <Fragment>
      <Breadcrumbs items={['Ayarlar',  'Kapsam']} />
        <Content>
            <Left>
              <h3>Left</h3>
            </Left>
            <Right>
              <h3>Right</h3>
            </Right>
        </Content>
        <Content>
          <Full>
            <h2>Content-Full</h2>
          </Full>
        </Content>
    </Fragment>
  );
};

export default SettingBoard;
