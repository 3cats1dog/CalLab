import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import useApi from 'shared/hooks/api';
import  api from 'shared/utils/api';
import { PageError, PageLoader, CopyLinkButton, Button, AboutTooltip } from 'shared/components';
import { TopActions, TopActionsRight, Content, Left, Right, Full } from 'shared/components/Form/FormCommonStyle';
import Delete from './LabInstrumentDetailDelete';
import LabInstrumentForm from './LabInstrumentForm';

const propTypes = {
  LabInstrId: PropTypes.string.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const LabInstrumentDetails = ({
  LabInstrId,
  modalClose,
}) => {
  const [{ data, error ,setLocalData }, fetchLabInstrument] = useApi.get(`/labinstruments/${LabInstrId}`,  { lazy: true });
  //if (!data) return <Loader />;
  if (error) return <PageError />;


  const updateLabInstrumentDetails = fields =>
  setLocalData(currentData => ({ labInstrument: { ...currentData.labInstrument, ...fields } }));

  const updateLabInstrument = updatedFields => {
    api.optimisticUpdate(`/labinstruments/${LabInstrId}`, {
      updatedFields,
      currentFields: labInstrument,
      setLocalData: fields => {
        updateLabInstrumentDetails(fields);
        updateLabInstrumentDetails(labInstrument.LabInstrId, fields);
      },
    });
  };

  const labInstrument = get(data, 'labInstrument' );
  if (!labInstrument) return <PageLoader />;
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
          <Delete labInstrument={labInstrument} modalClose={modalClose} />
          <Button icon="close" iconSize={24} variant="empty" onClick={modalClose} />
        </TopActionsRight>
      </TopActions>
      <Content>
        <Full>
          <LabInstrumentForm
            labInstrument={labInstrument}
            updateLabInstrument={updateLabInstrument}
          />
        </Full>
      </Content>
    </Fragment>
  );
};

LabInstrumentDetails.propTypes = propTypes;

export default LabInstrumentDetails;
