# Webpack Module Manifest Plugin

A Webpack plugin for generating a manifest with bundle filenames and module metadata for output.

That's it!

## Usage

In `webpack.config.js`

```javascript
const ManifestPlugin = require("webpack-module-manifest-plugin");

module.exports = {
  entry: "./src/index.js",
  plugins: [
    new ManifestPlugin({
      filename: "./build/client.manifest.json"
    })
  ]
}
```

This will generate a file that contains JSON data about your build.

```json
{
  "0.index.js": [
    {
      "name": "./src/components/c.js",
      "id": 87
    }
  ],
  "index.js": [
    {
      "name": "./node_modules/process/browser.js",
      "id": 0
    },
    {
      "name": "./node_modules/fbjs/lib/invariant.js",
      "id": 1
    },
  ]
}
```

## Options

* `filename` The filename to write the JSON data to.
