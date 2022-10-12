import React from 'react';
import PropTypes from 'prop-types';

import toast from 'shared/utils/toast';
import { Form, IssueTypeIcon, Icon, Avatar, IssuePriorityIcon } from 'shared/components';

import {
  FormHeading,
  FormElement,
  SelectItem,
  SelectItemLabel,
  Divider,
  Actions,
  ActionButton,
} from 'shared/components/Form/FormCommonStyle';


const propTypes = {
  subprocedure: PropTypes.object.isRequired,
  updateSubProcedure: PropTypes.func.isRequired,
};

const TemplateDetailForm = ({ subprocedure, updateSubProcedure }) => {

  return (
    <Form
      enableReinitialize
      initialValues={{
        Name: subprocedure.Name,
        MeasureCount:subprocedure.MeasureCount,
        Range : subprocedure.Range,
        Requirement: subprocedure.Requirement,
        Uncertinity:subprocedure.Uncertinity,
        ProcedureId:subprocedure.ProcedureId,
        Description: subprocedure.Description,
      }}
      validations={{
        Name: Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          updateSubProcedure(values);
          toast.success('Sub Procedure has been successfully updated.');
        } catch (error) {
          Form.handleAPIError(error, form);
        }
      }}
    >
      <FormElement>
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
        <Form.Field.Input
          name="Uncertinity"
          label="Uncertinity"
        />
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


TemplateDetailForm.propTypes = propTypes;

export default TemplateDetailForm;
