import React from 'react';
import { NavLink, useRouteMatch  } from 'react-router-dom';

import { Icon, CalLabAvatar } from 'shared/components';

import {
  Sidebar,
  CalLabInfo,
  CalLabTexts,
  CalLabName,
  CalLabCategory,
  Divider,
  LinkItem,
  ChildLinkItem,
  LinkText,
  NotImplemented,
} from './Styles';


const AppSidebar = ({}) => {
  //const match = useRouteMatch();

  return (
    <Sidebar>
      <CalLabInfo>
        <CalLabAvatar />
        <CalLabTexts>
          <CalLabName>Cal Lab v1.0</CalLabName>
          <CalLabCategory>Laboratory Solutions</CalLabCategory>
        </CalLabTexts>
      </CalLabInfo>

      {renderLinkItem( 'DashBoard', 'board', '/dashboard')}
      {renderLinkItem( 'Works', 'story','/works' )}
      {renderLinkItem( 'Customers', 'component','/customers' )}
      {renderLinkItem( 'Instruments', 'issues','/instruments' )}
      <Divider />
      {renderLinkItem( 'Equipments', 'issues', '/equipments')}
      {renderLinkItem( 'Scope', 'page', '/scope')}
      {renderLinkItem( 'Templates', 'stopwatch','/templates')}
      {renderLinkItem( 'Releases', 'shipping')}
      {renderLinkItem( 'Reports', 'reports')}
      {renderLinkItem( 'Components', 'task')}
      <Divider />
      {renderLinkItem( 'Settings', 'settings', '/settings' )}
      <Divider />
      {renderLinkItem( 'LogOut', 'close', '/logout' )}
    </Sidebar>
  );
};

const renderLinkItem = (text, iconType, path) => {
  const isImplemented = !!path;

  const linkItemProps = isImplemented
    ? { as: NavLink, exact: true, to: `${path}` }
    : { as: 'div' };

  return (
    <LinkItem {...linkItemProps}>
      <Icon type={iconType} />
      <LinkText>{text}</LinkText>
      {!isImplemented && <NotImplemented>Not implemented</NotImplemented>}
    </LinkItem>
  );
};

 

/*
AppSidebar.propTypes = propTypes;
*/

export default AppSidebar;
