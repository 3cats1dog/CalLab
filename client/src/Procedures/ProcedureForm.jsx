import React from 'react';
import PropTypes from 'prop-types';
import useApi from 'shared/hooks/api';
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
import { get } from 'lodash';

const propTypes = {
  procedure: PropTypes.object.isRequired,
  updateProcedure: PropTypes.func.isRequired,
  categroyList:PropTypes.array.isRequired,
};

const ProcedureForm = ({ procedure, updateProcedure, categroyList }) => {

  const[{data}, fetchDataTypes] = useApi.get('/dataTypes');
  const dataTypeList=get(data, "dataTypes",[]);

  const dataTypeOptions =dataTypeList.map((dataType)=>{
    return {
      value:dataType.DataTypeId,
      label: dataType.Name,
    }
  })


  const categoryOptions = categroyList.map(category => ({
    value: category.CategoryId,
    label: category.Name,
  }));

  return (
    <Form
      enableReinitialize
      initialValues={{
        Name: procedure.Name,
        CategoryId:procedure.CategoryId,
        Description: procedure.Description,
        DataTypeId:procedure.DataTypeId,
      }}
      validations={{
        Name: Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          updateProcedure(values);
          toast.success('Procedure has been successfully updated.');
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
          name="CategoryId"
          label="Category"
          options={categoryOptions}
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
          <ActionButton type="submit" variant="primary" >
            Update Procedure
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};



ProcedureForm.propTypes = propTypes;

export default ProcedureForm;
