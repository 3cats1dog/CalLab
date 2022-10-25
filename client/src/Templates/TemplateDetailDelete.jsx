import React from 'react';
import PropTypes from 'prop-types';

import api from 'shared/utils/api';
import toast from 'shared/utils/toast';
import { Button, ConfirmModal } from 'shared/components';

const propTypes = {
  templateDetailId: PropTypes.number.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const TemplateDetailDelete = ({ templateDetailId, modalClose }) => {
  const handleTemplateDetailDelete = async () => {
    try {
      await api.delete(`/templateDetails/${templateDetailId}`);
      modalClose();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <ConfirmModal
      title={`Are you sure you want to delete this step?`}
      message="Once you delete, it's gone for good."
      confirmText="Delete Step"
      onConfirm={handleTemplateDetailDelete}
      renderLink={modal => (
        <Button icon="trash" iconSize={19} variant="empty" onClick={modal.open} />
      )}
    />
  );
};

TemplateDetailDelete.propTypes = propTypes;

export default TemplateDetailDelete;
