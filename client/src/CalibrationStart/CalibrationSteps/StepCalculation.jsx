import { Fragment, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { get } from 'lodash';
import toast from 'shared/utils/toast';
import useApi from 'shared/hooks/api';
import { Container, Row, Col } from 'react-bootstrap';

import { Form, IssueTypeIcon, Select, Icon, Avatar, IssuePriorityIcon, Button } from 'shared/components';
import {
    FormHeading,
    FormElement,
    SelectItem,
    SelectItemLabel,
    Divider,
    Actions,
    ActionButton,
  } from 'shared/components/Form/FormCommonStyle';

import { StepStatusType, StepStatusTypeCopy } from "shared/constants/calibrationsteps";

import {engineeringNotation, getUncertinityLimit} from 'shared/utils/engineerNotation'
import { useHistory, useRouteMatch } from "react-router-dom";


  function makeDataCalculation(arr){
    if (arr.length==0) return {'sum':0, 'avg':0, 'variance': 0, 'dev':0};

    let sum = arr.reduce((acc, curr) => acc + Number(curr.Value), 0);
    let len = arr.length;
    let avg= sum/len;
    let sqrdif=arr.map((k) => {return (Number(k.Value) -avg)**2});
    let sumsqr=sqrdif.reduce((acc, curr) => acc + curr, 0);
    let variance= sumsqr /len;
    let dev= Math.sqrt(variance);
    return  {'sum':sum, 'avg':avg, 'variance': variance,'dev':dev};
  }
   

const propTypes = {
    step: PropTypes.object.isRequired,
    dataType: PropTypes.object,
    dataList:PropTypes.array.isRequired,
    modalClose:PropTypes.func.isRequired,
    findNextStep:PropTypes.func.isRequired,
};


const StepCalculation =({step, dataType, dataList, modalClose,findNextStep})=> {


  const match = useRouteMatch();
  const history = useHistory();

  const [{ data , error, isWorking}, updateStepCalculation] = useApi.put(`/steps/${step.StepId}`);

 
  const len = dataList.length;

  const addBorderStyle = {
        border: '1px solid rgba(0, 0, 0, 0.05)', 
        marginTop:'35px',
        padding:'10px',
  };

  const onHandleNextStep=()=>{
      //modalClose();
      const nextStepId= findNextStep(step);
      if (nextStepId>0)
      {
        //history.push("/start/11");
        history.push(`${match.path.replace(":calibrationId",step.CalibrationId).replace(":stepId", nextStepId)}`);
      }
  }

  useEffect(() => {

    let {avg, dev} = makeDataCalculation(dataList);
    let errValue = step.NominalValue - avg;
    let errPerc = errValue / step.NominalValue;



    let updateStep={};
    updateStep.StepId=step.StepId;
    updateStep.TotalCount= dataList.length;
    updateStep.AverageValue =engineeringNotation (avg,2,4);
    updateStep.StandartDeviation = engineeringNotation (dev,2,4);
    updateStep.Error =engineeringNotation (errValue,2,2);
    if (dataList.length ==0)
    {
      updateStep.Status = StepStatusType.EMPTY;
    }else
    {
      if (dataList.length>=step.DataCount)
      {
        updateStep.Status = StepStatusType.PASSED;
      }else{
        updateStep.Status = StepStatusType.WAITMORE;
      }
    }

    step.AverageValue = updateStep.AverageValue;
    step.StandartDeviation = updateStep.StandartDeviation;
    step.Error = updateStep.Error;
    step.Status = updateStep.Status;

    updateStepCalculation(updateStep);
    console.log(step, updateStep);
    if (error) toast.error("cant update!!");
  },[len, step]);

return (
<Fragment>
<div style={addBorderStyle}>
        <ul>
            <li><b>Total Count:  </b> {dataList.length}</li>
            <li><b>Average Value: </b> {engineeringNotation (step.AverageValue,0,4)}{dataType && dataType.Unit}</li>
            <li><b>Standart Deviation: </b> {engineeringNotation (step.StandartDeviation,0,4)}</li>
            <li><b>Error:  </b> {engineeringNotation (step.Error,0,2)}{dataType && dataType.Unit}</li>
            <li><b>Status:  </b> {StepStatusTypeCopy[step.Status]}</li>
            <li></li>
        </ul>
</div>
{step.Status == StepStatusType.PASSED && 
<Actions>
  <ActionButton onClick={onHandleNextStep}  variant="primary">
    Next Step
  </ActionButton>
</Actions>
}     
</Fragment>    
)
};

StepCalculation.propTypes = propTypes;

export default StepCalculation;