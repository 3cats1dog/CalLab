import React from 'react';
import PropTypes from 'prop-types';

import {
  IssueType,
  IssueStatus,
  IssuePriority,
  IssueTypeCopy,
  IssuePriorityCopy,
} from 'shared/constants/issues';
import toast from 'shared/utils/toast';
import useApi from 'shared/hooks/api';
import useCurrentUser from 'shared/hooks/currentUser';
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
  onCreate: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const CustomerCreate = ({ onCreate, modalClose }) => {
  const [{ isCreating }, createCustomer] = useApi.post('/customers');

  const { currentUserId } = useCurrentUser();

  return (
    <Form
      enableReinitialize
      initialValues={{
        Name:'',
        Email:'',
        Phone:'',
        Address:'',
      }}
      validations={{
        Name: Form.is.required(),
        Email: [Form.is.required(), Form.is.email()],
      }}
      onSubmit={async (values, form) => {
        try {
          await createCustomer({
            ...values,
          });
          toast.success('Customer has been successfully created.');
          onCreate();
          modalClose();
        } catch (error) {
          Form.handleAPIError(error, form);
        }
      }}
    >
      <FormElement>
        <FormHeading>Create Customer</FormHeading>
        <Form.Field.Input
          name="Name"
          label="Name"
        />
        <Divider />
        <Form.Field.Input
          name="Email"
          label="Email"
        />
        <Form.Field.Input
          name="Phone"
          label="Phone"
        />
        <Form.Field.Textarea
          name="Address"
          label="Address"
          tip="Describe the customer address in as much detail as you'd like."
        />
        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={isCreating}>
            Create Customer
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={modalClose}>
            Cancel
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};

CustomerCreate.propTypes = propTypes;

export default CustomerCreate;
