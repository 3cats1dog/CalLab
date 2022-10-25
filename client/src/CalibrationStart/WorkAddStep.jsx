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

import EnterValue from "shared/components/EnterValue";

import {
  ScaleType,
  ScaleTypeCopy,
  } from 'shared/constants/calibrationdatas'


const ReadValueFromForm=(values) => {
    let newData={};

    let numeric=values.NominalValue.replace(',','.'); 
    newData.InputText =values.NominalValue + ScaleTypeCopy[values.Scale] + dataUnit;
    newData.NominalValue =numeric; 
    newData.NominalValue += values.Scale; 
    newData.StepId =values.StepId;
    newData.SubProcedureId =values.SubProcedureId;
    return newData;
}


const propTypes = {
    calibrationId: PropTypes.string.isRequired,
    fetchSteps:PropTypes.func.isRequired,
};


const WorkAddStep =({calibrationId, fetchSteps})=> {

    const [{ isCreating }, createCalibrationStep] = useApi.post('/steps');

    const [fetchProcedure]=useApi.get(`/procedures/calibration/${calibrationId}`, { lazy:true});
    const procedureList=get(fetchProcedure.data, 'procedures', []);
    const [procedureId, setProcedure] = useState(0);
  
    const [{data}, fetchSubProcedure] = useApi.get(`/subprocedures/procedure/${procedureId}`,{procedureId} , { lazy: true });
    const subProcedureList = get(data, 'subprocedures', []);
  
    const procedureOptions = procedureList.map(procedure => ({
      value: procedure.ProcedureId,
      label: procedure.Name,
    }));
  
  
  
    const subProcedureOptions = subProcedureList.map(subProcedure => ({
      value: subProcedure.SubProcedureId,
      label: subProcedure.Name + "(" + subProcedure.Range + ")",
    }));
  
  
    const procedureChangeHandle= (e)=>{
        setProcedure(e);
        fetchSubProcedure();
    }


    const addBorderStyle = {
        border: '1px solid rgba(0, 0, 0, 0.05)', 
      };


return (
<Form
      enableReinitialize
      initialValues={{
        CalibrationId: calibrationId,
        Position:1,
        InputText:0,
        Scale:ScaleType.NONE,
        DataCount:5,
        ProcedureId:'',
        SubProcedureId:'',
      }}
      validations={{
        ProcedureId: Form.is.required(),
        SubProcedureId: Form.is.required(),
        InputText:Form.is.number(),
        Position:Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          let numeric=values.InputText.replace(',','.'); 
          //newData.InputText =values.InputText + ScaleTypeCopy[values.Scale];
          values.NominalValue =numeric; 
          values.NominalValue += values.Scale; 
          await createCalibrationStep({
            ...values,
          });
          toast.success('New step has been successfully created.');
          fetchSteps();
          //modalClose();
        } catch (error) {
          Form.handleAPIError(error, form);
        }
      }}
    >
      <FormElement style={addBorderStyle}>
        <Row>
        <Form.Field.Select
          className="col-lg-6"
          name="ProcedureId"
          label="Procedure"
          options={procedureOptions}
          onSelectChange={procedureChangeHandle}
        />
        <Form.Field.Select
          className="col-lg-6"
          name="SubProcedureId"
          label="Sub Proc."
          options={subProcedureOptions}
        />
        </Row><Row>
        <EnterValue
          classNameInput="col-lg-4"
          classNameSelect="col-lg-3"
          nameInput="InputText"
          nameSelect="Scale"
          labelInput="Nominal Value"
          labelSelect="Scale"
        />
        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={isCreating}>
            Add New Step
          </ActionButton>
        </Actions>
        </Row>
      </FormElement>
    </Form>
)
};

WorkAddStep.propTypes = propTypes;

export default WorkAddStep;