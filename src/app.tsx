import {
  CloudUploadOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  MoonOutlined,
  SunOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { SelectLang, history } from '@umijs/max';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { Button, Space, Input, ConfigProvider, theme } from 'antd';
import React, { useEffect } from 'react';

/**
 * 初始状态保持不变
 */
export async function getInitialState(): Promise<{ name: string; darkTheme: boolean }> {
  return {
    name: 'Media Stream User',
    darkTheme: false
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  const isDark = initialState?.darkTheme;

  return {
    title: 'Media Stream',
    layout: 'mix',
    splitMenus: false,
    navTheme: isDark ? 'realDark' : 'light',
    colorPrimary: '#5bd1d7',

    // 🚩 保持窄侧边栏配置
    siderWidth: 160,
    menuHeaderRender: () => <div style={{ height: 10 }} />,

    // 1. 顶部左侧 Logo（保持你原本的设计）
    headerTitleRender: () => (
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
        onClick={() => history.push('/')}
      >
        <img
          src={isDark ? '/logo_white.svg' : '/logo_black.svg'}
          alt="logo"
          style={{ height: 28 }}
        />
        <span style={{ fontSize: 18, fontWeight: 'bold', color: isDark ? '#fff' : '#000' }}>
          Media Stream
        </span>
      </div>
    ),

    // 🚩 彻底隐藏侧边栏默认 Header（防止 Logo 重复）
    menuHeaderRender: false,

    // 2. 顶部居中大搜索框（保持你原本的设计）
    headerContentRender: () => (
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '0 24px' }}>
        <Input.Search
          placeholder="Search videos, channels, and people"
          allowClear
          style={{ maxWidth: 600, width: '100%' }}
          size="large"
          onSearch={(value) => console.log('Searching for:', value)}
        />
      </div>
    ),

    // 3. 顶部右侧操作区（补回消失的按钮、明暗切换、登录注册）
    rightContentRender: () => (
      <Space size={4} style={{ marginRight: 16, display: 'flex', alignItems: 'center' }}>
        <Button
          type="text"
          icon={<CloudUploadOutlined style={{ fontSize: 20 }} />}
          style={{ color: isDark ? '#fff' : '#595959' }}
          onClick={() => window.dispatchEvent(new CustomEvent('open-upload-modal'))}
        />
        <Button
          type="text"
          icon={<SettingOutlined style={{ fontSize: 20 }} />}
          style={{ color: isDark ? '#fff' : '#595959' }}
        />
        <Button
          type="text"
          icon={<QuestionCircleOutlined style={{ fontSize: 20 }} />}
          style={{ color: isDark ? '#fff' : '#595959' }}
        />

        <SelectLang
          icon={
            <Button
              type="text"
              icon={<GlobalOutlined style={{ fontSize: 20 }} />}
              style={{ color: isDark ? '#fff' : '#595959', padding: 0 }}
            />
          }
        />

        <Button
          type="text"
          icon={isDark ? <SunOutlined style={{ color: '#faad14' }} /> : <MoonOutlined />}
          style={{ fontSize: 20, color: isDark ? '#faad14' : '#595959' }}
          onClick={() => {
            setInitialState((pre) => ({
              ...pre!,
              darkTheme: !pre?.darkTheme,
            }));
          }}
        />

        <Space size={8} style={{ marginLeft: 12 }}>
          <Button type="text" style={{ color: '#5bd1d7', fontWeight: 'bold' }}>Log In</Button>
          <Button
            type="primary"
            style={{
              borderRadius: 6,
              fontWeight: 'bold',
              color: '#000',
              backgroundColor: '#5bd1d7',
              border: 'none'
            }}
          >
            Sign Up
          </Button>
        </Space>
      </Space>
    ),

    // 🚩 解决右侧留白问题的 Token 配置
    token: {
      pageContainer: {
        paddingInlinePageContainerContent: 10,
        paddingBlockPageContainerContent: 10,
      },
    },
    // 4. 全局包裹器：明暗切换算法逻辑
    childrenRender: (children) => {
      useEffect(() => {
        const favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
        const iconPath = isDark ? '/favicon_white.svg' : '/favicon_black.svg';
        if (favicon) {
          favicon.href = iconPath;
        }
      }, [isDark]);

      return (
        <ConfigProvider
          theme={{
            algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
            token: { colorPrimary: '#5bd1d7' },
          }}
        >
          {children}
        </ConfigProvider>
      );
    },
  };
};
