import { PlusOutlined, FullscreenOutlined, EditOutlined, SendOutlined } from '@ant-design/icons';
import { Card, Button, List } from 'antd';
import React, { Component, useState, useRef } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Link, connect } from 'umi';
import moment from 'moment';
import styles from './index.less';

const { Meta } = Card;

class CombinationScreen extends Component {
  
  state = {
    loading: false,
    list: [{
      img:'',
      name: '+新建图表',
    },{
      id: 1,
      img:'https://dlv-public-image.obs.cn-north-1.myhuaweicloud.com/6c877a80-9a1d-4186-a920-91256ea83722.png?ttl=242138036',
      name:'test1',
      status: 1, // 未发布
    },{
      id: 2,
      img:'https://dlv-public-image.obs.cn-north-1.myhuaweicloud.com/c41e7203-a7d9-43f2-8942-131ab7173a46.png?ttl=242138036',
      name:'test2',
      status: 2, // 已发布
    }],
  };

  input = undefined;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'accountAndcenter/fetchCurrent',
    });
    dispatch({
      type: 'accountAndcenter/fetch',
    });
  }

  

  render() {
    const { loading, list } = this.state;
    const { currentUser = {}, currentUserLoading } = this.props;
    const dataLoading = currentUserLoading || !(currentUser && Object.keys(currentUser).length);
    return (
      <div>
        <div className={styles.title}>组合大屏</div>
        <div className={styles.content}>
          <List
            rowKey="id"
            loading={ loading }
            grid={{
              gutter: 24,
              xl: 4,
              lg: 3,
              md: 3,
              sm: 2,
              xs: 1,
            }}
            dataSource={list}
            renderItem={item => {
              if (item && item.id) {
                return (
                  <List.Item key={item.id}>
                    <Card
                      hoverable
                      className={styles.card}
                      cover={
                        <img
                          alt=""
                          className={styles.cardAvatar}
                          src={item.img}
                        />
                      }
                      actions={[
                        <FullscreenOutlined key="show"/>,
                        <EditOutlined key="edit" />,
                        <SendOutlined key="sumbit"/>,
                        
                      ]}
                    >
                      <Meta
                        title={item.name}
                        description={item.status === 1 ? <span style={{color:'#40a9ff'}}>已发布</span>:<span>待发布</span>}
                        className={styles.myCard}
                      />
                    </Card>
                  </List.Item>
                );
              }
  
              return (
                <List.Item>
                  <Button type="dashed" className={styles.newButton}>
                    <PlusOutlined /> 新建图表
                  </Button>
                </List.Item>
              );
            }}
          />
        </div>
      </div>
    )
  }
}

export default connect(({ loading, accountAndcenter }) => ({
  currentUser: accountAndcenter.currentUser,
  currentUserLoading: loading.effects['accountAndcenter/fetchCurrent'],
}))(CombinationScreen);
