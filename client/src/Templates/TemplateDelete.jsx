import React from 'react';
import PropTypes from 'prop-types';

import api from 'shared/utils/api';
import toast from 'shared/utils/toast';
import { Button, ConfirmModal } from 'shared/components';

const propTypes = {
  template: PropTypes.object.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const TemplateDelete = ({ template,  modalClose }) => {
  const handleProcedureDelete = async () => {
    try {
      await api.delete(`/templates/${template.TemplateId}`);
      modalClose();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <ConfirmModal
      title={`Are you sure you want to delete this template? ${template.Name}`}
      message="Once you delete, it's gone for good."
      confirmText="Delete Template"
      onConfirm={handleProcedureDelete}
      renderLink={modal => (
        <Button icon="trash" iconSize={19} variant="empty" onClick={modal.open} />
      )}
    />
  );
};

TemplateDelete.propTypes = propTypes;

export default TemplateDelete;
