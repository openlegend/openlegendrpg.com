var plugins = [{
      name: 'gatsby-plugin-react-helmet',
      plugin: require('/Users/brandontripp/Documents/Programming /PersonalProjects/open-legend-old-site/openlegendrpg.com/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      name: 'gatsby-theme-material-ui-top-layout',
      plugin: require('/Users/brandontripp/Documents/Programming /PersonalProjects/open-legend-old-site/openlegendrpg.com/node_modules/gatsby-theme-material-ui-top-layout/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      name: 'gatsby-plugin-material-ui',
      plugin: require('/Users/brandontripp/Documents/Programming /PersonalProjects/open-legend-old-site/openlegendrpg.com/node_modules/gatsby-plugin-material-ui/gatsby-ssr'),
      options: {"plugins":[],"stylesProvider":{"injectFirst":true}},
    },{
      name: 'gatsby-plugin-webfonts',
      plugin: require('/Users/brandontripp/Documents/Programming /PersonalProjects/open-legend-old-site/openlegendrpg.com/node_modules/gatsby-plugin-webfonts/gatsby-ssr'),
      options: {"plugins":[],"fonts":{"google":[{"family":"Roboto","variants":["300","400","500"]}]}},
    },{
      name: 'gatsby-plugin-mdx',
      plugin: require('/Users/brandontripp/Documents/Programming /PersonalProjects/open-legend-old-site/openlegendrpg.com/node_modules/gatsby-plugin-mdx/gatsby-ssr'),
      options: {"plugins":[],"remarkPlugins":[null],"extensions":[".mdx"],"defaultLayouts":{},"gatsbyRemarkPlugins":[],"lessBabel":false,"rehypePlugins":[],"mediaTypes":["text/markdown","text/x-markdown"],"root":"/Users/brandontripp/Documents/Programming /PersonalProjects/open-legend-old-site/openlegendrpg.com"},
    },{
      name: 'gatsby-plugin-image',
      plugin: require('/Users/brandontripp/Documents/Programming /PersonalProjects/open-legend-old-site/openlegendrpg.com/node_modules/gatsby-plugin-image/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      name: 'gatsby-plugin-manifest',
      plugin: require('/Users/brandontripp/Documents/Programming /PersonalProjects/open-legend-old-site/openlegendrpg.com/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"Open Legend, Open-Source RPG ","short_name":"OpenLegend RPG","start_url":"/","background_color":"#663399","theme_color":"#663399","display":"minimal-ui","icon":"src/icons/favicon-32x32.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"8f869e9bb0f5e7a81683b19d4f6e0633"},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    try {
      const result = plugin.plugin[api](args, plugin.options)
      if (result && argTransform) {
        args = argTransform({ args, result })
      }
      return result
    } catch (e) {
      if (plugin.name !== `default-site-plugin`) {
        // default-site-plugin is user code and will print proper stack trace,
        // so no point in annotating error message pointing out which plugin is root of the problem
        e.message += ` (from plugin: ${plugin.name})`
      }

      throw e
    }
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
