import React from 'react';
import PropTypes from 'prop-types';

import api from 'shared/utils/api';
import toast from 'shared/utils/toast';
import { Button, ConfirmModal } from 'shared/components';

const propTypes = {
  calibration: PropTypes.object.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const CalibrationDetailDelete = ({ calibration,  modalClose }) => {
  const handleCalibrationDelete = async () => {
    try {
      await api.delete(`/calibrations/${calibration.CalibrationId}`);
      modalClose();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <ConfirmModal
      title={`Are you sure you want to delete this calibration work?`}
      message={`${calibration.customer.Name} \r\n${calibration.instrument.Name}/SN:${calibration.instrument.SerialNo}\r\nOnce you delete, it's gone for good.`}
      confirmText="Delete Calibration"
      onConfirm={handleCalibrationDelete}
      renderLink={modal => (
        <Button icon="trash" iconSize={19} variant="empty" onClick={modal.open} />
      )}
    />
  );
};

CalibrationDetailDelete.propTypes = propTypes;

export default CalibrationDetailDelete;
