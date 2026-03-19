import React from 'react';
import { Row, Col, Typography, Divider } from 'antd';
import VideoCard from '@/components/VideoCard';

const TECH_DATA = [
  { streamId: 'test', name: 'Live: PTT Network Infrastructure Monitor', author: 'Director', views: '1.2K', status: 'broadcasting', category: 'Technology' },
  { streamId: 'tech-1', name: 'Data Architecture: 15 Years of Insights', author: 'Enlight Tech', views: '20K', date: '2 days ago', category: 'Technology' },
  { streamId: 'tech-2', name: 'Building Media Stream with UmiJS & Ant Design', author: 'Frontend Guru', views: '8K', date: '5 days ago', category: 'Technology' },
];

export default () => (
  <div style={{ padding: '24px' }}>
    <Typography.Title level={2}>Technology</Typography.Title>
    <Divider />
    <Row gutter={[20, 24]}>
      {TECH_DATA.map(item => (
        <Col xs={24} sm={12} md={8} lg={6} key={item.streamId}>
          <VideoCard data={item} />
        </Col>
      ))}
    </Row>
  </div>
);
