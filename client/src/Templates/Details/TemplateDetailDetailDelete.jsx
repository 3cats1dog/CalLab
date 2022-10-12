import React from 'react';
import PropTypes from 'prop-types';

import api from 'shared/utils/api';
import toast from 'shared/utils/toast';
import { Button, ConfirmModal } from 'shared/components';

const propTypes = {
  subprocedure: PropTypes.object.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const TemplateDetailDetailDelete = ({ subprocedure,  modalClose }) => {
  const handleSubProcedureDelete = async () => {
    try {
      await api.delete(`/subprocedures/${subprocedure.SubProcedureId}`);
      modalClose();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <ConfirmModal
      title={`Are you sure you want to delete this sub procedure? ${subprocedure.Name}`}
      message="Once you delete, it's gone for good."
      confirmText="Delete SubProcedure"
      onConfirm={handleSubProcedureDelete}
      renderLink={modal => (
        <Button icon="trash" iconSize={19} variant="empty" onClick={modal.open} />
      )}
    />
  );
};

TemplateDetailDetailDelete.propTypes = propTypes;

export default TemplateDetailDetailDelete;
