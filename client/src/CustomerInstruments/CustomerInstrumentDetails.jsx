import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import useApi from 'shared/hooks/api';
import  api from 'shared/utils/api';
import { PageError, PageLoader, CopyLinkButton, Button, AboutTooltip } from 'shared/components';
import { TopActions, TopActionsRight, Content, Left, Right } from 'shared/components/Form/FormCommonStyle';
import Delete from './CustomerInstrumentDetailDelete';
import CustomerInstrumentForm from './CustomerInstrumentForm';

const propTypes = {
  instrumentId: PropTypes.string.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const CustomerInstrumentDetails = ({
  instrumentId,
  modalClose,
}) => {
  const [{ data, error ,setLocalData }, fetchCustomerInstrument] = useApi.get(`/customerInstruments/${instrumentId}`,  { lazy: true });
  //if (!data) return <Loader />;
  if (error) return <PageError />;


  const updateCustomerInstrumentDetails = fields =>
  setLocalData(currentData => ({ customerInstrument: { ...currentData.customerInstrument, ...fields } }));

  const updateCustomerInstrument = updatedFields => {
    api.optimisticUpdate(`/customerInstruments/${instrumentId}`, {
      updatedFields,
      currentFields: customerInstrument,
      setLocalData: fields => {
        updateCustomerInstrumentDetails(fields);
        updateCustomerInstrumentDetails(customerInstrument.InstrumentId, fields);
      },
    });
  };

  const customerInstrument = get(data, 'instrument' );
  if (!customerInstrument) return <PageLoader />;
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
          <Delete customerInstrument={customerInstrument} modalClose={modalClose} />
          <Button icon="close" iconSize={24} variant="empty" onClick={modalClose} />
        </TopActionsRight>
      </TopActions>
      <Content>
        <Left>
          <CustomerInstrumentForm
            customerInstrument={customerInstrument}
            updateCustomerInstrument={updateCustomerInstrument}
          />
        </Left>
      </Content>
    </Fragment>
  );
};

CustomerInstrumentDetails.propTypes = propTypes;

export default CustomerInstrumentDetails;
