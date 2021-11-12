import React from 'react';

import { ctx } from '@vl/redata';
import DIV from '@vl/redata/DIV.macro';

import JobsPage from '@uz/unitz-pages/Jobs';
import withPageContext, { provideData } from '@uz/unitz-pages/withPageContext';
import App from '@uz/unitz-app-web/JobApp';

import Layout from '@uz/unitz-layout-web/LayoutMain';
import SEO from '@uz/unitz-layout-web/SEO';

import { graphql, useStaticQuery } from 'gatsby';
import _ from 'lodash';
import useRoute from '@vl/hooks/useGbRoute';

import PageData from '../data/PageDataQuery';

const HomeIndex = withPageContext((props) => {
  const route = useRoute();
  const pageContext = route.getPageContext();
  const allNodes = useStaticQuery(GbCtfJobsQuery);
  provideData('jobs', _.filter(_.get(allNodes, 'allContentfulJobPost.nodes', []), { node_locale: pageContext.locale }));
  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          <SEO pageData={ctx.apply('ctf.findPage', { name: 'Jobspage' })} />
          <Layout.POS name="app-header">{ctx.apply('ctf.renderSection', { name: 'articleNavbarSection' })}</Layout.POS>
          <Layout.POS name="app-body">
            <JobsPage />
          </Layout.POS>
          <Layout.POS name="app-footer">{ctx.apply('ctf.renderSection', { name: 'JobFooterSection' })}</Layout.POS>
        </DIV>
      </Layout>
    </App>
  );
});
export default HomeIndex;

const GbCtfJobsQuery = graphql`
  query jobsQuery {
    allContentfulJobPost {
      nodes {
        node_locale
        id: contentful_id
        displayName
        slug
        longText {
          longText
        }
        categories {
          ... on ContentfulCategory {
            id: contentful_id
            displayName
            slug
            sys {
              type
              contentType {
                sys {
                  type
                  linkType
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;
