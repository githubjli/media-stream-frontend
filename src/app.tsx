import {
  CloudUploadOutlined,
  GlobalOutlined,
  MoonOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  SunOutlined,
} from '@ant-design/icons';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { SelectLang, history } from '@umijs/max';
import { Button, ConfigProvider, Input, Space, theme } from 'antd';
import { useEffect } from 'react';

export async function getInitialState(): Promise<{
  name: string;
  darkTheme: boolean;
}> {
  return {
    name: 'Media Stream User',
    darkTheme: false,
  };
}

export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}) => {
  const isDark = initialState?.darkTheme;

  return {
    title: 'Media Stream',
    layout: 'mix',
    splitMenus: false,
    navTheme: isDark ? 'realDark' : 'light',
    colorPrimary: '#5bd1d7',
    siderWidth: 176,
    menuHeaderRender: false,
    headerTitleRender: () => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          cursor: 'pointer',
        }}
        onClick={() => history.push('/')}
      >
        <img
          src={isDark ? '/logo_white.svg' : '/logo_black.svg'}
          alt="logo"
          style={{ height: 28 }}
        />
        <span
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: isDark ? '#fff' : '#111827',
            letterSpacing: '-0.01em',
          }}
        >
          Media Stream
        </span>
      </div>
    ),
    headerContentRender: () => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          padding: '0 24px',
        }}
      >
        <Input.Search
          placeholder="Search videos, channels, and people"
          allowClear
          style={{ maxWidth: 640, width: '100%' }}
          size="large"
          onSearch={(value) => console.log('Searching for:', value)}
        />
      </div>
    ),
    rightContentRender: () => (
      <Space
        size={8}
        style={{ marginRight: 8, display: 'flex', alignItems: 'center' }}
      >
        <Button
          type="text"
          icon={<CloudUploadOutlined style={{ fontSize: 18 }} />}
          style={{ color: isDark ? '#fff' : '#4b5563' }}
          onClick={() =>
            window.dispatchEvent(new CustomEvent('open-upload-modal'))
          }
        />
        <Button
          type="text"
          icon={<SettingOutlined style={{ fontSize: 18 }} />}
          style={{ color: isDark ? '#fff' : '#4b5563' }}
        />
        <Button
          type="text"
          icon={<QuestionCircleOutlined style={{ fontSize: 18 }} />}
          style={{ color: isDark ? '#fff' : '#4b5563' }}
        />
        <SelectLang
          icon={
            <Button
              type="text"
              icon={<GlobalOutlined style={{ fontSize: 18 }} />}
              style={{ color: isDark ? '#fff' : '#4b5563', padding: 0 }}
            />
          }
        />
        <Button
          type="text"
          icon={
            isDark ? (
              <SunOutlined style={{ color: '#faad14' }} />
            ) : (
              <MoonOutlined />
            )
          }
          style={{ fontSize: 18, color: isDark ? '#faad14' : '#4b5563' }}
          onClick={() => {
            setInitialState((pre) => ({
              ...pre!,
              darkTheme: !pre?.darkTheme,
            }));
          }}
        />
        <Space size={8} style={{ marginLeft: 8 }}>
          <Button type="text" style={{ color: '#08979c', fontWeight: 700 }}>
            Log In
          </Button>
          <Button
            type="primary"
            style={{
              borderRadius: 10,
              fontWeight: 700,
              color: '#000',
              backgroundColor: '#5bd1d7',
              border: 'none',
              boxShadow: '0 8px 18px rgba(91, 209, 215, 0.24)',
            }}
          >
            Sign Up
          </Button>
        </Space>
      </Space>
    ),
    token: {
      pageContainer: {
        paddingInlinePageContainerContent: 16,
        paddingBlockPageContainerContent: 12,
      },
      header: {
        colorBgHeader: isDark ? '#141414' : 'rgba(255, 255, 255, 0.92)',
      },
    },
    childrenRender: (children) => {
      useEffect(() => {
        const favicon = document.querySelector(
          "link[rel*='icon']",
        ) as HTMLLinkElement;
        const iconPath = isDark ? '/favicon_white.svg' : '/favicon_black.svg';
        if (favicon) {
          favicon.href = iconPath;
        }
      }, [isDark]);

      return (
        <ConfigProvider
          theme={{
            algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
            token: {
              colorPrimary: '#5bd1d7',
              borderRadius: 12,
            },
            components: {
              Input: {
                borderRadiusLG: 14,
              },
              Button: {
                borderRadius: 10,
              },
            },
          }}
        >
          {children}
        </ConfigProvider>
      );
    },
  };
};
