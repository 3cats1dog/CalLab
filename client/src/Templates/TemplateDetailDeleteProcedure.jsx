import React from 'react';
import PropTypes from 'prop-types';

import api from 'shared/utils/api';
import toast from 'shared/utils/toast';
import { Button, ConfirmModal } from 'shared/components';

const propTypes = {
  procedure: PropTypes.object.isRequired,
  templateId: PropTypes.number.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const TemplateDetailDeleteProcedure = ({ procedure, templateId, modalClose }) => {
  const handleTemplateDetailDelete = async () => {
    try {
      await api.delete(`/templateDetails/procedure/${templateId}/${procedure.ProcedureId}`);
      modalClose();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <ConfirmModal
      title={`Are you sure you want to delete all steps in this procedure? ${procedure.Name}`}
      message="Once you delete, it's gone for good."
      confirmText="Delete Steps"
      onConfirm={handleTemplateDetailDelete}
      renderLink={modal => (
        <Button icon="trash" iconSize={19} variant="empty" onClick={modal.open} />
      )}
    />
  );
};

TemplateDetailDeleteProcedure.propTypes = propTypes;

export default TemplateDetailDeleteProcedure;
