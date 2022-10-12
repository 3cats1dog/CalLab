import React from 'react';
import PropTypes from 'prop-types';

import api from 'shared/utils/api';
import toast from 'shared/utils/toast';
import { Button, ConfirmModal } from 'shared/components';

const propTypes = {
  customerInstrument: PropTypes.object.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const CustomerInstrumentDetailDelete = ({ customerInstrument,  modalClose }) => {
  const handleCustomerInstrumentDelete = async () => {
    try {
      await api.delete(`/customerInstruments/${customerInstrument.InstrumentId}`);
      modalClose();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <ConfirmModal
      title={`Are you sure you want to delete this ınstrument? ${customerInstrument.Name}`}
      message="Once you delete, it's gone for good."
      confirmText="Delete Instrument"
      onConfirm={handleCustomerInstrumentDelete}
      renderLink={modal => (
        <Button icon="trash" iconSize={19} variant="empty" onClick={modal.open} />
      )}
    />
  );
};

CustomerInstrumentDetailDelete.propTypes = propTypes;

export default CustomerInstrumentDetailDelete;
