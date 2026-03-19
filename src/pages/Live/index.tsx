import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Empty, Skeleton } from 'antd';
import VideoCard from '@/components/VideoCard';

export default () => {
  const [streams, setStreams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/live-api/live/rest/v2/broadcasts/list/0/20')
      .then(res => res.json())
      .then(data => setStreams(Array.isArray(data) ? data : []))
      .catch(() => setStreams([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: '24px' }}>
      <Typography.Title level={2}>Live Plaza</Typography.Title>
      {loading ? <Skeleton active /> : (
        <Row gutter={[20, 24]}>
          {streams.length > 0 ? streams.map(item => (
            <Col xs={24} sm={12} md={8} lg={6} key={item.streamId}>
              <VideoCard data={{ ...item, status: 'broadcasting' }} />
            </Col>
          )) : <Empty description="No one is live right now." />}
        </Row>
      )}
    </div>
  );
};
