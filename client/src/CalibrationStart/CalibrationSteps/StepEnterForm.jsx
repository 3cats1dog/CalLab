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

import {
    ScaleType,
    ScaleTypeCopy,
} from 'shared/constants/calibrationdatas'

import { engineeringNotation, getnumberOrder } from "shared/utils/engineerNotation";

import EnterValue from "shared/components/EnterValue";



const propTypes = {
    step: PropTypes.object.isRequired,
    fetchSteps:PropTypes.func.isRequired,
    dataUnit:PropTypes.string.isRequired,
};


const StepEnterForm =({step, fetchSteps, dataUnit})=> {

    const [{ isCreating }, createCalibrationData] = useApi.post('/calibrationdatas');

    const addBorderStyle = {
        border: '1px solid rgba(0, 0, 0, 0.05)', 
        marginTop:'35px'
      };

      const nomVal = getnumberOrder(step.NominalValue);
      const ReadValueFromForm=(values) => {
        let newData={};

        let numeric=values.InputText.replace(',','.'); 
        newData.InputText =values.InputText + ScaleTypeCopy[values.Scale] + dataUnit;
        newData.Value =numeric; 
        newData.Value += values.Scale; 
        newData.StepId =values.StepId;
        newData.SubProcedureId =values.SubProcedureId;
        return newData;
      }

return (
<Fragment>
    <Form
      enableReinitialize
      initialValues={{
        StepId: step.StepId,
        SubProcedureId:step.SubProcedureId,
        InputText:"",
        Scale:nomVal.scale,
        Value:0,
      }}
      validations={{
        StepId: Form.is.required(),
        SubProcedureId: Form.is.required(),
        InputText:Form.is.number(),
        Scale:Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          let newValues=ReadValueFromForm(values);
          await createCalibrationData({
            ...newValues,
          });
          toast.success('New data has been successfully added.');
          fetchSteps();
          form.setFieldValue("InputText","");
        } catch (error) {
          Form.handleAPIError(error, form);
        }
      }}
    >
      <FormElement style={addBorderStyle}>
        <Row>
          <EnterValue
              classNameInput="col-lg-4"
              classNameSelect="col-lg-3"
              labelInput="Enter Value"
              labelSelect="Scale"
              nameInput="InputText"
              nameSelect="Scale"
          />
        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={isCreating}>
            Add Data
          </ActionButton>
        </Actions>
        </Row>
      </FormElement>
    </Form>
</Fragment>    
)
};

StepEnterForm.propTypes = propTypes;

/*

        <Form.Field.Input
          className="col-lg-4"
          name="InputText"
          label="Enter Value"
        />
        <Form.Field.Select
          className="col-lg-4"
          name="Scale"
          label="Scale"
          options={scaleOptions}
          renderOption={scaleTag}
          renderValue={scaleTag}
        />


const scaleOptions = Object.values(ScaleType).map(scale => ({
  value: scale,
  label: ScaleTypeCopy[scale],
}));

const scaleTag = ({ value: scale }) => (
  <SelectItem>
    <SelectItemLabel>{ScaleTypeCopy[scale]}</SelectItemLabel>
  </SelectItem>
);


*/
export default StepEnterForm;