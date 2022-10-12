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
  template: PropTypes.object.isRequired,
  updateTemplate: PropTypes.func.isRequired,
};

const TemplateForm = ({ template, updateTemplate }) => {
  

  return (
    <Form
      enableReinitialize
      initialValues={{
        Name: template.Name,
        Description: template.Description,
      }}
      validations={{
        Name: Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          updateTemplate(values);
          toast.success('Template has been successfully updated.');
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
        <Form.Field.Textarea
          name="Description"
          label="Description"
        />
        <Divider />
        <Actions>
          <ActionButton type="submit" variant="primary" >
            Update Template
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};



TemplateForm.propTypes = propTypes;

export default TemplateForm;
