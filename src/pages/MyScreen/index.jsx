import { PlusOutlined, HomeOutlined, ContactsOutlined, ClusterOutlined } from '@ant-design/icons';
import { Card, Button, List, Typography } from 'antd';
import React, { Component, useState, useRef } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Link, connect } from 'umi';
import moment from 'moment';
import styles from './index.less';
const { Paragraph } = Typography;

const MyScreen = () => {
  const [loading, changeLoading] = useState(false);
  const [list, setList] = useState([{
    img:'',
    name: '+新建大屏',
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
  }]);
  return (
    <div>
      <div className={styles.title}>我的大屏</div>
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
                    actions={[<a key="option1">操作一</a>, <a key="option2">操作二</a>]}
                  >
                    <div>
                      <div className={styles.title}>{item.name}</div>
                      <div className={styles.curentState}>{item.status === 1 ? <span>1</span>:<span>2</span>}</div>
                    </div>
                  </Card>
                </List.Item>
              );
            }

            return (
              <List.Item>
                <Button type="dashed" className={styles.newButton}>
                  <PlusOutlined /> 新建大屏
                </Button>
              </List.Item>
            );
          }}
        />
      </div>
    </div>
  )
}
export default connect(({ loading, accountAndcenter }) => ({
  currentUser: accountAndcenter.currentUser,
  currentUserLoading: loading.effects['accountAndcenter/fetchCurrent'],
}))(MyScreen);
