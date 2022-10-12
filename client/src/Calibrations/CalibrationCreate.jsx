import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import toast from 'shared/utils/toast';
import useApi from 'shared/hooks/api';
import { Form, Select, Icon, Avatar, IssuePriorityIcon } from 'shared/components';

import {
CalibrationType,
CalibrationStatus,
CalibrationTypeCopy,
CalibrationStatusCopy,
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
  onCreate: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const CalibrationCreate = ({ onCreate, modalClose }) => {
  const [{ isCreating }, createCalibration] = useApi.post('/calibrations');

  const FormData={
    Type:'',
    Status:'',
    Remarks:'',
    CustomerReq:'',
    DeviceReq:'',
    InstrumentId:'',
    CustomerId:'',
    AssignUserID:0,
  };

  const [fetchCustomer]=useApi.get('/customers', { lazy:true});
  const customerList=get(fetchCustomer.data, 'customers', []);
  const [customerId, setCustomer] = useState(0);

  const [{data}, fetchInstruments] = useApi.get(`/customerInstruments/customer/${customerId}`,{customerId} , { lazy: true });
  const instrumentList = get(data, 'instruments', []);

  const customerOptions = customerList.map(customer => ({
    value: customer.CustomerId,
    label: customer.Name,
  }));



  const instrumentOptions = instrumentList.map(instrument => ({
    value: instrument.InstrumentId,
    label: instrument.Name + "/" + instrument.SerialNo,
  }));


  const customerChangeHandle= (e)=>{
    setCustomer(e);
    fetchInstruments();
  }

  return (
    <Form
      enableReinitialize
      initialValues={FormData}
      validations={{
        Type: Form.is.required(),
        Status: Form.is.required(),
        InstrumentId:Form.is.required(),
        CustomerId:Form.is.required(),
        AssignUserID:Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          await createCalibration({
            ...values,
          });
          toast.success('Calibration work has been successfully created.');
          onCreate();
          modalClose();
        } catch (error) {
          Form.handleAPIError(error, form);
        }
      }}
    >
      <FormElement>
        <FormHeading>Create Calibration Work</FormHeading>
        <Form.Field.Select
          name="CustomerId"
          label="Customer"
          tip="Start typing to get a list of possible matches."
          options={customerOptions}
          onSelectChange={customerChangeHandle} 
        />
        <Form.Field.Select
          name="InstrumentId"
          label="Instrument"
          tip="Start typing to get a list of possible matches."
          options={instrumentOptions}
        />
        <Divider />
        <Form.Field.Select
          name="Type"
          label="Type"
          className="HalfLeft"
          options={typeOptions}
          renderOption={renderType}
          renderValue={renderType}
        />
        <Form.Field.Select
          name="Status"
          label="Status"
          className="HalfRight"
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
          label="Customer Requirements"
        />
        <Form.Field.Textarea
          name="DeviceReq"
          label="Device Requirements"
          tip="Describe the issue in as much detail as you'd like."
        />
        <Form.Field.Input
          name="AssignUserID"
          label="Assign User"
        />
        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={isCreating}>
            Create Work
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={modalClose}>
            Cancel
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};


const statusOptions = Object.values(CalibrationStatus).map(status => ({
  value: status,
  label: CalibrationStatusCopy[status],
}));

const renderStatus = ({ value: status }) => (
  <SelectItem>
    <SelectItemLabel>{CalibrationStatusCopy[status]}</SelectItemLabel>
  </SelectItem>
);

const typeOptions = Object.values(CalibrationType).map(type => ({
  value: type,
  label: CalibrationTypeCopy[type],
}));

const renderType = ({ value: type }) => (
  <SelectItem>
    <SelectItemLabel>{CalibrationTypeCopy[type]}</SelectItemLabel>
  </SelectItem>
);

CalibrationCreate.propTypes = propTypes;

export default CalibrationCreate;
