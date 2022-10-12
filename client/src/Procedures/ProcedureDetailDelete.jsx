import React from 'react';
import PropTypes from 'prop-types';

import api from 'shared/utils/api';
import toast from 'shared/utils/toast';
import { Button, ConfirmModal } from 'shared/components';

const propTypes = {
  procedure: PropTypes.object.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const ProcedureDetailDelete = ({ procedure,  modalClose }) => {
  const handleProcedureDelete = async () => {
    try {
      await api.delete(`/procedures/${procedure.ProcedureId}`);
      modalClose();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <ConfirmModal
      title={`Are you sure you want to delete this procedure? ${procedure.Name}`}
      message="Once you delete, it's gone for good."
      confirmText="Delete Procedure"
      onConfirm={handleProcedureDelete}
      renderLink={modal => (
        <Button icon="trash" iconSize={19} variant="empty" onClick={modal.open} />
      )}
    />
  );
};

ProcedureDetailDelete.propTypes = propTypes;

export default ProcedureDetailDelete;
