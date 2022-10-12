import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import toast from 'shared/utils/toast';
import useApi from 'shared/hooks/api';
import { Form, Icon, Avatar, IssuePriorityIcon } from 'shared/components';

import {
TagType,
TagTypeCopy,
} from 'shared/constants/customerInstruments'

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

const CustomerInstrumentCreate = ({ onCreate, modalClose }) => {
  const [{ isCreating }, createCustomerInstrument] = useApi.post('/customerInstruments');
  const [fetchCustomer]=useApi.get('/customers', { lazy:true});
  const [{data}, fetchCategory] = useApi.get('/categorys',  { lazy: true });
  const categroyList = get(data, 'categorys', []);
  const customerList=get(fetchCustomer.data, 'customers', []);

  const customerOptions = customerList.map(customer => ({
    value: customer.CustomerId,
    label: customer.Name,
  }));
  

  const categoryOptions = categroyList.map(category => ({
    value: category.CategoryId,
    label: category.Name,
  }));

  return (
    <Form
      enableReinitialize
      initialValues={{
        Name:'',
        Brand:'',
        Model:'',
        SerialNo:'',
        TagNo:'',
        CategoryId:'',
        CustomerId:'',
        LastCalibDate:new Date().toISOString(),
      }}
      validations={{
        Name: Form.is.required(),
        SerialNo: Form.is.required(),
        CategoryId:Form.is.required(),
        CustomerId:Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          await createCustomerInstrument({
            ...values,
          });
          toast.success('Instrument has been successfully created.');
          onCreate();
          modalClose();
        } catch (error) {
          Form.handleAPIError(error, form);
        }
      }}
    >
      <FormElement>
        <FormHeading>Create Customer Instrument</FormHeading>
        <Form.Field.Select
          name="CategoryId"
          label="Category"
          tip="Start typing to get a list of possible matches."
          options={categoryOptions}
        />
        <Form.Field.Select
          name="CustomerId"
          label="Customer"
          tip="Start typing to get a list of possible matches."
          options={customerOptions}
        />
        <Divider />
        <Form.Field.Input
          name="Name"
          label="Name"
        />
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
            Create Customer Instrument
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

CustomerInstrumentCreate.propTypes = propTypes;

export default CustomerInstrumentCreate;
