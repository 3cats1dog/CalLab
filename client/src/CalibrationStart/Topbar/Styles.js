import styled from 'styled-components';

import { color, sizes, font, mixin, zIndexValues } from 'shared/utils/styles';
import { style } from '@mui/system';

export const Topbar = styled.div`
  position: fixed;
  z-index: ${zIndexValues.navLeft - 1};
  top: 0;
  /*height: 50px;*/
  width: 80%;
  padding: 0 10px 5px;
  background: ${color.backgroundLightTopMenu};
  border: 1px solid ${color.borderLightest};
  ${mixin.scrollableY}
  ${mixin.customScrollbar()}
  @media (max-width: 1100px) {
    width:80%;
  }
  @media (max-width: 999px) {
    display: none;
  }
`;

export const CalibrationInfo = styled.div`
  display: flex;
  float:left;
  padding: 4px 50px 4px 4px;
`;

export const CalibrationTexts = styled.div`
  padding: 3px 0 0 10px;
`;

export const CalibraionCustomer = styled.div`
  color: ${color.textDark};
  ${font.size(15)};
  ${font.medium};
`;

export const CalibrationDevice = styled.div`
  color: ${color.textMedium};
  ${font.size(13)};
`;

export const LinkItemHolder=styled.div`
  float:right;
`;

export const LinkItem = styled.div`
  position: relative;
  display: flex;
  padding: 15px 12px;
  border-radius: 3px;
  max-width:200px;
  float:left;
  ${mixin.clickable}
  ${props =>
    !props.to ? `cursor: not-allowed;` : `&:hover { background: ${color.backgroundLight}; }`}
  i {
    margin-right: 15px;
    font-size: 20px;
  }
  &.active {
    color: ${color.primary};
    background: ${color.backgroundLight};
    i {
      color: ${color.primary};
    }
  }
`;

export const LinkText = styled.div`
  padding-top: 2px;
  ${font.size(14.7)};
`;

export const NotImplemented = styled.div`
  display: inline-block;
  position: absolute;
  top: 10px;
  left: 0px;
  width: 140px;
  padding: 5px 0 5px 8px;
  border-radius: 3px;
  text-transform: uppercase;
  color: ${color.textDark};
  background: ${color.backgroundMedium};
  opacity: 0;
  ${font.size(11.5)};
  ${font.bold}
  ${LinkItem}:hover & {
    opacity: 1;
  }
`;
