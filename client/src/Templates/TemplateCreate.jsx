import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import useApi from 'shared/hooks/api';
import { get } from 'lodash';
import { PageError, PageLoader, CopyLinkButton, Button, AboutTooltip } from 'shared/components';
import toast from 'shared/utils/toast';
import { Form, IssueTypeIcon, Icon, Avatar, IssuePriorityIcon } from 'shared/components';

import {
  TopActions, TopActionsRight, Content, Left, Right,
  FormHeading,
  FormElement,
  SelectItem,
  SelectItemLabel,
  Divider,
  Actions,
  ActionButton,
  TopActionsLeft,
  Full,
} from  'shared/components/Form/FormCommonStyle';

  const propTypes = {
    categoryList: PropTypes.array.isRequired,
    modalClose: PropTypes.func.isRequired,
  };

  const TemplateCreate = ({  modalClose, categoryList }) => {

  const [{ isCreating }, createTemplate] = useApi.post('/templates');

  const categoryOptions =categoryList.map(category => ({
    value: category.CategoryId,
    label: category.Name,
  }));


  return (
    <Fragment>
    <TopActions>
      <TopActionsLeft>
      {`New Template`}
      </TopActionsLeft>
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
      <Full>
      <Form
      enableReinitialize
      initialValues={{
        Name: '',
        CategoryId:0,
        Description:'',
      }}
      validations={{
        Name: Form.is.required(),
        CategoryId:Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          await createTemplate({
            ...values
          });
          toast.success('Category has been created successfully.');
          modalClose();
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
        <Form.Field.Select 
          name="CategoryId"
          label="Category"
          options={categoryOptions}
        />

        <Form.Field.Textarea
          name="Description"
          label="Description"
        />
        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={isCreating}>
            Create Template
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={modalClose}>
            Cancel
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
     </Full>
    </Content>
  </Fragment>


  );
};


TemplateCreate.propTypes = propTypes;

export default TemplateCreate;
