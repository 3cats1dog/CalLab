import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import useApi from 'shared/hooks/api';
import  api from 'shared/utils/api';
import { PageError, PageLoader, CopyLinkButton, Button, AboutTooltip } from 'shared/components';
import { TopActions, TopActionsRight, Content, Left, Right,TopActionsLeft, Full } from 'shared/components/Form/FormCommonStyle';
import Delete from './CalibrationDetailDelete';
import CalibrationForm from './CalibrationForm';

const propTypes = {
  calibrationId: PropTypes.string.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const CalibrationDetails = ({
  calibrationId,
  modalClose,
}) => {

  console.log(`CalibrationDetails: /calibrations/${calibrationId}`);

  const [{ data, error ,setLocalData }, fetchCalibration] = useApi.get(`/calibrations/${calibrationId}`,  { lazy: true });
  //if (!data) return <Loader />;
  if (error) return <PageError />;


  const updateCalibrationDetails = fields =>
  setLocalData(currentData => ({ calibration: { ...currentData.calibration, ...fields } }));

  const updateCalibration = updatedFields => {
    api.optimisticUpdate(`/calibrations/${calibrationId}`, {
      updatedFields,
      currentFields: calibration,
      setLocalData: fields => {
        updateCalibrationDetails(fields);
        updateCalibrationDetails(calibration.calibrationId, fields);
      },
    });
  };

  const calibration = get(data, 'calibration' );
  if (!calibration) return <PageLoader />;

  return (
    <Fragment>
      <TopActions>
        <TopActionsLeft>
        {`${calibration.customer?.Name} - ${calibration.instrument?.Name}/SN:${calibration.instrument?.SerialNo}`}
        </TopActionsLeft>
        <TopActionsRight>
          <AboutTooltip
            renderLink={linkProps => (
              <Button icon="feedback" variant="empty" {...linkProps}>
                Give feedback
              </Button>
            )}
          />
          <CopyLinkButton variant="empty" />
          <Delete calibration={calibration} modalClose={modalClose} />
          <Button icon="close" iconSize={24} variant="empty" onClick={modalClose} />
        </TopActionsRight>
      </TopActions>
      <Content>
        <Full>
          <CalibrationForm
            calibration={calibration}
            updateCalibration={updateCalibration}
          />
        </Full>
      </Content>
    </Fragment>
  );
};

CalibrationDetails.propTypes = propTypes;

export default CalibrationDetails;
