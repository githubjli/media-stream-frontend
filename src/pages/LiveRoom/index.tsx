import { useParams, history } from '@umijs/max';
import { Row, Col, Avatar, Typography, Space, Button, Divider, Card, Tag, message } from 'antd';
import { ArrowLeftOutlined, UserOutlined, HeartOutlined, ShareAltOutlined, CheckCircleFilled } from '@ant-design/icons';
import React, { useEffect, useRef } from 'react';
import * as vjs_module from 'video.js';
import 'video.js/dist/video-js.css';

const { Title, Text } = Typography;

export default () => {
  const { id } = useParams<{ id: string }>();
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  
  // 🚩 使用全路径进行测试。如果依然跨域，建议在 .umirc.ts 走代理请求该地址
  //const hlsUrl = `https://streaming-api-live.pttblockchain.online/live/streams/${id}.m3u8`;
  const hlsUrl = `/live-api/live/streams/${id}.m3u8`;

  useEffect(() => {
    const videojs: any = (vjs_module as any).default || vjs_module;

    const initPlayer = () => {
      if (!videoRef.current || typeof videojs !== 'function') return;

      // 1. 彻底销毁旧实例并清空容器
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
      videoRef.current.innerHTML = '';

      // 2. 创建 video 标签并设置 crossOrigin 属性
      const v = document.createElement("video-js");
      v.className = 'vjs-big-play-centered vjs-fluid';
      // 🚩 关键：告知浏览器该媒体请求需要跨域凭据
      v.setAttribute('crossorigin', 'anonymous');
      videoRef.current.appendChild(v);

      try {
        // 3. 实例化播放器
        const player = playerRef.current = videojs(v, {
          autoplay: true,
          controls: true,
          preload: 'auto',
          sources: [{ src: hlsUrl, type: 'application/x-mpegURL' }],
          // 🚩 针对 CORS 的深度配置
          html5: {
            vhs: { 
              overrideNative: true, // 强制使用 VHS，避免原生浏览器的 CORS 处理差异
              withCredentials: false // 如果服务器设置了 Access-Control-Allow-Origin: *，这里必须为 false
            },
            nativeAudioTracks: false,
            nativeVideoTracks: false,
          },
        });

        // 4. 诊断监听
        player.on('loadstart', () => console.log('🚀 尝试拉取流:', hlsUrl));
        player.on('playing', () => {
          console.log('✅ 播放成功');
          message.success('Connected to stream');
        });

        player.on('error', () => {
          const error = player.error();
          console.error('❌ 播放器报错:', error.code, error.message);
          
          // 🚩 针对图 2775 现象的针对性提示
          if (error.code === 2 || error.code === 0) {
            message.error('网络错误或跨域拦截 (CORS)，请检查服务器 web.xml 配置', 5);
          } else if (error.code === 4) {
            message.error('媒体解码失败，请确认流状态是否正常', 5);
          }
        });

      } catch (err) {
        console.error('播放器初始化异常:', err);
      }
    };

    const timer = setTimeout(initPlayer, 200);

    return () => {
      clearTimeout(timer);
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [id, hlsUrl]);

  return (
    <div style={{ padding: '24px', maxWidth: 1600, margin: '0 auto' }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={17}>
          <div style={{ borderRadius: 16, overflow: 'hidden', background: '#000', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            <div ref={videoRef} key={id} />
          </div>

          <Card bordered={false} style={{ marginTop: 24, borderRadius: 12 }}>
            <Space align="start" size={16}>
              <Avatar size={48} style={{ backgroundColor: '#5bd1d7' }}>ED</Avatar>
              <div>
                <Title level={4} style={{ margin: 0 }}>{id}: Technical Analysis</Title>
                <Text type="secondary">Broadcast via Ant Media Server <CheckCircleFilled style={{ color: '#5bd1d7', fontSize: 12 }} /></Text>
                <div style={{ marginTop: 8 }}>
                  <Tag color="error">LIVE</Tag>
                  <Tag color="processing">HLS</Tag>
                </div>
              </div>
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={7}>
          <Title level={5}>Global Node Status</Title>
          <Card size="small" style={{ borderRadius: 12 }}>
             <Text type="secondary">Checking stream integrity...</Text>
             <Divider style={{ margin: '12px 0' }} />
             <Text size="small" style={{ fontSize: 11, color: '#999' }}>Endpoint: {hlsUrl}</Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
