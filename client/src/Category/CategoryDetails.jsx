import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import useApi from 'shared/hooks/api';
import  api from 'shared/utils/api';
import { PageError, PageLoader, CopyLinkButton, Button, AboutTooltip } from 'shared/components';
import { TopActions, TopActionsRight, Content, Left, Right, Full } from 'shared/components/Form/FormCommonStyle';
import Delete from './CategoryDetailDelete';
import CategoryForm from './CategoryForm';

const propTypes = {
  categoryId: PropTypes.string.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const CategoryDetails = ({
  categoryId,
  modalClose,
}) => {
  const [{ data, error ,setLocalData }, fetchCategory] = useApi.get(`/categorys/${categoryId}`,  { lazy: true });
  //if (!data) return <Loader />;
  if (error) return <PageError />;


  const updateCategoryDetails = fields =>
  setLocalData(currentData => ({ category: { ...currentData.category, ...fields } }));

  const updateCategory = updatedFields => {
    api.optimisticUpdate(`/categorys/${categoryId}`, {
      updatedFields,
      currentFields: category,
      setLocalData: fields => {
        updateCategoryDetails(fields);
        updateCategoryDetails(category.CategoryId, fields);
      },
    });
  };

  const category = get(data, 'category' );
  if (!category) return <PageLoader />;
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
          <Delete category={category} modalClose={modalClose} />
          <Button icon="close" iconSize={24} variant="empty" onClick={modalClose} />
        </TopActionsRight>
      </TopActions>
      <Content>
        <Full>
          <CategoryForm
            category={category}
            updateCategory={updateCategory}
          />
        </Full>
      </Content>
    </Fragment>
  );
};

CategoryDetails.propTypes = propTypes;

export default CategoryDetails;
