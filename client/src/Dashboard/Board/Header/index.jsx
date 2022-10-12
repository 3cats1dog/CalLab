import React from 'react';

import { Button } from 'shared/components';

import { Header, BoardName } from './Styles';

const DashBoardHeader = () => (
  <Header>
    <BoardName>DashBoard</BoardName>
    <a href="https://github.com/oldboyxx/jira_clone" target="_blank" rel="noreferrer noopener">
      <Button icon="github">Github Repo</Button>
    </a>
  </Header>
);

export default DashBoardHeader;
