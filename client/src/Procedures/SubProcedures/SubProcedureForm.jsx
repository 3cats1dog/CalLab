import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import toast from 'shared/utils/toast';
import { Form, IssueTypeIcon, Icon, Avatar, IssuePriorityIcon, Uncertinity} from 'shared/components';

import styled from 'styled-components';

import { getUncertinityText, getUncertinityLimit} from 'shared/utils/engineerNotation';



import {
  FormHeading,
  FormElement,
  Content,
  SelectItem,
  SelectItemLabel,
  Divider,
  Actions,
  ActionButton,
  FormRow,
  FormElement_1_3,
  FormElement_1_4,
} from 'shared/components/Form/FormCommonStyle';
import { useFormikContext } from 'formik';


const propTypes = {
  subprocedure: PropTypes.object.isRequired,
  updateSubProcedure: PropTypes.func.isRequired,
};

const SubProcedureForm = ({ subprocedure, updateSubProcedure }) => {

  const ref = useRef(null);


  const [UncertinityText, setUncertinity] =useState(subprocedure.Uncertinity);

  const FormObserver = () => {
    const { values ,setFieldValue  } = useFormikContext();

    useEffect(() => {
      //console.log("FormObserver::values", values);
      let txt=getUncertinityText(values.UncertinityReading,values.UncertinityRange,values.UncertinityResolution, subprocedure.dataType);
      console.log(txt);
      setUncertinity(txt);
    }, [values]);

    return null;
  };


  const [valueSet, setFormValue] =useState({
    Name: subprocedure.Name,
    MeasureCount:subprocedure.MeasureCount,
    Range : subprocedure.Range,
    Requirement: subprocedure.Requirement,
    ProcedureId:subprocedure.ProcedureId,
    UncertinityReading: subprocedure.UncertinityReading,
    UncertinityRange: subprocedure?.UncertinityRange,
    UncertinityResolution: subprocedure.UncertinityResolution,
    Description: subprocedure.Description,
  });

  return (
    <Form
      innerRef={ref}
      enableReinitialize
      initialValues={valueSet}
      validations={{
        Name: Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          updateSubProcedure({...values, Uncertinity:UncertinityText});
          toast.success('Sub Procedure has been successfully updated.');
        } catch (error) {
          Form.handleAPIError(error, form);
        }
      }}
    >
      <FormElement>
        <FormObserver />
        <Form.Field.Input
          name="Name"
          label="Name"
        />
        <Form.Field.Input
          name="MeasureCount"
          label="MeasureCount"
        />
        <Form.Field.Input
          name="Range"
          label="Range"
        />
        <FormRow>
          <FormElement_1_4>
            <Form.Field.Input
            name="UncertinityReading"
            label={`Uncertinity Reading (·${subprocedure.dataType?.Symbol})`}
            />
          </FormElement_1_4>
          <FormElement_1_4>
          <Form.Field.Input
            name="UncertinityRange"
            label={`Uncertinity Range (%)`}
            />
          </FormElement_1_4>
          <FormElement_1_4>
          <Form.Field.Input
            name="UncertinityResolution"
            label={`Uncertinity Resolution (${subprocedure.dataType?.Unit})`}
            />
          </FormElement_1_4>
          <FormElement_1_4>
          <Form.Field.Input
            name="UncertinityText"
            label='Uncertinity'
            disabled
            value={UncertinityText}
            />
          </FormElement_1_4>
        </FormRow>
        <Divider />
        <Form.Field.Input
          name="Requirement"
          label="Requirement"
        />
        <Form.Field.Textarea
          name="Description"
          label="Description"
        />
        <Actions>
          <ActionButton type="submit" variant="primary" >
            Update Sub Procedure
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};


SubProcedureForm.propTypes = propTypes;

export default SubProcedureForm;
