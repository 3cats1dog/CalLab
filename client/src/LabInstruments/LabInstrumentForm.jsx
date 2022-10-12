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
  labInstrument: PropTypes.object.isRequired,
  updateLabInstrument: PropTypes.func.isRequired,
};

const LabInstrumentForm = ({ labInstrument, updateLabInstrument }) => {

  return (
    <Form
      enableReinitialize
      initialValues={{
        Name: labInstrument.Name,
        Brand: labInstrument.Brand,
        Model: labInstrument.Model,
        SerialNo:labInstrument.SerialNo,
        TagNo:labInstrument.TagNo,
        LastCalibDate: labInstrument.LastCalibDate
      }}
      validations={{
        Name: Form.is.required(),
        SerialNo: Form.is.required(),
        TagNo: Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          updateLabInstrument(values);
          toast.success('Equipment has been successfully created.');
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
            Update Equipment
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};


LabInstrumentForm.propTypes = propTypes;

export default LabInstrumentForm;
