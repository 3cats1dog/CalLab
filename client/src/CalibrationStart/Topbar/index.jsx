import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useRouteMatch, useLocation,  } from 'react-router-dom';
import useApi from 'shared/hooks/api';

import { Icon, CalibrationAvatar } from 'shared/components';

import {CalibrationStatus, CalibrationStatusCopy} from 'shared/constants/calibration';

import {
  Topbar,
  CalibrationInfo,
  CalibrationTexts,
  CalibraionCustomer,
  CalibrationDevice,
  Divider,
  LinkItem,
  ChildLinkItem,
  LinkText,
  LinkItemHolder,
  NotImplemented,
} from './Styles';


const propTypes = {
  calibration: PropTypes.object.isRequired,
};


const WorkTopbar = ({calibration}) => {

  const renderLinkItem = ( text, iconType, path) => {
    const isImplemented = !!path;
  
    const linkItemProps = isImplemented
      ? { as: NavLink, exact: true, to: `${path}`}
      : { as: 'div' };
  
    return (
      <LinkItem {...linkItemProps}  onClick={(e)=>onClick(e,path)} >
        <Icon type={iconType} />
        <LinkText>{text}</LinkText>
        {!isImplemented && <NotImplemented>Not implemented</NotImplemented>}
      </LinkItem>
    );
  };

  const onClick =(e,path)=> {
    e.stopPropagation(); // don't select this row after clicking
    e.preventDefault();
    if (path)
    {
      if (calibration.Status != path)
      {
        calibration.Status=path;
        updateCalibration({"Status":path});
        window.location.reload(); 
      }
    }
  };

  const [{data,error, isWorking}, updateCalibration] =useApi.put(`/calibrations/${calibration.CalibrationId}`);

  return (
    <Topbar>
      <CalibrationInfo>
        <CalibrationAvatar size={48} />
        <CalibrationTexts>
          <CalibraionCustomer>{calibration.customer?.Name}</CalibraionCustomer>
          <CalibrationDevice>{calibration.instrument?.Name} /SN:{calibration.instrument?.SerialNo} </CalibrationDevice>
          <CalibrationDevice>Status: {CalibrationStatusCopy[calibration.Status]} </CalibrationDevice>
        </CalibrationTexts>
      </CalibrationInfo>
      <LinkItemHolder>
        {renderLinkItem( 'Start Work', 'issues', CalibrationStatus.INPROGRESS)}
        {renderLinkItem( 'Edit Work', 'page', CalibrationStatus.WAITEDIT)}
        {renderLinkItem( 'Finish', 'stopwatch',CalibrationStatus.DONE)}
        {renderLinkItem( 'Releases', 'shipping',CalibrationStatus.REPORTED)}
        {renderLinkItem( 'Reports', 'reports')}
      </LinkItemHolder>
    </Topbar>
  );
};



WorkTopbar.propTypes=propTypes;

export default WorkTopbar;
