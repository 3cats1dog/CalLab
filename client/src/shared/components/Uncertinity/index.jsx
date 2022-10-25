import React, { Fragment } from 'react';
import PropTypes, { number } from 'prop-types';
import {engineeringNotation, parseNumber, getUncertinityLimit} from 'shared/utils/engineerNotation';
import { Label } from './Styles';

const propTypes = {
  reading: PropTypes.string,
  range: PropTypes.string,
  resolution: PropTypes.string,
  dataType:PropTypes.object.isRequired,
};

/*
4.2 · 10⁻⁶ U + 4.7µV
*/
const Uncertinity = ({ reading,range,  resolution, dataType }) =>{

    /*
    if(!dataType) return "Empty datatype";
    if (!range) return "Empty range";
    if (!resolution) return "Empty resolution";
    if (!reading) return "Empty reading";
    */

    let errorNumber=0;
    let resNumber=0;
    if (reading) errorNumber += parseNumber(reading);
    if (range) errorNumber += parseNumber(range);
    if (resolution) resNumber += parseNumber(resolution);

    const txt=(errorNumber>0 ? engineeringNotation(errorNumber,1) + " " + dataType.Symbol : "") + (resNumber >0 ? ( errorNumber>0 ?  " + " : "" ) +  engineeringNotation(resNumber,0) + dataType.Unit : "");
    return (
        <Fragment>
        {txt}
        </Fragment>
  )};

Uncertinity.propTypes = propTypes;

export default Uncertinity;
