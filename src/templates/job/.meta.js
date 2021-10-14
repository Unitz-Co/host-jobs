const path = require('path');
const _ = require('lodash');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const { withLocale } = require('@uz/mod-translations/utils');

exports.createPages = withLocale(async function(item, gatsby) {
  const localeConfig = this;
  // @update query
  const allNodes = await gatsby.graphql(`
  query jobsQuery {
    allContentfulJobPost(filter: { node_locale: { eq: "${localeConfig.get('locale')}" } }) {
      nodes {
        id: contentful_id
        displayName
        slug
        longText {
          longText
        }
        image {
          fixed(width: 1600) {
            width
            height
            src
            srcSet
          }
        }
        description{
          raw
        } 
        categories {
          ... on ContentfulCategory {
            id
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
  }`);

  const jobs = _.get(allNodes, 'data.allContentfulJobPost.nodes', []);

  return Promise.all(
    jobs.map((job) => {
      const jobSlug = routeStore.toUrl('job', job);
      const jobPath = localeConfig.langSlug(path.join('/', jobSlug));
      console.log('creating page', jobPath);
      return gatsby.actions.createPage({
        path: jobPath,
        component: item.resolvers.component(gatsby),
        context: {
          id: _.get(job, 'id', 'id'),
          slug: jobSlug,
          lang: localeConfig.get('lang'),
          job,
          params: {
            ...job,
          },
        },
      });
    })
  );
});
