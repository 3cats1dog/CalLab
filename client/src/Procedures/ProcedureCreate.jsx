import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import useApi from 'shared/hooks/api';

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
  Full,
} from 'shared/components/Form/FormCommonStyle';
import { get } from 'lodash';

const propTypes = {
  categoryId: PropTypes.string.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const ProcedureCreate = ({  modalClose, categoryId }) => {

  const [{ isCreating }, createProcedure] = useApi.post('/procedures');

  const[{data}, fetchDataTypes] = useApi.get('/dataTypes');
  const dataTypeList=get(data, "dataTypes",[]);

  const dataTypeOptions =dataTypeList.map((dataType)=>{
    return {
      value:dataType.DataTypeId,
      label: dataType.Name,
    }
  })

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
      <Full>
      <Form
      enableReinitialize
      initialValues={{
        Name: '',
        Description:'',
        DataTypeId:'',
      }}
      validations={{
        Name: Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          await createProcedure({
            ...values,
            "CategoryId": categoryId,
          });
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
        <Form.Field.Select 
        name="DataTypeId"
        label="Data Type"
        options={dataTypeOptions}
        />
        <Divider />
        <Form.Field.Textarea
          name="Description"
          label="Description"
        />
        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={isCreating}>
            Create Procedure
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


ProcedureCreate.propTypes = propTypes;

export default ProcedureCreate;
