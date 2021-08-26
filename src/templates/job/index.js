import React from 'react';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';

import App from '@uz/unitz-app-web/JobApp';
import SEO from '@uz/unitz-layout-web/SEO';

import Layout from '@uz/unitz-layout-web/LayoutMain';
import JobDetail from '@uz/unitz-pages/JobDetail';
import withPageContext from '@uz/unitz-pages/withPageContext';
import useRoute from '@vl/hooks/useGbRoute';
import _ from 'lodash';

import PageData from '../../data/PageDataQuery';

export const component = withPageContext((props) => {
  const pageContext = useRoute().getPageContext();
  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          <SEO
            pageData={{
              ...ctx.apply('ctf.findPage', { name: 'Homepage' }),
              seoTitle: `Unitz - ${_.map(_.get(pageContext, 'params.categories'), 'displayName').join()} ${_.get(
                pageContext,
                'params.displayName'
              )}`,
              seoMetaDescription: {
                seoMetaDescription: `${_.get(pageContext, 'params.displayName')}`,
              },
            }}
          />
          <Layout.POS name="app-header">{ctx.apply('ctf.renderSection', { name: 'articleNavbarSection' })}</Layout.POS>
          <Layout.POS name="app-body">
            <JobDetail />
          </Layout.POS>
          <Layout.POS name="app-footer">{ctx.apply('ctf.renderSection', { name: 'articleFooterSection' })}</Layout.POS>
        </DIV>
      </Layout>
    </App>
  );
});

export default component;
