import React from 'react';
import PropTypes from 'prop-types';

import toast from 'shared/utils/toast';
import useApi from 'shared/hooks/api';
import { Form, Icon, Avatar, IssuePriorityIcon } from 'shared/components';

import {
TagType,
TagTypeCopy,
} from 'shared/constants/labInstruments'

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

const LabInstrumentCreate = ({ onCreate, modalClose }) => {
  const [{ isCreating }, createLabInstrument] = useApi.post('/labinstruments');

  return (
    <Form
      enableReinitialize
      initialValues={{
        Name:'',
        Brand:'',
        Model:'',
        SerialNo:'',
        TagNo:'',
        LastCalibDate:new Date(),
      }}
      validations={{
        Name: Form.is.required(),
        SerialNo: Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          await createLabInstrument({
            ...values,
          });
          toast.success('Lab. instrument has been successfully created.');
          onCreate();
          modalClose();
        } catch (error) {
          Form.handleAPIError(error, form);
        }
      }}
    >
      <FormElement>
        <FormHeading>Create Laborary Instrument</FormHeading>
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
        <Form.Field.DatePicker
          name="LastCalibDate"
          label="LastCalibDate"
          withTime={false}
        />
        <Form.Field.Select
          name="TagNo"
          label="TagNo"
          tip="Start typing to get a list of possible matches."
          options={tagOptions}
          renderOption={renderTag}
          renderValue={renderTag}
        />
        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={isCreating}>
            Create Lab. Instrument
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={modalClose}>
            Cancel
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};

const tagOptions = Object.values(TagType).map(tag => ({
  value: tag,
  label: TagTypeCopy[tag],
}));

const renderTag = ({ value: tag }) => (
  <SelectItem>
    <SelectItemLabel>{TagTypeCopy[tag]}</SelectItemLabel>
  </SelectItem>
);

LabInstrumentCreate.propTypes = propTypes;

export default LabInstrumentCreate;
