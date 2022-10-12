import React from 'react';
import PropTypes from 'prop-types';

import api from 'shared/utils/api';
import toast from 'shared/utils/toast';
import { Button, ConfirmModal } from 'shared/components';

const propTypes = {
  category: PropTypes.object.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const CategoryDetailDelete = ({ category,  modalClose }) => {
  const handleCategoryDelete = async () => {
    try {
      await api.delete(`/categorys/${category.CategoryId}`);
      modalClose();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <ConfirmModal
      title={`Are you sure you want to delete this category? ${category.Name}`}
      message="Once you delete, it's gone for good."
      confirmText="Delete Category"
      onConfirm={handleCategoryDelete}
      renderLink={modal => (
        <Button icon="trash" iconSize={19} variant="empty" onClick={modal.open} />
      )}
    />
  );
};

CategoryDetailDelete.propTypes = propTypes;

export default CategoryDetailDelete;
