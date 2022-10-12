import React, { Fragment,Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import useApi from 'shared/hooks/api';
import  api from 'shared/utils/api';
import { PageError, PageLoader, CopyLinkButton, Button, AboutTooltip } from 'shared/components';
import { TopActions, TopActionsRight, TopActionsLeft, Content, Left, Right } from 'shared/components/Form/FormCommonStyle';
import Delete from './TemplateDelete';
import TemplateForm from './TemplateForm';
import DragDropForm from './TemplateDragDropForm';
const propTypes = {
  templateId: PropTypes.string.isRequired,
  modalClose: PropTypes.func,
};

const TemplateDetails = ({
  templateId,
  modalClose,
}) => {
  const [{ data, error ,setLocalData }, fetchTemplate] = useApi.get(`/templates/${templateId}`,  { lazy: true });
  //if (!data) return <Loader />;
  if (error) return <PageError />;


  const updateTemplateDetails = fields =>
  setLocalData(currentData => ({ template: { ...currentData.template, ...fields } }));

  const updateTemplate = updatedFields => {
    api.optimisticUpdate(`/templates/${templateId}`, {
      updatedFields,
      currentFields: template,
      setLocalData: fields => {
        updateTemplateDetails(fields);
        updateTemplateDetails(template.TemplateId, fields);
      },
    });
  };

  const template = get(data, 'template' );
  if (!template) return <PageLoader />;
  return (
    <Fragment>
      <TopActions>
        <TopActionsLeft>
          {`${template.category?.Name} / ${template.category?.Description}`}
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
          {modalClose &&  <Delete template={template} modalClose={modalClose} />}
          {modalClose &&  <Button icon="close" iconSize={24} variant="empty" onClick={modalClose} />}
        </TopActionsRight>
      </TopActions>
      <Content>
        <Left>
          <TemplateForm
            template={template}
            updateTemplate={updateTemplate}
          />
        </Left>
      </Content>
      <Content>
        <DragDropForm
         categoryId={template.CategoryId}
         templateId={template.TemplateId}
        />
      </Content>
    </Fragment>
  );
};

TemplateDetails.propTypes = propTypes;

export default TemplateDetails;
