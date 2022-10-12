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
  customerInstrument: PropTypes.object.isRequired,
  updateCustomerInstrument: PropTypes.func.isRequired,
};

const CustomerInstrumentForm = ({ customerInstrument, updateCustomerInstrument }) => {

  return (
    <Form
      enableReinitialize
      initialValues={{
        Name: customerInstrument.Name,
        Brand: customerInstrument.Brand,
        Model: customerInstrument.Model,
        SerialNo:customerInstrument.SerialNo,
        TagNo:customerInstrument.TagNo,
        LastCalibDate: customerInstrument.LastCalibDate
      }}
      validations={{
        Name: Form.is.required(),
        SerialNo: Form.is.required(),
        TagNo: Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          updateCustomerInstrument(values);
          toast.success('Instrument has been successfully created.');
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
        <Divider />
        <Form.Field.Input
          name="Brand"
          label="Brand"
        />
        <Form.Field.Input
          name="Model"
          label="Model"
        />
        <Form.Field.Input
          name="SerialNo"
          label="SerialNo"
        />
        <Form.Field.Input
          name="TagNo"
          label="TagNo"
          tip="Describe the issue in as much detail as you'd like."
        />
        <Form.Field.DatePicker
          name="LastCalibDate"
          label="LastCalibDate"
          withTime={false}
        />
        <Actions>
          <ActionButton type="submit" variant="primary" >
            Update Instrument
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};


CustomerInstrumentForm.propTypes = propTypes;

export default CustomerInstrumentForm;
