import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import useApi from 'shared/hooks/api';

import { FormHeading,
  FormElement,
  SelectItem,
  SelectItemLabel,
  Divider,
  Actions,
  ActionButton,TopActions, 
  TopActionsRight,  TopActionsLeft,
  Content, Left, Right, 
  FormRow,
  FormElement_1_3,
  Full,
} from 'shared/components/Form/FormCommonStyle';
import { PageError, PageLoader, CopyLinkButton, Button, AboutTooltip } from 'shared/components';
import toast from 'shared/utils/toast';
import { Form, IssueTypeIcon, Icon, Avatar, IssuePriorityIcon } from 'shared/components';
import { get } from 'lodash';


const propTypes = {
  procedure: PropTypes.object.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const SubProcedureCreate = ({  modalClose, procedure }) => {

  if (!procedure) return <h1>Empty</h1>

  const [{data}, fetchDataType] = useApi.get(`/dataTypes/${procedure.DataTypeId}`);
  const dataType =get(data, "dataType",{Symbol:"", Unit:""});

  const [{ isCreating }, createProcedure] = useApi.post('/subprocedures');


  return (
    <Fragment>
    <TopActions>
      <TopActionsLeft>
        {`${procedure.Name}/${procedure.DataTypeId}`}
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
        MeasureCount:'',
        Range:'',
        Uncertinity:'',
        Requirement:'',
        Description:'',
        UncertinityReading: '',
        UncertinityRange: '',
        UncertinityResolution:'',
        DataTypeId:procedure.DataTypeId,
      }}
      validations={{
        Name: Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          await createProcedure({
            ...values,
            "ProcedureId": procedure.ProcedureId,
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
        <FormRow>
          <FormElement_1_3>
            <Form.Field.Input
            name="UncertinityReading"
            label={`Uncertinity Reading (·${dataType?.Symbol})`}
            />
          </FormElement_1_3>
          <FormElement_1_3>
          <Form.Field.Input
            name="UncertinityRange"
            label={`Uncertinity Range (%)`}
            />
          </FormElement_1_3>
          <FormElement_1_3>
          <Form.Field.Input
            name="UncertinityResolution"
            label={`Uncertinity Resolution (${dataType?.Unit})`}
            />
          </FormElement_1_3>
        </FormRow>

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
     </Full>
    </Content>
  </Fragment>


  );
};


SubProcedureCreate.propTypes = propTypes;

export default SubProcedureCreate;
