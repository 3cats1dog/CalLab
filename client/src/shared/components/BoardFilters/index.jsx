import React from 'react';
import PropTypes from 'prop-types';
import { xor } from 'lodash';

import {
  Filters,
  SearchInput,
  ClearAll,
} from './Styles';

const propTypes = {
  defaultFilters: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  mergeFilters: PropTypes.func.isRequired,
};

const BoardFilters = ({ defaultFilters, filters, mergeFilters }) => {
  const { searchTerm } = filters;

  const areFiltersCleared = !searchTerm ; // && userIds.length === 0 && !myOnly && !recent;

  return (
    <Filters data-testid="board-filters">
      <SearchInput
        icon="search"
        value={searchTerm}
        onChange={value => mergeFilters({ searchTerm: value })}
      />
      {!areFiltersCleared && (
        <ClearAll onClick={() => mergeFilters(defaultFilters)}>Clear all</ClearAll>
      )}
    </Filters>
  );
};

BoardFilters.propTypes = propTypes;

export default BoardFilters;
