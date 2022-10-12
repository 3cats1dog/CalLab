import styled from 'styled-components';

import { sizes } from 'shared/utils/styles';

const paddingLeft = sizes.appNavBarLeftWidth + sizes.secondarySideBarWidth + 40;

export const SettingsPage = styled.div`
  padding: 25px 32px 50px ${paddingLeft}px;

  @media (max-width: 1100px) {
    padding: 25px 20px 50px ${paddingLeft - 20}px;
  }
  @media (max-width: 999px) {
    padding-left: ${paddingLeft - 20 - sizes.secondarySideBarWidth}px;
  }
`;

export const Content = styled.div`
  display: flex;
  padding: 0 30px 60px;
`;

export const Full = styled.div`
  width: 100%;
  padding-right: 50px;
`;


export const Left = styled.div`
  width: 35%;
  padding-right: 50px;
`;

export const Right = styled.div`
  width: 65%;
  padding-top: 5px;
`;