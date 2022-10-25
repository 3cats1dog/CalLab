import { Fragment, useState } from "react";
import PropTypes from 'prop-types';
import { get } from 'lodash';
import toast from 'shared/utils/toast';
import useApi from 'shared/hooks/api';
import { Container, Row, Col } from 'react-bootstrap';

import { Form, IssueTypeIcon, Select, Icon, Avatar, IssuePriorityIcon } from 'shared/components';
import {
    FormHeading,
    FormElement,
    SelectItem,
    SelectItemLabel,
    Divider,
    Actions,
    ActionButton,
  } from 'shared/components/Form/FormCommonStyle';


import EnterValue from "shared/components/EnterValue";
import { ScaleType } from "shared/constants/calibrationdatas";

const propTypes = {
    templateId: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
    fetchDetail: PropTypes.func.isRequired,
  };


  const TemplateAddStep =({templateId, categoryId, fetchDetail})=> {

    const [{ isCreating }, createTemplateDetail] = useApi.post('/templateDetails');

    const [fetchProcedure]=useApi.get(`/procedures/category/${categoryId}`, { lazy:true});
    const procedureList=get(fetchProcedure.data, 'procedures', []);
    const [procedureId, setProcedure] = useState(0);
  
    const [{data}, fetchSubProcedure] = useApi.get(`/subprocedures/procedure/${procedureId}`,{procedureId} , { lazy: true });
    const subProcedureList = get(data, 'subprocedures', []);
  
    const procedureOptions = procedureList.map(procedure => ({
      value: procedure.ProcedureId,
      label: procedure.Name,
    }));
  
  
  
    const subProcedureOptions = subProcedureList.map(subProcedure => ({
      value: subProcedure.SubProcedureId,
      label: subProcedure.Name + "(" + subProcedure.Range + ")",
    }));
  
  
    const procedureChangeHandle= (e)=>{
        setProcedure(e);
        fetchSubProcedure();
    }


    const addBorderStyle = {
        border: '1px solid rgba(0, 0, 0, 0.05)', 
      };


return (
<Form
      enableReinitialize
      initialValues={{
        TemplateId: templateId,
        Position:1,
        InputText:0,
        Scale:ScaleType.NONE,
        DataCount:5,
        ProcedureId:'',
        SubProcedureId:'',
      }}
      validations={{
        ProcedureId: Form.is.required(),
        SubProcedureId: Form.is.required(),
        InputText: Form.is.number(),
        Position:Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          //fix value number format;
          let number = values.InputText.replace(',','.');
          values.NominalValue =number + values.Scale;
          await createTemplateDetail({
            ...values,
          });
          toast.success('New step has been successfully created.');
          fetchDetail();
          //modalClose();
        } catch (error) {
          Form.handleAPIError(error, form);
        }
      }}
    >
      <FormElement style={addBorderStyle}>
        <Row>
        <Form.Field.Select
          className="col-lg-3"
          name="ProcedureId"
          label="Procedure"
          options={procedureOptions}
          onSelectChange={procedureChangeHandle}
        />
        <Form.Field.Select
          className="col-lg-3"
          name="SubProcedureId"
          label="Sub Proc."
          options={subProcedureOptions}
        />
        <EnterValue
          classNameInput="col-lg-2"
          classNameSelect="col-lg-1"
          nameInput="InputText"
          nameSelect="Scale"
          labelInput="Nominal Value"
          labelSelect="Scale"
        />
        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={isCreating}>
            Add New Step
          </ActionButton>
        </Actions>
        </Row>
      </FormElement>
    </Form>
)
};

TemplateAddStep.propTypes = propTypes;

export default TemplateAddStep;