import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { PageError } from 'shared/components';

const propTypes = {
  procedure: PropTypes.object.isRequired,
};

const Fonts = ({ size, text, maxlimit}) => (
  <div style={{ fontSize: size }}>
    { ((text).length < maxlimit) ? text :
        (((text).substring(0,maxlimit-3)) + '...')  
        }
  </div>
);


const ProcedureCard = ({  procedure,}) => {
  if (!procedure) return <Fragment>No Procedure</Fragment>;

  return (
    <Fragment>
      {procedure.Name}
      <br />
      <Fonts 
        size="small"
        text= {procedure.Description}
        maxlimit={50}
      />
    </Fragment>
  );
};

ProcedureCard.propTypes = propTypes;

export default ProcedureCard;
