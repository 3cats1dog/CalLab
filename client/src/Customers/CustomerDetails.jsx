import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import useApi from 'shared/hooks/api';
import  api from 'shared/utils/api';
import { PageError, PageLoader, CopyLinkButton, Button, AboutTooltip } from 'shared/components';
import { TopActions, TopActionsRight, Content, Left, Right } from 'shared/components/Form/FormCommonStyle';
import Delete from './CustomerDetailsDelete';
import CustomerForm from './CustomerForm';

const propTypes = {
  customerId: PropTypes.string.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const CustomerDetails = ({
  customerId,
  modalClose,
}) => {
  const [{ data, error ,setLocalData }, fetchCustomer] = useApi.get(`/customers/${customerId}`,  { lazy: true });
  //if (!data) return <Loader />;
  if (error) return <PageError />;


  const updateLocalCustomerDetails = fields =>
  setLocalData(currentData => ({ customer: { ...currentData.customer, ...fields } }));

  const updateCustomer = updatedFields => {
    api.optimisticUpdate(`/customers/${customerId}`, {
      updatedFields,
      currentFields: customer,
      setLocalData: fields => {
        updateLocalCustomerDetails(fields);
        updateLocalCustomerDetails(customer.CustomerId, fields);
      },
    });
  };

  const customer = get(data, 'customer' );
  if (!customer) return <PageLoader />;
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
          <Delete customer={customer} modalClose={modalClose} />
          <Button icon="close" iconSize={24} variant="empty" onClick={modalClose} />
        </TopActionsRight>
      </TopActions>
      <Content>
        <Left>
          <CustomerForm
            customer={customer}
            updateCustomer={updateCustomer}
          />
        </Left>
      </Content>
    </Fragment>
  );
};

CustomerDetails.propTypes = propTypes;

export default CustomerDetails;
