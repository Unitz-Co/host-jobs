const _ = require('lodash');
const slugify = require('slugify');
const { routeStore } = require('@vl/mod-utils/gatsbyRouteStore');

routeStore.addRule('job', {
  url: (params) => {
    const slug = _.get(params, 'slug') || _.get(params, 'id') || _.get(params, 'displayName');
    return `/job/${_.toLower(slugify(slug))}`;
  },
  parse: (urlObject) => {
    const params = {};
    for (let param in urlObject.searchParams) {
      params[param] = urlObject.searchParams.get(param);
    }
    return params;
  },
  match: (urlObject) => {
    return urlObject.pathname === 'job';
  },
});
