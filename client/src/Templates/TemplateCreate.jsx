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
} from  'shared/components/Form/FormCommonStyle';

  const propTypes = {
    category: PropTypes.object.isRequired,
    modalClose: PropTypes.func.isRequired,
  };

  const TemplateCreate = ({  modalClose, category }) => {

  const [{ isCreating }, createTemplate] = useApi.post('/templates');
  const [{data, isError }, fetchProcedure] = useApi.get(`/procedures/category/${category.CategoryId}`, { lazy:true});

  const ProcedureList=get(data,"procedures", []);



  const procedureOptions =ProcedureList.map(procedure => ({
    value: procedure.ProcedureId,
    label: procedure.Name,
  }));


  return (
    <Fragment>
    <TopActions>
      <TopActionsLeft>
      {`Category: ${category.Name}`}
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
      <Left>
      <Form
      enableReinitialize
      initialValues={{
        Name: '',
        ProcedureList:'',
        Description:'',
      }}
      validations={{
        Name: Form.is.required(),
        ProcedureList:Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          await createTemplate({
            ...values,
            "CategoryId": category.CategoryId,
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
          name="ProcedureList"
          label="Procedure"
          isMulti
          options={procedureOptions}
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
     </Left>
    </Content>
  </Fragment>


  );
};


TemplateCreate.propTypes = propTypes;

export default TemplateCreate;
