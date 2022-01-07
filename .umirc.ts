import { defineConfig } from 'dumi';

export default defineConfig({
  title: '@lujs/mvp',
  mode: 'site',
  logo: 'logo.png',
  locales: [['zh-CN', '中文']],
  outputPath: 'mvp-docs',
  publicPath: '/mvp-docs/',
  base: '/mvp-docs/'
  // more config: https://d.umijs.org/config
});
