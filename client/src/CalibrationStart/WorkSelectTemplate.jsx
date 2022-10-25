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




const propTypes = {
    calibrationId: PropTypes.string.isRequired,
    fetchStep: PropTypes.func.isRequired,
};


const WorkSelectTemplate =({calibrationId, fetchStep})=> {

    const [{ isCreating }, applyTemplate] = useApi.post(`/steps/template?removeOld=true`);

    const [fetchTemplates]=useApi.get(`/templates/calibration/${calibrationId}`, { lazy:true});
    const templateList=get(fetchTemplates.data, 'templates', []);
  
    const templateOptions = templateList.map(template => ({
      value: template.TemplateId,
      label: template.Name,
    }));
  
  
    const addBorderStyle = {
        border: '1px solid rgba(0, 0, 0, 0.05)', 
      };


return (
<Form
      enableReinitialize
      initialValues={{
        calibrationId: calibrationId,
        templateId:0,
      }}
      validations={{
        templateId: Form.is.required(),
        calibrationId: Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          await applyTemplate(values);
          toast.success('Template steps has been successfully added.');
          fetchStep();
          //modalClose();
        } catch (error) {
          Form.handleAPIError(error, form);
        }
      }}
    >
      <FormElement style={addBorderStyle}>
        <Row>
        <Form.Field.Select
          name="templateId"
          label="Template"
          options={templateOptions}
        />
        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={isCreating}>
            Select Step From Template
          </ActionButton>
        </Actions>
        </Row>
      </FormElement>
    </Form>
)
};

WorkSelectTemplate.propTypes = propTypes;

export default WorkSelectTemplate;