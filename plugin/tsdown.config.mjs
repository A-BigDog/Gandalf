/**
 * Gandalf theme — tsdown build config.
 *
 * Emits the node half (lib/index.js) and the browser client bundle
 * (lib/client.js) in the exact shape the DSH client-module loader expects:
 * a closure-factory artifact handed to `window.__ModuleLoader__.load({ id, factory })`,
 * with platform modules kept external (answered by the loader module table).
 *
 * Mirror of packages/client/tsdown.client.ts rules for a package living
 * outside the workspace tree (pure object config, no imports).
 */
const PLATFORM_EXTERNALS = [
  'react',
  'react/jsx-runtime',
  'react-dom',
  'react-dom/client',
  '@deepseek-ai/cordis',
  '@deepseek-ai/dsh-client-ui-slots',
  '@deepseek-ai/dsh-client-web-react',
  '@deepseek-ai/dsh-client-ui-primitives',
  '@deepseek-ai/dsh-client-ui-attachment',
  '@deepseek-ai/dsh-client-schema-form',
  // Runtime store exemption + the theme service's types/packages.
  '@deepseek-ai/dsh-client-runtime/client',
  '@deepseek-ai/dsh-client-ui-theme',
  '@deepseek-ai/dsh-client-ui-theme/client',
  '@deepseek-ai/dsh-client-runtime',
]

export default [
  // ---- Node half (host loader entry) ----
  {
    name: 'gandalf-theme',
    entry: { index: 'src/index.ts' },
    outDir: 'lib',
    format: ['esm'],
    platform: 'node',
    target: 'es2024',
    fixedExtension: false,
    dts: false,
    clean: false,
  },
  // ---- Browser client bundle (client-module artifact) ----
  {
    name: 'gandalf-theme/client',
    entry: { client: 'src/client/index.ts' },
    outDir: 'lib',
    format: 'cjs',
    platform: 'browser',
    target: 'es2024',
    dts: false,
    sourcemap: true,
    clean: false,
    external: PLATFORM_EXTERNALS,
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'production'),
      'import.meta.env.MODE': JSON.stringify(process.env.NODE_ENV ?? 'production'),
      'import.meta.env': JSON.stringify({ MODE: process.env.NODE_ENV ?? 'production' }),
    },
    outputOptions: {
      entryFileNames: 'client.js',
      banner: "window.__ModuleLoader__.load({ id: 'gandalf-theme', factory: (require) => {",
      footer: 'return module.exports; } });',
      intro: 'var module = { exports: {} }; var exports = module.exports;',
    },
  },
]
