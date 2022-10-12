import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import useApi from 'shared/hooks/api';

import { TopActions, TopActionsRight, Content, Left, Right } from 'shared/components/Form/FormCommonStyle';
import { PageError, PageLoader, CopyLinkButton, Button, AboutTooltip } from 'shared/components';
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
} from './DetailCreate/Styles';

const propTypes = {
  procedureId: PropTypes.string.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const TemplateDetailCreate = ({  modalClose, procedureId }) => {

  const [{ isCreating }, createProcedure] = useApi.post('/subprocedures');

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
        MeasureCount:'',
        Range:'',
        Uncertinity:'',
        Requirement:'',
        Description:'',
      }}
      validations={{
        Name: Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          await createProcedure({
            ...values,
            "ProcedureId": procedureId,
          });
          toast.success('Sub Procedure has been created successfully.');
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
        <Form.Field.Input
          name="MeasureCount"
          label="MeasureCount"
        />
        <Form.Field.Input
          name="Range"
          label="Range"
        />
        <Form.Field.Input
          name="Uncertinity"
          label="Uncertinity"
        />
        <Divider />
        <Form.Field.Input
          name="Requirement"
          label="Requirement"
        />
        <Form.Field.Textarea
          name="Description"
          label="Description"
        />
        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={isCreating}>
            Create SubProcedure
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


TemplateDetailCreate.propTypes = propTypes;

export default TemplateDetailCreate;
