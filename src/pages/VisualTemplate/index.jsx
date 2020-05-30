import { List, Col, Spin, Input, Row, Card, Button } from 'antd';
import React, { PureComponent, useState, useRef } from 'react';
import { connect, history } from 'umi';
import styles from './index.less';


class VisualTemplate extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
     titleVal:'',
     curImg: {
      id: 1,
      img:'/test.png',
      name:'test1',
      status: 1, 
      content: {
        title: "黑龙江是省各市地信息化发展水平总体分析",
          ratio: "16 / 9",
          pxr: "1900*1080px",
          description: "黑龙江是省各市地信息化发展水平总体分析数据可视化"
      }
     },
     descriptionContent: {
      title: "黑龙江是省各市地信息化发展水平总体分析",
      ratio: "16 / 9",
      pxr: "1900*1080px",
      description: "黑龙江是省各市地信息化发展水平总体分析数据可视化"
     },
     list: [{
        id: 1,
        img:'/test.png',
        name:'test1',
        status: 1, // 未发布
        content: {
          title: "黑龙江是省各市地信息化发展水平总体分析",
          ratio: "16 / 9",
          pxr: "1900*1080px",
          description: "黑龙江是省各市地信息化发展水平总体分析数据可视化"
        }
      },{
        id: 2,
        img:'https://dlv-public-image.obs.cn-north-1.myhuaweicloud.com/c41e7203-a7d9-43f2-8942-131ab7173a46.png?ttl=242138036',
        name:'test2',
        status: 2, // 已发布
        content: {
          title: "基于云计算的工业互联网实时监控",
          ratio: "16 / 9",
          pxr: "1900*1080px",
          description: "适用于云计算的工业互联网实时监控"
        }
      },{
        id: 3,
        img:'https://dlv-public-image.obs.cn-north-1.myhuaweicloud.com/6c877a80-9a1d-4186-a920-91256ea83722.png?ttl=242138036',
        name:'test1',
        status: 1, // 未发布
        content: {
          title: "能源化工管理平台",
          ratio: "16 / 9",
          pxr: "1900*1080px",
          description: "应用于能源化工产业的产销情况"
        }
      },{
        id: 4,
        img:'https://dlv-public-image.obs.cn-north-1.myhuaweicloud.com/c41e7203-a7d9-43f2-8942-131ab7173a46.png?ttl=242138036',
        name:'test2',
        status: 2, // 已发布
        content: {
          title: "基于云计算的工业互联网实时监控",
          ratio: "16 / 9",
          pxr: "1900*1080px",
          description: "适用于云计算的工业互联网实时监控"
        }
      },{
        id: 5,
        img:'https://dlv-public-image.obs.cn-north-1.myhuaweicloud.com/6c877a80-9a1d-4186-a920-91256ea83722.png?ttl=242138036',
        name:'test1',
        status: 1, // 未发布
        content: {
          title: "能源化工管理平台",
          ratio: "16 / 9",
          pxr: "1900*1080px",
          description: "应用于能源化工产业的产销情况"
        }
      },{
        id: 6,
        img:'https://dlv-public-image.obs.cn-north-1.myhuaweicloud.com/c41e7203-a7d9-43f2-8942-131ab7173a46.png?ttl=242138036',
        name:'test2',
        status: 2, // 已发布
        content: {
          title: "基于云计算的工业互联网实时监控",
          ratio: "16 / 9",
          pxr: "1900*1080px",
          description: "适用于云计算的工业互联网实时监控"
        }
      },]
    }
  }

  checkTemplate = (item) => {
    this.setState({
      curImg: {...item},
      descriptionContent: {...item.content},
    })
  }
  
  // 标题输入框内容变化回调函数
  inputChange = e => {
    this.setState({
      titleVal: e.target.value
    })
  }

  // 确认创建大屏按钮回调函数
  createBigScreen = () => {
    const { titleVal, curImg } = this.state;
    history.push({pathname:'/visual-template/config-screen',params:{title: titleVal, templateId: curImg.id}});
  }

  render() {
    const { list, curImg, descriptionContent } = this.state;
    return (
     <div>
       <Row style={{flexFlow:"unset"}}>
         <Col flex="200px" className={styles.left}>
          <List
            rowKey="id"
            dataSource={list}
            renderItem={item => {
                return (
                  <List.Item key={item.id} onClick={()=>this.checkTemplate(item)}>
                    <Card
                      hoverable
                      className={styles.resetCard}
                      cover={
                        <img
                          alt=""
                          className={styles.cardAvatar}
                          src={item.img}
                        />
                      }
                    >
                    <div style={{fontWeight:'bold'}}>{item.content.title}</div>
                    </Card>
                  </List.Item>
                )
              }
            }
          />
         </Col>
         <Col flex="auto" className={styles.right}>
          <Row style={{height:'100%',flexFlow:"unset"}}>
            
            <Col span={16} >
              {curImg.img?<img
                alt="大图版的大屏"
                className={styles.bigImg}
                src={curImg.img}
              />:null}
            </Col>
            <Col span={8}>
              <Card style={{height:'100%'}}>
                <div style={{marginBottom:"20px"}}>
                  <div className={styles.descriptionTitle}>{descriptionContent.title}</div>
                  <div>比例：{descriptionContent.ratio}</div>
                  <div>分辨率：{descriptionContent.pxr}</div>
                </div>
                  
                <div style={{marginBottom:"20px"}}>
                  <div className={`${styles.descriptionTitle} ${styles.introduce}`}>模板介绍</div>
                  <div>{descriptionContent.description}</div>
                </div>
              
                <div>
                  <div className={`${styles.descriptionTitle} ${styles.useTem}`}>使用模板</div>
                  <Input onChange={this.inputChange} placeholder="请输入大屏名称" style={{marginBottom: "10px"}}/>
                  <Button type="primary" onClick={()=>this.createBigScreen()}>创建大屏</Button>
                </div>
              </Card>
            </Col>
            
          </Row>
         </Col>
       </Row>
     </div>
    );
  }
}

export default VisualTemplate
