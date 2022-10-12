import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import useApi from 'shared/hooks/api';
import { get, isUndefined } from 'lodash';
import  Select from 'shared/components/Select';
import 'shared/components/Form/customForm.css';


const propTypes = {
  selectCategory:PropTypes.func.isRequired,
  category:PropTypes.object,
};


const CategoryFilter = ( { selectCategory, category }) => {

const [{data}, fetchCategory] = useApi.get(`/categorys`, { layz:true});

const categoryList=get(data,"categorys", []);

 

const categoryOptions=categoryList.map(category =>({
    value: category.CategoryId,
    label: category.Name,
}));


const OnChange=(e) => {
    if (isUndefined(e)) return;
    if (e==0) return;
    const selectedCategory = categoryList.find((row) => row.CategoryId === e);
    selectCategory(selectedCategory);
}

return(
    <Select
        name="CategoryId"
        label="Category"
        className='FilterItemRight'
        options={categoryOptions} 
        value={category?.CategoryId}
        placeholder='Select Category'
        onChange={OnChange}
    />
);

};


CategoryFilter.propTypes=propTypes;

export default CategoryFilter;