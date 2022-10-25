import { Fragment, useState } from "react";
import PropTypes from 'prop-types';
import { get } from 'lodash';
import toast from 'shared/utils/toast';
import useApi from 'shared/hooks/api';
import { Container, Row, Col } from 'react-bootstrap';

import { Form, IssueTypeIcon, Select, Icon, Avatar, IssuePriorityIcon } from 'shared/components';
import {
    FormHeading,
    FormElement,
    SelectItem,
    SelectItemLabel,
    Divider,
    Actions,
    ActionButton,
  } from 'shared/components/Form/FormCommonStyle';
import { padding } from "@mui/system";

import { engineeringNotation,getUncertinityLimit } from "shared/utils/engineerNotation";


const propTypes = {
    step: PropTypes.object.isRequired,
    dataType: PropTypes.object,
};


const StepDetail =({step, dataType})=> {

    const errLimit = getUncertinityLimit(step.subProcedure.UncertinityReading,step.subProcedure.UncertinityRange, step.subProcedure.UncertinityResolution, step.NominalValue );

    const addBorderStyle = {
        border: '1px solid rgba(0, 0, 0, 0.05)', 
        marginTop:'35px',
        padding:'10px',
      };


return (
<Fragment>
    <div style={addBorderStyle}>
        <ul>
            <li><b>Nominal Value: </b> {engineeringNotation(step.NominalValue,0,1)}{dataType && dataType.Unit}</li>
            <li><b>Data Count: </b> {step.DataCount}</li>
            <li><b>Range:  </b> {step.subProcedure.Range}</li>
            <li><b>Uncertinity:  </b> {step.subProcedure.Uncertinity} ({engineeringNotation(errLimit,0,2)}{dataType && dataType.Unit})</li>
            <li><b>Description:  </b> {step.subProcedure.Description}</li>
            <li><b>Requirement:  </b> {step.subProcedure.Requirement}</li>
            <li></li>
        </ul>
    </div>
</Fragment>    
)
};

StepDetail.propTypes = propTypes;

export default StepDetail;