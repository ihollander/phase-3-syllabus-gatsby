import React from 'react';
import styled from 'styled-components';
import { MDXProvider } from '@mdx-js/react';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';

import { MonacoProvider } from './sandbox/context';
import ThemeProvider from './theme/themeProvider';
import mdxComponents from './mdxComponents';
import Sidebar from './sidebar';
import RightSidebar from './rightSidebar';
import config from '../../config.js';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.background};

  .sideBarUL li a {
    color: ${({ theme }) => theme.colors.text};
  }

  .sideBarUL .item > a:hover {
    background-color: #1ed3c6;
    color: #fff !important;
  }

  @media only screen and (max-width: 767px) {
    display: block;
  }
`;

const Content = styled.section`
  display: flex;
  flex-grow: 1;
  margin: 0px 88px;
  padding-top: 3rem;
  background: ${({ theme }) => theme.colors.background};

  table tr {
    background: ${({ theme }) => theme.colors.background};
  }

  @media only screen and (max-width: 1023px) {
    padding-left: 0;
    margin: 0 10px;
    padding-top: 3rem;
  }
`;

const MaxWidth = styled.div`
  width: 100%;
  @media only screen and (max-width: 50rem) {
    width: 100%;
    position: relative;
  }
`;

const LeftSideBarWidth = styled.div`
  width: 298px;
`;

const RightSideBarWidth = styled.div`
  width: 224px;
`;

const queryCache = new QueryCache();

const Layout = ({ children, location }) => (
  <ThemeProvider location={location}>
    <MDXProvider components={mdxComponents}>
      <MonacoProvider>
        <ReactQueryCacheProvider queryCache={queryCache}>
          <Wrapper>
            <LeftSideBarWidth className={'hiddenMobile'}>
              <Sidebar location={location} />
            </LeftSideBarWidth>
            {config.sidebar.title ? (
              <div
                className={'sidebarTitle sideBarShow'}
                dangerouslySetInnerHTML={{ __html: config.sidebar.title }}
              />
            ) : null}
            <Content>
              <MaxWidth>{children}</MaxWidth>
            </Content>
            <RightSideBarWidth className={'hiddenMobile'}>
              <RightSidebar location={location} />
            </RightSideBarWidth>
          </Wrapper>
        </ReactQueryCacheProvider>
      </MonacoProvider>
    </MDXProvider>
  </ThemeProvider>
);

export default Layout;
