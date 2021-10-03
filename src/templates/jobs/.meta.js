const path = require('path');
const _ = require('lodash');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');
const { withLocale } = require('@uz/mod-translations/utils');

exports.createPages = withLocale(async function(item, gatsby) {
  const localeConfig = this;
  // @update query
  const allNodes = await gatsby.graphql(`
  query categoriesQuery {
    allContentfulCategory(filter: { node_locale: { eq: "${localeConfig.get('locale')}" } }) {
      nodes {
        id: contentful_id
        displayName
        avatarUrl {
          id
        }
        slug
        icon
        images {
          fixed(width: 1600) {
            width
            height
            src
            srcSet
          }
        }
        image {
          fixed(width: 1600) {
            width
            height
            src
            srcSet
          }
        }
        children: chidlren {
          ... on ContentfulCategory {
            id: contentful_id
          }
        }
      }
    }
    allContentfulJobPost(filter: { node_locale: { eq: "${localeConfig.get('locale')}" } }) {
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
  }`);

  const categories = _.get(allNodes, 'data.allContentfulCategory.nodes', []);
  const jobs = _.get(allNodes, 'data.allContentfulJobPost.nodes', []);

  return Promise.all(
    categories.map((cat) => {
      const catSlug = routeStore.toUrl('jobs-by-category', cat);
      const catPath = localeConfig.langSlug(path.join('/', catSlug));
      console.log('creating page', catPath);

      return gatsby.actions.createPage({
        path: catPath,
        component: item.resolvers.component(gatsby),
        context: _.cloneDeep({
          id: _.get(cat, 'id', 'id'),
          slug: catSlug,
          lang: localeConfig.get('lang'),
          params: {
            jobs: jobs,
            ...cat,
          },
        }),
      });
    })
  );
});
