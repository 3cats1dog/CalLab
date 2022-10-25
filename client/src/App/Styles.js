import styled from 'styled-components';

import { sizes } from 'shared/utils/styles';

const paddingLeft = sizes.appSideBarWidth +  40; //sizes.secondarySideBarWidth +

export const ContentPage = styled.div`
  padding: 25px 32px 50px ${paddingLeft}px;

  @media (max-width: 1100px) {
    padding: 25px 20px 50px ${paddingLeft - 20}px;
  }
  @media (max-width: 999px) {
    padding-left: ${sizes.appNavBarLeftWidth + 20}px;
  }
`;
