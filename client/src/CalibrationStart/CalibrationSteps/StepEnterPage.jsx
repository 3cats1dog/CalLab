import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import useApi from 'shared/hooks/api';
import  api from 'shared/utils/api';
import { PageError, PageLoader, CopyLinkButton, Button, AboutTooltip } from 'shared/components';
import { TopActions, TopActionsRight, Content, Left, Right,TopActionsLeft } from 'shared/components/Form/FormCommonStyle';

import {
  CalibrationDataList, 
  StepEnterForm,
  StepCalculation,
  StepDetail,


} from 'CalibrationStart/CalibrationSteps';

const propTypes = {
  stepId: PropTypes.string.isRequired,
  modalClose: PropTypes.func.isRequired,
  findNextStep: PropTypes.func.isRequired,
  
};

const StepEnterPage = ({
  stepId,
  modalClose,
  findNextStep,
}) => {


  const [dataList, setDataList]=useState([]);
  const [step, setStep] =useState(null);
  const [dataType,setDataType]=useState(null);


  const fetchData =()=>
  {
    api.get(`/calibrationdatas/step/${stepId}`).then(
      (data)=>{
        setDataList(get(data, "datas", []));
        setDataType(get(data, "dataType"));
      }
    );
  }

  useEffect(()=>{
    console.log("StepId:", stepId);
    api.get(`/calibrationdatas/step/${stepId}`).then(
      (data)=>{
        setDataList(get(data, "datas", []));
        setDataType(get(data, "dataType"));
      }
    );
    api.get(`/steps/${stepId}`).then(
      (data)=>{
        setStep(get(data, 'step' ));
      }
    );
  },[stepId]);


  let dataUnit="";
  if (dataType) { dataUnit= dataType.Unit};

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



  if (!step) return <PageLoader />;
  return (
    <Fragment>
      <TopActions>
        <TopActionsLeft>
        {step.procedure?.Name} / {`C:${step.CalibrationId} - P:${step.ProcedureId} - S:${step.SubProcedureId}`}
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
          <Button icon="close" iconSize={24} variant="empty" onClick={modalClose} />
        </TopActionsRight>
      </TopActions>
      <Content>
        <Left>
          <StepEnterForm 
            step={step}
            fetchSteps={fetchData}
            dataUnit={dataUnit}
          />
          <StepDetail
            step={step}
            dataType={dataType}
          />
          <StepCalculation 
            step={step}
            dataType={dataType}
            dataList={dataList}
            modalClose={modalClose}
            findNextStep={findNextStep}
          />
        </Left>
        <Right>
          <CalibrationDataList
            dataList={dataList}
            fetchData={fetchData}
          />
        </Right>
      </Content>
    </Fragment>
  );
};

StepEnterPage.propTypes = propTypes;

export default StepEnterPage;
