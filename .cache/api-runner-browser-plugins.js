module.exports = [{
      plugin: require('../node_modules/gatsby-theme-material-ui-top-layout/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-material-ui/gatsby-browser.js'),
      options: {"plugins":[],"stylesProvider":{"injectFirst":true}},
    },{
      plugin: require('../node_modules/gatsby-plugin-mdx/gatsby-browser.js'),
      options: {"plugins":[],"remarkPlugins":[null],"extensions":[".mdx"],"defaultLayouts":{},"gatsbyRemarkPlugins":[],"lessBabel":false,"rehypePlugins":[],"mediaTypes":["text/markdown","text/x-markdown"],"root":"/Users/brandontripp/Documents/Programming /PersonalProjects/open-legend-old-site/openlegendrpg.com"},
    },{
      plugin: require('../node_modules/gatsby-plugin-image/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"Open Legend, Open-Source RPG ","short_name":"OpenLegend RPG","start_url":"/","background_color":"#663399","theme_color":"#663399","display":"minimal-ui","icon":"src/icons/favicon-32x32.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"8f869e9bb0f5e7a81683b19d4f6e0633"},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
