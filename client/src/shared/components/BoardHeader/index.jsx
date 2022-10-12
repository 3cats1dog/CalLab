import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'shared/components';

import { Header, BoardName } from './Styles';

const propTypes = {
  name: PropTypes.string.isRequired,
  icontype: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  linkText:PropTypes.string.isRequired,
  showInsert:PropTypes.bool.isRequired,
};

const BoardHeader = ({name, icontype, onClick,linkText, showInsert}) => (
  <Header>
    <BoardName>{name}</BoardName>
    {showInsert && (
    <a  onClick={onClick} >
      <Button icon={`${icontype}`}>{linkText}</Button>
    </a>
    )}
    </Header>
);
BoardHeader.propTypes=propTypes;

export default BoardHeader;
