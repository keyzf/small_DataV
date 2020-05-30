import { PlusOutlined, FullscreenOutlined, EditOutlined, SendOutlined } from '@ant-design/icons';
import { Card, Button, List, Tooltip } from 'antd';
import React, { Component, useState, useRef } from 'react';
import { Link, connect, history } from 'umi';
import moment from 'moment';
import styles from './index.less';

const { Meta } = Card;
const MyScreen = () => {
  const [loading, changeLoading] = useState(false);
  const [list, setList] = useState([{
    img:'',
    title: '+新建大屏',
  },{
    id: 1,
    img:'/test.png',
    title:'黑龙江是省各市地信息化发展水平总体分析',
    status: 1, // 未发布
  },{
    id: 2,
    img:'https://dlv-public-image.obs.cn-north-1.myhuaweicloud.com/c41e7203-a7d9-43f2-8942-131ab7173a46.png?ttl=242138036',
    title:'test2',
    status: 2, // 已发布
  }]);
  const handelScreen = (type, item) => {
      if (type === "show") {
        if ( item.id === 1 ) {
          window.open('http://localhost:8080/');
        }
      } else if (type === "edit") {
        // 获取当前可视化的信息
        if (item.id === 1) {
          history.push({pathname:'/visual-template/config-screen', params:{title: item.title, templateId: item.id}});
        }
      } else if (type === "sumbit") {
        console.log("sumbit");
      }
  }

 
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
                    actions={[
                      <FullscreenOutlined key="show" onClick={()=>handelScreen('show',item)}/>,
                      <EditOutlined key="edit" onClick={()=>handelScreen('edit',item)}/>,
                      <SendOutlined key="sumbit" onClick={()=>handelScreen('sumbit',item)}/>,
                      
                    ]}
                  >
                    
                      <Meta
                          // className={styles.resetMeat}
                          title={<Tooltip placement="topLeft" title={item.title}>{item.title}</Tooltip>}
                          description={item.status === 1 ? <span style={{color:'#40a9ff'}}>已发布</span>:<span>待发布</span>}
                          className={styles.myCard}
                        />
                    
                  </Card>
                </List.Item>
              )
            }

            return (
              <List.Item>
                <Link to="/visual-template">
                  <Button type="dashed" className={styles.newButton}>
                    <PlusOutlined /> 新建大屏
                  </Button>
                </Link>
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
