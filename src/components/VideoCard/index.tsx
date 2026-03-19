import { Avatar, Space, Typography, Tag } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { history } from '@umijs/max';

const { Text, Title } = Typography;

export default ({ data }: { data: any }) => (
  <div 
    onClick={() => history.push(`/room/${data.streamId}`)}
    style={{ cursor: 'pointer', marginBottom: 20 }}
  >
    <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', aspectRatio: '16/9', marginBottom: 12, background: '#000' }}>
      <img src={data.thumbnail || `https://picsum.photos/seed/${data.streamId}/640/360`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      {data.status === 'broadcasting' && (
        <Tag color="red" style={{ position: 'absolute', top: 8, left: 8, border: 'none', fontWeight: 'bold' }}>LIVE</Tag>
      )}
    </div>
    <Space align="start" size={12}>
      <Avatar src={`https://api.dicebear.com/7.x/identicon/svg?seed=${data.author}`} />
      <div style={{ flex: 1 }}>
        <Title level={5} style={{ margin: 0, fontSize: 14 }} ellipsis={{ rows: 2 }}>{data.name}</Title>
        <Text type="secondary" style={{ fontSize: 12 }}>{data.author} <CheckCircleFilled style={{ color: '#5bd1d7', fontSize: 10 }} /></Text>
        <br />
        <Text type="secondary" style={{ fontSize: 12 }}>{data.views} views • {data.date || 'Live'}</Text>
      </div>
    </Space>
  </div>
);
