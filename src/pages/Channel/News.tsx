import React from 'react';
import { Row, Col, Typography, Divider } from 'antd';
import VideoCard from '@/components/VideoCard';

const NEWS_DATA = [
  { streamId: 'news-1', name: 'Media Stream Platform Update: v2.0 Release', author: 'Official News', views: '3.1K', date: '1 hour ago', category: 'News' },
  { streamId: 'news-2', name: 'The Future of AI in Live Streaming', author: 'Tech Daily', views: '15K', date: '2 days ago', category: 'News' },
  { streamId: 'news-3', name: 'Global Tech Trends: 2026 Report', author: 'Industry Analyst', views: '9K', date: '3 days ago', category: 'News' },
];

export default () => (
  <div style={{ padding: '24px' }}>
    <Typography.Title level={2}>News</Typography.Title>
    <Divider />
    <Row gutter={[20, 24]}>
      {NEWS_DATA.map(item => (
        <Col xs={24} sm={12} md={8} lg={6} key={item.streamId}>
          <VideoCard data={item} />
        </Col>
      ))}
    </Row>
  </div>
);
