import React from 'react';
import { Row, Col, Typography, Divider } from 'antd';
import VideoCard from '@/components/VideoCard';

const EDU_DATA = [
  { streamId: 'edu-1', name: 'Professional Doctoral Thesis Writing', author: 'Academic Hub', views: '5.2K', date: '1 week ago', category: 'Education' },
  { streamId: 'edu-2', name: 'Fullstack Development Masterclass', author: 'Enlight Academy', views: '12K', date: '3 days ago', category: 'Education' },
  { streamId: 'edu-3', name: 'Blockchain Fundamentals Explained', author: 'Crypto Lab', views: '18K', date: '2 weeks ago', category: 'Education' },
];

export default () => (
  <div style={{ padding: '24px' }}>
    <Typography.Title level={2}>Education</Typography.Title>
    <Divider />
    <Row gutter={[20, 24]}>
      {EDU_DATA.map(item => (
        <Col xs={24} sm={12} md={8} lg={6} key={item.streamId}>
          <VideoCard data={item} />
        </Col>
      ))}
    </Row>
  </div>
);
