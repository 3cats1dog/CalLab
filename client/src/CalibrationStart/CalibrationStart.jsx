import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import useApi from 'shared/hooks/api';
import { get } from 'lodash';
import { PageError, PageLoader ,Modal } from 'shared/components';
import { Container, Row, Col } from 'react-bootstrap';
import useMergeState from 'shared/hooks/mergeState';

import { MyForm } from './WorkForm';
import WorkAddStep from './WorkAddStep';
import WorkStepList from './WorkStepList';
import WorkTopbar from './Topbar'
import WorkSelectTemplate from './WorkSelectTemplate';
import { StepEnterPage } from './CalibrationSteps';
import { CalibrationStatus } from 'shared/constants/calibration';
import { iterifyArray } from 'shared/utils/iterifyArray';

const propTypes = {
  calibrationId: PropTypes.string.isRequired,
};

const defaultFilters = {
  searchTerm: '',
};

const CalibrationStart = ({ calibrationId }) => {
  const match = useRouteMatch();
  const history = useHistory();

  //const [calibration, setCalibration] =useState(null);

  const [{ data ,error, isLoading }, fetchCalibrationSteps] = useApi.get(`/steps/calibration/${calibrationId}`);
  const [fetchCalibration] = useApi.get(`/calibrations/${calibrationId}`);
  const calibration = get(fetchCalibration.data, 'calibration');
  const [calibrationStatus, setStatus] =useState(`${calibration?.Status}`);


  const [filters, mergeFilters] = useMergeState(defaultFilters);

  const firstRowStyle={
    marginBlockStart:'50px',
  }

  const onModalClose =()=>{
    history.push(match.url);
    fetchCalibrationSteps();
  };

  const stepList = get(data, 'steps', []);

  useEffect(() => {
    history.listen((location) => { console.log(`You changed the page to: ${location.pathname}`) });
  }, [history])

  const fetchCalibrationStatus=(status) => {
    setStatus(status);
  }

  const findNextStep =(step) => {
    var currIndex = stepList.findIndex(s => s.StepId === step.StepId);
    var nextStep= iterifyArray(stepList, currIndex).next();
    if (nextStep)
    {
      return nextStep.StepId;
    }
    return 0;
  }

  if (!stepList) return <PageLoader />;
  if (!calibration) return <PageLoader />;

  const isEdit = calibration.Status ==CalibrationStatus.WAITEDIT;

  return (
    <Fragment>
      <Container fluid="md">
          <WorkTopbar
              calibration={calibration}
              fetchCalibrationStatus={fetchCalibrationStatus}
          />
        <Row style={firstRowStyle}>
          <Col lg={3} >
            <MyForm calibrationId={calibrationId} />
          </Col>
          <Col lg={6}>
            {isEdit && 
            <WorkAddStep 
            calibrationId={calibrationId}
            fetchSteps={fetchCalibrationSteps}
              />
            }
          </Col>
          <Col lg={3} >
          {isEdit && 
            <WorkSelectTemplate calibrationId={calibrationId} fetchStep={fetchCalibrationSteps} />
          }
          </Col>
        </Row>
        <WorkStepList 
          stepList={stepList}
          filters={filters}
          initialLoadingState={isLoading}
          status={calibrationStatus}
          fetchSteps={onModalClose}
        />
      </Container>
      <Route
        exact
        path={`${match.path}/step/:stepId`}
        render={routeProps => (
          <Modal
            isOpen
            testid="modal:calibration-step"
            width={1040}
            withCloseIcon={false}
            onClose={onModalClose}
            renderContent={modal => (
              <StepEnterPage
                stepId={routeProps.match.params.stepId}
                modalClose={modal.close}
                findNextStep={findNextStep}
              />
            )}
          />
        )}
      />
      <Route
        path={`${match.path}/stepedit/:stepId`}
        render={routeProps => (
          <Modal
            isOpen
            testid="modal:calibration-step"
            width={1040}
            withCloseIcon={false}
            onClose={onModalClose}
            renderContent={modal => (
              <StepEnterPage
                stepId={routeProps.match.params.stepId}
                modalClose={modal.close}
              />
            )}
          />
        )}
      />
    </Fragment>
  ) ;
};

CalibrationStart.propTypes = propTypes;

export default (CalibrationStart);
