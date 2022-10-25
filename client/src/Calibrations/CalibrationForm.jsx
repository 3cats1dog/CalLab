import React from 'react';
import PropTypes from 'prop-types';

import toast from 'shared/utils/toast';
import { Form, IssueTypeIcon, Icon, Avatar, IssuePriorityIcon } from 'shared/components';
import { 
  CalibrationType, 
  CalibrationStatus,
  CalibrationTypeCopy,
  CalibrationStatusCopy
} from 'shared/constants/calibration'

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
  calibration: PropTypes.object.isRequired,
  updateCalibration: PropTypes.func.isRequired,
};

const CalibrationForm = ({ calibration, updateCalibration }) => {



  return (
    <Form
      enableReinitialize
      initialValues={{
        Type: calibration.Type,
        Status: calibration.Status,
        Remarks: calibration.Remarks,
        CustomerReq:calibration.CustomerReq,
        DeviceReq:calibration.DeviceReq,
        AssignUserID: calibration.AssignUserID
      }}
      validations={{
        Type: Form.is.required(),
        Status: Form.is.required(),
        AssignUserID: Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          updateCalibration(values);
          toast.success('Instrument has been successfully created.');
        } catch (error) {
          Form.handleAPIError(error, form);
        }
      }}
    >
      <FormElement>
        <Form.Field.Select
          name="Type"
          label="Type"
          options={typeOptions}
          renderOption={renderType}
          renderValue={renderType}
        />
        <Divider />
        <Form.Field.Select
          name="Status"
          label="Status"
          options={statusOptions}
          renderOption={renderStatus}
          renderValue={renderStatus}
        />
        <Form.Field.Textarea
          name="Remarks"
          label="Remarks"
        />
        <Form.Field.Textarea
          name="CustomerReq"
          label="CustomerReq"
        />
        <Form.Field.Textarea
          name="DeviceReq"
          label="DeviceReq"
          tip="Describe the issue in as much detail as you'd like."
        />
        <Form.Field.Input
          name="AssignUserID"
          label="AssignUserID"
        />
        <Actions>
          <ActionButton type="submit" variant="primary" >
            Update Calibration
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};

const typeOptions = Object.values(CalibrationType).map(type => ({
  value: type,
  label: CalibrationTypeCopy[type],
}));

const renderType = ({ value: type }) => (
  <SelectItem>
    <IssueTypeIcon type={type} top={1} />
    <SelectItemLabel>{CalibrationTypeCopy[type]}</SelectItemLabel>
  </SelectItem>
);

const statusOptions = Object.values(CalibrationStatus).map(status => ({
  value: status,
  label: CalibrationStatusCopy[status],
}));

const renderStatus = ({ value: status }) => (
  <SelectItem>
    <SelectItemLabel>{CalibrationStatusCopy[status]}</SelectItemLabel>
  </SelectItem>
);

CalibrationForm.propTypes = propTypes;

export default CalibrationForm;
