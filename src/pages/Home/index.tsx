import { Typography, Space, Button, Row, Col, Modal, Form, Input, Upload, message } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import {
  CodeOutlined,
  ReadOutlined,
  ControlOutlined,
  GlobalOutlined,
  RightOutlined,
  InboxOutlined
} from '@ant-design/icons';
import { history } from '@umijs/max';
import VideoCard from '@/components/VideoCard';
import React, { useState, useEffect } from 'react';

const { Title } = Typography;
const { Dragger } = Upload; // 🚩 这里已经定义了 Dragger

// --- Tags Bar ---
const TagsBar = () => {
  const [active, setActive] = useState('All');
  const tags = ['All', 'React', 'Streaming', 'Blockchain', 'Data Science', 'Gaming', 'AI'];
  return (
    <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', paddingBottom: 24, display: 'flex', gap: 12, scrollbarWidth: 'none' }}>
      {tags.map(t => (
        <div
          key={t}
          onClick={() => setActive(t)}
          style={{
            padding: '6px 16px',
            borderRadius: 8,
            background: active === t ? '#000' : '#f2f2f2',
            color: active === t ? '#fff' : '#000',
            cursor: 'pointer',
            fontWeight: 500,
            transition: '0.2s'
          }}
        >
          {t}
        </div>
      ))}
    </div>
  );
};

// --- Channel Row (Unified Layout with Channels) ---
const ChannelRow = ({ title, path, items, icon }: any) => (
  <div style={{ marginBottom: 40 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
      <Space size={10}>
        <Title level={2} style={{ margin: 0, fontSize: 20, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ display: 'flex' }}>{icon}</span>
          {title}
        </Title>
      </Space>
      <Button type="link" onClick={() => history.push(path)} style={{ color: '#8c8c8c' }}>
        Show more <RightOutlined style={{ fontSize: 10 }} />
      </Button>
    </div>
    <Row gutter={[24, 24]}>
      {items.map((item: any) => (
        <Col xs={24} sm={12} md={8} lg={6} xl={6} key={item.streamId}>
          <VideoCard data={item} />
        </Col>
      ))}
    </Row>
  </div>
);

export default () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // 🚩 重要：监听来自 app.tsx 顶部按钮的点击事件
  useEffect(() => {
    const handleOpen = () => setIsUploadOpen(true);
    window.addEventListener('open-upload-modal', handleOpen);
    return () => window.removeEventListener('open-upload-modal', handleOpen);
  }, []);

  const mockData = {
    tech: [{ streamId: 'test', name: 'Live: Infrastructure Monitor', author: 'Director', views: '1.2K', status: 'broadcasting' }],
    edu: [{ streamId: 'edu-1', name: 'PhD Thesis Defense Preparation', author: 'Academic', views: '5K' }],
    game: [{ streamId: 'game-1', name: 'Wukong 4K HDR Gameplay', author: 'Pro Gamer', views: '250K' }],
    news: [{ streamId: 'news-1', name: 'Platform 2.0 Roadmap', author: 'Official', views: '3K' }]
  };

  return (
    <PageContainer title={false} ghost contentWidth="Fluid">
      <div style={{ padding: '0 8px' }}>
        <TagsBar />

        <ChannelRow title="Technology" path="/tech" icon={<CodeOutlined />} items={mockData.tech} />
        <ChannelRow title="Education" path="/edu" icon={<ReadOutlined />} items={mockData.edu} />
        <ChannelRow title="Gaming" path="/game" icon={<ControlOutlined />} items={mockData.game} />
        <ChannelRow title="News" path="/news" icon={<GlobalOutlined />} items={mockData.news} />

        {/* 🚩 找回的 Upload Modal */}
        <Modal
          title={<Title level={4}>Upload Content</Title>}
          open={isUploadOpen}
          onCancel={() => setIsUploadOpen(false)}
          footer={null}
          width={560}
          centered
        >
          <Form layout="vertical" onFinish={() => { message.success('Success! Processing video...'); setIsUploadOpen(false); }}>
            <Form.Item label="Video File">
              {/* 🚩 使用统一的 Dragger 标签，解决 Syntax Error */}
              <Dragger
                accept="video/*"
                maxCount={1}
                customRequest={({onSuccess}) => setTimeout(() => onSuccess?.("ok"), 1000)}
              >
                <p className="ant-upload-drag-icon"><InboxOutlined style={{ color: '#5bd1d7' }} /></p>
                <p className="ant-upload-text">Click or drag file to upload</p>
                <p className="ant-upload-hint">Support high quality MP4, WebM formats</p>
              </Dragger>
            </Form.Item>
            <Form.Item label="Title" name="title" rules={[{ required: true }]}>
              <Input placeholder="Enter video title" />
            </Form.Item>
            <Form.Item label="Channel">
              <Space wrap>
                {['Tech', 'Edu', 'Game', 'News'].map(c => <Button key={c} shape="round">{c}</Button>)}
              </Space>
            </Form.Item>
            <Button
              type="primary"
              block
              size="large"
              htmlType="submit"
              style={{ background: '#5bd1d7', color: '#000', fontWeight: 'bold', border: 'none', marginTop: 12 }}
            >
              Publish
            </Button>
          </Form>
        </Modal>
      </div>
    </PageContainer>
  );
};