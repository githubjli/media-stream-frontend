import React from 'react';
import { Row, Col, Typography, Divider } from 'antd';
import VideoCard from '@/components/VideoCard';

const GAME_DATA = [
  { streamId: 'game-1', name: 'Black Myth: Wukong 4K Gameplay', author: 'Master Gamer', views: '250K', date: '5 hours ago', category: 'Gaming' },
  { streamId: 'game-2', name: 'Cyberpunk 2077: Phantom Liberty Live', author: 'Night City', views: '45K', date: '12 hours ago', category: 'Gaming' },
  { streamId: 'game-3', name: 'Elden Ring: Shadow of the Erdtree Guide', author: 'Tarnished', views: '89K', date: '1 day ago', category: 'Gaming' },
];

export default () => (
  <div style={{ padding: '24px' }}>
    <Typography.Title level={2}>Gaming</Typography.Title>
    <Divider />
    <Row gutter={[20, 24]}>
      {GAME_DATA.map(item => (
        <Col xs={24} sm={12} md={8} lg={6} key={item.streamId}>
          <VideoCard data={item} />
        </Col>
      ))}
    </Row>
  </div>
);
