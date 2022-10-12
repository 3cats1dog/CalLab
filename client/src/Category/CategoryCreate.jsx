import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import useApi from 'shared/hooks/api';

import { TopActions, TopActionsRight, Content, Left, Right } from 'shared/components/Form/FormCommonStyle';
import { Form, CopyLinkButton, Button, AboutTooltip } from 'shared/components';
import toast from 'shared/utils/toast';

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
  modalClose: PropTypes.func.isRequired,
};

const CategoryCreate = ({  modalClose }) => {

  const [{ isCreating }, createCategory] = useApi.post('/categorys');

  return (
    <Fragment>
    <TopActions>
      <TopActionsRight>
        <AboutTooltip
          renderLink={linkProps => (
            <Button icon="feedback" variant="empty" {...linkProps}>
              Give feedback
            </Button>
          )}
        />
        <CopyLinkButton variant="empty" />
        <Button icon="close" iconSize={24} variant="empty" onClick={modalClose} />
      </TopActionsRight>
    </TopActions>
    <Content>
      <Left>
      <Form
      enableReinitialize
      initialValues={{
        Name: '',
        Description:'',
      }}
      validations={{
        Name: Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          await createCategory(values);
          toast.success('Category has been created successfully.');
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
          <ActionButton type="submit" variant="primary" isWorking={isCreating}>
            Create Category
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={modalClose}>
            Cancel
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
     </Left>
    </Content>
  </Fragment>


  );
};


CategoryCreate.propTypes = propTypes;

export default CategoryCreate;
