import path from "path";
import fs from "fs";

const buildManifest = (compiler, compilation) => {
  const context = compiler.options.context;
  const manifest = {};

  compilation.chunks.forEach(chunk => {
    chunk.files.forEach(file => {
      manifest[file] = chunk.modules
        .filter(module => module.libIdent)
        .map(module => ({
          id: module.id, // Corresponds to require.resolveWeak / webpackRequireWeakId
          name: module.libIdent({ context })
        }));
    });
  });

  return manifest;
};

class ManifestPlugin {
  constructor(options = {}) {
    this.filename = options.filename;
  }

  apply(compiler) {
    compiler.plugin("emit", (compilation, callback) => {
      const manifest = buildManifest(compiler, compilation);
      var json = JSON.stringify(manifest, null, 2);
      fs.writeFileSync(this.filename, json);

      callback();
    });
  }
}

module.exports = ManifestPlugin;
