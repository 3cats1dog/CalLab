import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import useApi from 'shared/hooks/api';
import  api from 'shared/utils/api';
import { PageError, PageLoader, CopyLinkButton, Button, AboutTooltip } from 'shared/components';
import { TopActions, TopActionsRight, TopActionsLeft, Content, Left, Right, Full } from 'shared/components/Form/FormCommonStyle';
import Delete from './ProcedureDetailDelete';
import ProcedureForm from './ProcedureForm';

const propTypes = {
  ProcedureId: PropTypes.string.isRequired,
  modalClose: PropTypes.func.isRequired,
  categroyList:PropTypes.array.isRequired,
};

const ProcedureDetails = ({
  ProcedureId,
  modalClose,
  categroyList,
}) => {
  
  const [{ data, error ,setLocalData }, fetchProcedure] = useApi.get(`/procedures/${ProcedureId}`,  { lazy: true });
  //if (!data) return <Loader />;
  if (error) return <PageError />;


  const updateProcedureDetails = fields =>
  setLocalData(currentData => ({ procedure: { ...currentData.procedure, ...fields } }));

  const updateProcedure = updatedFields => {
    api.optimisticUpdate(`/procedures/${ProcedureId}`, {
      updatedFields,
      currentFields: procedure,
      setLocalData: fields => {
        updateProcedureDetails(fields);
        updateProcedureDetails(procedure.ProcedureId, fields);
      },
    });
  };

  const procedure = get(data, 'procedure' );
  if (!procedure) return <PageLoader />;
  return (
    <Fragment>
      <TopActions>
        <TopActionsLeft>
            ProcedureId : {ProcedureId}
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
          <Delete procedure={procedure} modalClose={modalClose} />
          <Button icon="close" iconSize={24} variant="empty" onClick={modalClose} />
        </TopActionsRight>
      </TopActions>
      <Content>
        <Full>
          <ProcedureForm
            procedure={procedure}
            updateProcedure={updateProcedure}
            categroyList={categroyList}
          />
        </Full>
      </Content>
    </Fragment>
  );
};

ProcedureDetails.propTypes = propTypes;

export default ProcedureDetails;
