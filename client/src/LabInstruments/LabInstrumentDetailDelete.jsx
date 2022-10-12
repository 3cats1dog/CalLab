import React from 'react';
import PropTypes from 'prop-types';

import api from 'shared/utils/api';
import toast from 'shared/utils/toast';
import { Button, ConfirmModal } from 'shared/components';

const propTypes = {
  labInstrument: PropTypes.object.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const LabInstrumentDetailDelete = ({ labInstrument,  modalClose }) => {
  const handleLabInstrumentDelete = async () => {
    try {
      await api.delete(`/labinstruments/${labInstrument.LabInstrId}`);
      modalClose();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <ConfirmModal
      title={`Are you sure you want to delete this equipment? ${labInstrument.Name}`}
      message="Once you delete, it's gone for good."
      confirmText="Delete Equipment"
      onConfirm={handleLabInstrumentDelete}
      renderLink={modal => (
        <Button icon="trash" iconSize={19} variant="empty" onClick={modal.open} />
      )}
    />
  );
};

LabInstrumentDetailDelete.propTypes = propTypes;

export default LabInstrumentDetailDelete;
