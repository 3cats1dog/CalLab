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
  customer: PropTypes.object.isRequired,
  updateCustomer: PropTypes.func.isRequired,
};

const CustomerForm = ({ customer, updateCustomer }) => {

  return (
    <Form
      enableReinitialize
      initialValues={{
        Name: customer.Name,
        Phone: customer.Phone,
        Email: customer.Email,
        Address:customer.Address,
      }}
      validations={{
        Name: Form.is.required(),
        Email: [Form.is.required(), Form.is.email()],
        Phone: Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          updateCustomer(values);
          toast.success('Customer has been successfully created.');
        } catch (error) {
          Form.handleAPIError(error, form);
        }
      }}
    >
      <FormElement>
        <Form.Field.Input
          name="Name"
          label="Name"
          tip="Start typing to get a list of possible matches."
        />
        <Divider />
        <Form.Field.Input
          name="Email"
          label="Email"
          tip="Concisely summarize the issue in one or two sentences."
        />
        <Form.Field.Input
          name="Phone"
          label="Phone"
          tip="Describe the issue in as much detail as you'd like."
        />
        <Form.Field.Textarea
          name="Address"
          label="Address"
        />
        <Actions>
          <ActionButton type="submit" variant="primary" >
            Update Customer
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};


CustomerForm.propTypes = propTypes;

export default CustomerForm;
