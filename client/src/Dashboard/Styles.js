import styled from 'styled-components';

import { sizes } from 'shared/utils/styles';

const paddingLeft = sizes.dashBoardSideBarWidth +  40; //sizes.secondarySideBarWidth +

export const DashboardPage = styled.div`
  padding: 25px 32px 50px ${paddingLeft}px;

  @media (max-width: 1100px) {
    padding: 25px 20px 50px ${paddingLeft - 20}px;
  }
  @media (max-width: 999px) {
    padding-left: ${paddingLeft - 20 - sizes.secondarySideBarWidth}px;
  }
`;
