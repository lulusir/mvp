import { defineConfig } from 'dumi';

export default defineConfig({
  title: '@lujs/mvp',
  mode: 'site',
  logo: 'logo.png',
  locales: [['zh-CN', '中文']],
  outputPath: 'docs-dist',
  publicPath: '/mvp-docs/',
  base: '/mvp-docs/'
  // more config: https://d.umijs.org/config
});
