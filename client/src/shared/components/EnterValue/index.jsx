import { Fragment } from "react";
import PropTypes from 'prop-types';
import { Form  } from 'shared/components';
import {
    SelectItem,
    SelectItemLabel,
  } from 'shared/components/Form/FormCommonStyle';

import {
    ScaleType,
    ScaleTypeCopy,
    } from 'shared/constants/calibrationdatas'




const propTypes = {
    nameInput: PropTypes.string.isRequired,
    labelInput:PropTypes.string.isRequired,
    classNameInput:PropTypes.string.isRequired,
    nameSelect: PropTypes.string.isRequired,
    labelSelect:PropTypes.string.isRequired,
    classNameSelect:PropTypes.string.isRequired,
};

const defaultTypes ={
    nameInput: "InputText",
    labelInput:"Enter Value",
    classNameInput:"",
    nameSelect: "Scale",
    labelSelect: "Scale",
    classNameSelect:"",
}

const EnterValue =({
    nameInput,
    labelInput,
    classNameInput,
    nameSelect,
    labelSelect,
    classNameSelect,
}) => {

    
return (
    <Fragment>
    <Form.Field.Input
          className={classNameInput}
          name={nameInput}
          label={labelInput}
        />
    <Form.Field.Select
          className={classNameSelect}
          name={nameSelect}
          label={labelSelect}
          options={scaleOptions}
          withClearValue={false}
          renderOption={scaleTag}
          renderValue={scaleTag}
        />
    </Fragment>
)};

const scaleOptions = Object.values(ScaleType).map(scale => ({
    value: scale,
    label: ScaleTypeCopy[scale],
  }));
  
  const scaleTag = ({ value: scale }) => (
    <SelectItem>
      <SelectItemLabel>{ScaleTypeCopy[scale]}</SelectItemLabel>
    </SelectItem>
);

EnterValue.propTypes = propTypes;
EnterValue.defaultTypes= defaultTypes;

export default EnterValue;
