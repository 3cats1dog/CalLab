import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useRouteMatch, useLocation  } from 'react-router-dom';

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

/*
const propTypes = {
  project: PropTypes.object.isRequired,
};
*/

const DashboardSidebar = ({/* project*/}) => {
  const match = useRouteMatch();
  const location = useLocation();  

  return (
    <Sidebar>
      <CalLabInfo>
        <CalLabAvatar />
        <CalLabTexts>
          <CalLabName>Cal Lab v1.0</CalLabName>
          <CalLabCategory>Laboratory Solutions</CalLabCategory>
        </CalLabTexts>
      </CalLabInfo>

      {renderLinkItem(match, 'DashBoard', 'board', '/board')}
      {renderLinkItem(match, 'Works', 'story','/works' )}
      {renderLinkItem(match, 'Customers', 'component','/customers' )}
      {renderLinkItem(match, 'Instruments', 'issues','/instruments' )}
      <Divider />
      {renderLinkItem(match, 'Equipments', 'issues', '/equipments')}
      {renderLinkItem(match, 'Scope', 'page', '/scope')}
      {renderChildLinkItem(match, location, "Sub Scope", 'page', '/scope', '/scope2')}
      {renderLinkItem(match, 'Templates', 'stopwatch','/templates')}
      {renderLinkItem(match, 'Releases', 'shipping')}
      {renderLinkItem(match, 'Reports', 'reports')}
      {renderLinkItem(match, 'Components', 'task')}
      <Divider />
      {renderLinkItem(match, 'Settings', 'settings', '/settings' )}
    </Sidebar>
  );
};

const renderLinkItem = (match, text, iconType, path) => {
  const isImplemented = !!path;

  const linkItemProps = isImplemented
    ? { as: NavLink, exact: true, to: `${match.path}${path}` }
    : { as: 'div' };

  return (
    <LinkItem {...linkItemProps}>
      <Icon type={iconType} />
      <LinkText>{text}</LinkText>
      {!isImplemented && <NotImplemented>Not implemented</NotImplemented>}
    </LinkItem>
  );
};

const renderChildLinkItem=(match, location, text, iconType, parentpath, path) => {
  const isImplemented = !!path;
  const text2= location.pathname;  // `${match.path}${path}` ;  //location.pathname;
  if( `${match.path}${parentpath}` != location.pathname )
  {
    return ("");
  }

  const linkItemProps = isImplemented
    ? { as: NavLink, exact: true, to: `${match.path}${path}` }
    : { as: 'div' };

  return (
    <ChildLinkItem {...linkItemProps}>
      <Icon type={iconType} />
      <LinkText>{text}</LinkText>
      {!isImplemented && <NotImplemented>Not implemented</NotImplemented>}
    </ChildLinkItem>
  );


}

/*
DashboardSidebar.propTypes = propTypes;
*/

export default DashboardSidebar;
