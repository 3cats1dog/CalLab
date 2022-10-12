import React from 'react';
import PropTypes from 'prop-types';

import api from 'shared/utils/api';
import toast from 'shared/utils/toast';
import { Button, ConfirmModal } from 'shared/components';

const propTypes = {
  customer: PropTypes.object.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const CustomerDetailsDelete = ({ customer,  modalClose }) => {
  const handleCustomerDelete = async () => {
    try {
      await api.delete(`/customers/${customer.CustomerId}`);
      modalClose();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <ConfirmModal
      title={`Are you sure you want to delete this customer? ${customer.Name}`}
      message="Once you delete, it's gone for good."
      confirmText="Delete customer"
      onConfirm={handleCustomerDelete}
      renderLink={modal => (
        <Button icon="trash" iconSize={19} variant="empty" onClick={modal.open} />
      )}
    />
  );
};

CustomerDetailsDelete.propTypes = propTypes;

export default CustomerDetailsDelete;
