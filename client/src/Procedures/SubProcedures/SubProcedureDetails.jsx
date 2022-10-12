import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import useApi from 'shared/hooks/api';
import  api from 'shared/utils/api';
import { PageError, PageLoader, CopyLinkButton, Button, AboutTooltip } from 'shared/components';
import { TopActions, TopActionsRight, TopActionsLeft, Content, Left, Right } from 'shared/components/Form/FormCommonStyle';
import Delete from './SubProcedureDetailDelete';
import SubProcedureForm from './SubProcedureForm';

const propTypes = {
  SubProcedureId: PropTypes.string.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const SubProcedureDetails = ({
  SubProcedureId,
  modalClose,
}) => {
  const [{ data, error ,setLocalData }, fetchProcedure] = useApi.get(`/subprocedures/${SubProcedureId}`,  { lazy: true });
  //if (!data) return <Loader />;
  if (error) return <PageError />;


  const updateSubProcedureDetails = fields =>
  setLocalData(currentData => ({ subprocedure: { ...currentData.subprocedure, ...fields } }));

  const updateSubProcedure = updatedFields => {
    api.optimisticUpdate(`/subprocedures/${SubProcedureId}`, {
      updatedFields,
      currentFields: subprocedure,
      setLocalData: fields => {
        updateSubProcedureDetails(fields);
        updateSubProcedureDetails(subprocedure.SubProcedureId, fields);
      },
    });
  };

  const subprocedure = get(data, 'subprocedure' );
  if (!subprocedure) return <PageLoader />;
  return (
    <Fragment>
      <TopActions>
        <TopActionsLeft>
            SubProcedureId : {SubProcedureId}
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
          <Delete subprocedure={subprocedure} modalClose={modalClose} />
          <Button icon="close" iconSize={24} variant="empty" onClick={modalClose} />
        </TopActionsRight>
      </TopActions>
      <Content>
        <Left>
          <SubProcedureForm
            subprocedure={subprocedure}
            updateSubProcedure={updateSubProcedure}
          />
        </Left>
      </Content>
    </Fragment>
  );
};

SubProcedureDetails.propTypes = propTypes;

export default SubProcedureDetails;
