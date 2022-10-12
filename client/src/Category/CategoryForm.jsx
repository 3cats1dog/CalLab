import React from 'react';
import PropTypes from 'prop-types';

import toast from 'shared/utils/toast';
import { Form, IssueTypeIcon, Icon, Avatar, IssuePriorityIcon } from 'shared/components';

import {
  FormHeading,
  FormElement,
  SelectItem,
  SelectItemLabel,
  Divider,
  Actions,
  ActionButton,
} from 'shared/components/Form/FormCommonStyle';

const propTypes = {
  category: PropTypes.object.isRequired,
  updateCategory: PropTypes.func.isRequired,
};

const CategoryForm = ({ category, updateCategory }) => {

  return (
    <Form
      enableReinitialize
      initialValues={{
        Name: category.Name,
        Description: category.Description,
      }}
      validations={{
        Name: Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          updateCategory(values);
          toast.success('Category has been successfully updated.');
        } catch (error) {
          Form.handleAPIError(error, form);
        }
      }}
    >
      <FormElement>
        <Form.Field.Input
          name="Name"
          label="Name"
        />
        <Divider />
        <Form.Field.Textarea
          name="Description"
          label="Description"
        />
        <Actions>
          <ActionButton type="submit" variant="primary" >
            Update Category
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};


CategoryForm.propTypes = propTypes;

export default CategoryForm;
