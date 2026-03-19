import { defineConfig } from '@umijs/max';
import baseConfig from './.umirc.base';
import localConfig from './.umirc.local';

export default defineConfig({
  // 1. 首先继承 base 的所有基础配置（包含 routes, model, initialState 等）
  ...baseConfig,
  ...localConfig,

  // 2. 针对性覆盖或合并特定字段
  proxy: {
    ...baseConfig.proxy,
    ...localConfig.proxy,
  },
  locale: {
    ...baseConfig.locale,
    ...localConfig.locale,
  },
  antd: {
    ...baseConfig.antd,
    ...localConfig.antd,
  },
  //layout: {
  //  ...baseConfig.layout,
  //  ...localConfig.layout,
  //},
  layout: {
    title: 'Media Stream',
    layout: 'mix',
    fixedHeader: true,
    // 🚩 针对新版 ProLayout 的 Token 注入方式
    token: {
      sider: {
        width: 170, // 强制设置侧边栏宽度为 170
        colorMenuBackground: '#ffffff',
      },
      pageContainer: {
        paddingInlinePageContainerContent: 20, // 减少右侧内容区左右留白
        paddingBlockPageContainerContent: 16,  // 减少上下留白
      }
    },
  },
  
  // 但如果业务复杂，建议显式写出：
  routes: baseConfig.routes,
});
