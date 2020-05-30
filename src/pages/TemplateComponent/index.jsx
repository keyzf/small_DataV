import { List, Col, Carousel, Spin, Input, Row, Card, Switch, Button } from 'antd';
import React, { Component, useState, useRef } from 'react';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { GridContent } from '@ant-design/pro-layout';
import ConfigCard from './ConfigCard';

import styles from './index.less';


class TemplateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templateId:0,
      title:'',
    }
  }

  componentDidMount () {
      const { history } = this.props;
      if (history.location.params) {
        this.setState({
          templateId: history.location.params.templateId,
          title: history.location.params.title,
        })
        // 情况一： 新建大屏数据可视化时，从选择布局与设置大屏名称的页面跳转过来时，从路由获取必要数据。
        // 情况二： 从我的大屏中的修改当前大屏数据可视化跳转过来，请求接口数据，通过dva管理获取到。这里需要Connect到
      } else {
        history.push('/visual-template')
      }
  }

  changeSwitch = () => {

  }

  carouselChange = () => {

  }

  submitConfig = () => {
    const { history } = this.props;
    // 存储所有的数据到一个大的配置jsonObject中，然后发起请求将配置好的大屏发送到后端数据库存储起来
    history.push('/visual-template');
  }

  renderTemplate = (templateId) => {
    if (templateId === 1) {
      return (
          <Row>
            <Col xs={24} sm={24} md={7} lg={7} xl={7} >
              <Row style={{margin:'10px',height:"160px"}} gutter={[16,16]}>
                <ConfigCard style={{height:"160px"}} templateId={templateId} moduleId={1}/>
              </Row>
              <Row style={{margin:'10px',height:"160px"}}>
                <ConfigCard style={{height:'160px'}} templateId={templateId} moduleId={2}/>
              </Row>
              <Row style={{margin:'10px',height:"160px"}}>
                <ConfigCard style={{height:'160px'}} templateId={templateId} moduleId={3}/>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={10} lg={10} xl={10}>
              <Row style={{margin:'10px',height:"300px"}}>
                <ConfigCard style={{height:'300px'}} templateId={templateId}  moduleId={4}/>
              </Row>
              <Row style={{margin:'10px',height:"190px"}}>
                <ConfigCard style={{height:'190px'}} templateId={templateId}  moduleId={5}/>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={7} lg={7} xl={7}>
              <Row style={{margin:'10px',height:"160px"}}>
                <ConfigCard style={{height:'160px'}} templateId={templateId}  moduleId={6}/>
              </Row>
              <Row style={{margin:'10px',height:"160px"}}>
                <ConfigCard style={{height:'160px'}} templateId={templateId}  moduleId={7}/>
              </Row>
              <Row style={{margin:'10px',height:"160px"}}>
                <ConfigCard style={{height:'160px'}} templateId={templateId}  moduleId={8}/>
              </Row>
            </Col>
          </Row>
      )
    }
    if (templateId === 2) {
      return 2;
    } 
      return null;
  }

  render() {
    const { title, templateId } = this.state;
    return (
     <div>
       <div className={styles.title}>{title}</div>
       <Button className={styles.button} size="small" type="dashed" onClick={this.submitConfig}>提交配置</Button>
       <div className={styles.content}>
        {this.renderTemplate(templateId)}
       </div>
     </div>
    );
  }
}

export default TemplateComponent
