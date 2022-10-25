import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
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
        <Row>

        <Form.Field.Input
          className="col-lg-6"
          name="Name"
          label="Name"
        />
        <Form.Field.Textarea
          className="col-lg-6"
          name="Description"
          label="Description"
        />
        </Row>
        <Row>
        <Actions>
          <ActionButton type="submit" variant="primary" >
            Update Template
          </ActionButton>
        </Actions>
        </Row>
        <Divider />
      </FormElement>
    </Form>
  );
};



TemplateForm.propTypes = propTypes;

export default TemplateForm;
