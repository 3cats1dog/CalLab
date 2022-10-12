import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Container, Divider } from './Styles';

const propTypes = {
  items: PropTypes.array.isRequired,
  maxlimit:PropTypes.number,
};

const Breadcrumbs = ({ items, maxlimit }) =>
{
  if (!maxlimit)
  {
    maxlimit=1000;
  }

  return (
  <Container>
    {items.map((item, index) => (
      <Fragment key={item}>
        {index !== 0 && <Divider>/</Divider>}
        { ((item).length < maxlimit) ? item :
        (((item).substring(0,maxlimit-3)) + '...')  
        }
      </Fragment>
    ))}
  </Container>
)};

Breadcrumbs.propTypes = propTypes;

export default Breadcrumbs;
