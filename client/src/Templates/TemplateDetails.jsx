import React, { Fragment,Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import useApi from 'shared/hooks/api';
import  api from 'shared/utils/api';
import { PageError, PageLoader, CopyLinkButton, Button, AboutTooltip } from 'shared/components';
import { TopActions, TopActionsRight, TopActionsLeft, Content, Left, Right, Full } from 'shared/components/Form/FormCommonStyle';
import Delete from './TemplateDelete';
import TemplateForm from './TemplateForm';
import DragDropForm from './TemplateDragDropForm';
import TemplateDetailList from './TemplateDetailList';
import TemplateAddStep from './TemplateAddStep';

import DeleteDetail from './TemplateDetailDelete';
import { render } from 'react-dom';


const propTypes = {
  templateId: PropTypes.string.isRequired,
  modalClose: PropTypes.func,
};

const TemplateDetails = ({
  templateId,
  modalClose,
}) => {
  const [fetchTemplate] = useApi.get(`/templates/${templateId}`,  { lazy: true });
  const [{ data, error ,setLocalData }, fetchDetails] = useApi.get(`/templateDetails/template/${templateId}`, { lazy:true});

  const detailList=get(data,"details", []);
  const template = get(fetchTemplate.data, 'template' );


  if (error) return <PageError />;

  const updateDetailList=()=>
  {
      fetchDetails();
  };


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

  const deleteTemplateDetail = templateDetailId => {

  };

  const deleteTemplateDeleteByProcedure = ({templateId, procedureId}) => {

  };


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
          <Delete template={template} modalClose={modalClose} />
          {modalClose &&  <Button icon="close" iconSize={24} variant="empty" onClick={modalClose} />}
        </TopActionsRight>
      </TopActions>
      <Content>
        <Full>
          <TemplateForm
              template={template}
              updateTemplate={updateTemplate}
            />
        </Full>
        </Content>
        <Content>
          <Full>
            <TemplateAddStep 
              templateId={templateId}
              categoryId={template.CategoryId.toString()}
              fetchDetail={updateDetailList}
            />
          </Full>
        </Content>
        <Content>
        <Full>
        <TemplateDetailList
          detailList={detailList}
          fetchDetail={updateDetailList}
        />
        </Full>
      </Content>
    </Fragment>
  );
};

TemplateDetails.propTypes = propTypes;

export default TemplateDetails;
