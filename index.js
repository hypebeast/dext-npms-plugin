const got = require('got');

const ENDPOINT = 'https://api.npms.io/search';


module.exports = {
  keyword: 'npm',
  action: 'openurl',
  helper: {
    title: 'Search for packages in the npm registry',
    subtitle: 'Example: npm promise',
    icon: {
      path: './icon.png',
    }
  },
  execute: q => new Promise(resolve => {
    const opts = {
      query: {
        term: q,
      },
      json: true,
    };
    got(ENDPOINT, opts)
      .then(res => {
        if (res.body) {
          const items = res.body.results
            .map(i => Object.assign({}, {
              title: i.module.name,
              subtitle: i.module.description,
              arg: i.module.links.homepage || i.module.links.npm,
              text: {
                copy: `npm install ${i.module.name}`,
              },
              icon: {
                path: './icon.png',
              }
            }));
          resolve({ items });
        }
      });
  }),
};
