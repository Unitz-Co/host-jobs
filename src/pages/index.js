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

import PageData from '../data/PageDataQuery';

const HomeIndex = withPageContext((props) => {
  const allNodes = useStaticQuery(GbCtfJobsQuery);
  provideData('jobs', _.get(allNodes, 'allContentfulJobPost.nodes', []));
  return (
    <App>
      <Layout location={props.location} PageData={PageData}>
        <DIV>
          <SEO pageData={ctx.apply('ctf.findPage', { name: 'Homepage' })} />
          <Layout.POS name="app-header">{ctx.apply('ctf.renderSection', { name: 'articleNavbarSection' })}</Layout.POS>
          <Layout.POS name="app-body">
            <JobsPage />
          </Layout.POS>
          <Layout.POS name="app-footer">{ctx.apply('ctf.renderSection', { name: 'articleFooterSection' })}</Layout.POS>
        </DIV>
      </Layout>
    </App>
  );
});
export default HomeIndex;

const GbCtfJobsQuery = graphql`
  query jobsQuery {
    allContentfulJobPost(filter: { node_locale: { eq: "en-US" } }) {
      nodes {
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
