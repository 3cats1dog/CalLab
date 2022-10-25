import React from 'react';
import PropTypes from 'prop-types';

import api from 'shared/utils/api';
import toast from 'shared/utils/toast';
import { Button, ConfirmModal } from 'shared/components';

const propTypes = {
  stepId: PropTypes.number.isRequired,
  refreshBack: PropTypes.func.isRequired,
};

const StepDelete = ({ stepId, refreshBack }) => {
  const handleStepDelete = async () => {
    try {
      await api.delete(`/steps/${stepId}`);
      refreshBack();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <ConfirmModal
      title={`Are you sure you want to delete this step?`}
      message="Once you delete, it's gone for good."
      confirmText="Delete Step"
      onConfirm={handleStepDelete}
      renderLink={modal => (
        <Button icon="trash" iconSize={19} variant="empty" onClick={modal.open} />
      )}
    />
  );
};

StepDelete.propTypes = propTypes;

export default StepDelete;
