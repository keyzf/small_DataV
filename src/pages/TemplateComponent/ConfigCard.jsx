import { List, Col, Carousel, Modal, Form, Input, Row, Select, Switch, Button } from 'antd';
import React, { Component, useState, useRef } from 'react';
import { CloseOutlined, CheckOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { GridContent } from '@ant-design/pro-layout';
// import { Link, connect } from 'umi';
import ReactJson from 'react-json-view';
import { debounce } from "debounce";
import echarts from 'echarts';
import styles from './index.less';
// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 12 },
// };

const { Option } = Select;

class ConfigCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselIsOrNot: false,
      list:[1],
      visible:false,
      data: [],
      value: undefined,
      jsonData: [
        {
          "x": "1月",
          "y": 235.5
        },
        {
          "x": "2月",
          "y": 160.5
        },
        {
          "x": "3月",
          "y": 130.2
        },
        {
          "x": "4月",
          "y": 128
        },
        {
          "x": "5月",
          "y": 198
        },
        {
          "x": "6月",
          "y": 239
        },
      ],
      title:'',
      type: 'bar',
      curCanvasElem: null, 
    }
    this.onChangeCall = debounce(this.onChangeCall,800)
  }

  handleSearch = value => {
    if (value) {
      // fetch(value, data => this.setState({ data }));
    } else {
      this.setState({ data: [] });
    }
  };

  handleChange = value => {
    this.setState({ value });
  };

 
  changeSwitch = () => {
    const  {carouselIsOrNot} = this.state;
    this.setState({
      carouselIsOrNot: !carouselIsOrNot,
      list: [1],
    })
  }

  addCard = () => {
    const {list} = this.state
    list.push(list.lastItem+1)
    this.setState({
      list: [...list]
    })
  }
  
  configModal = (templateId, moduleId, id) => {
    console.log(templateId, moduleId, id)
    this.setState({
      visible: true,
    })
  }

  handleOk = () => {
    this.setState({
      visible:false
    })
  }

  handleCancel = () => {
    this.setState({
      visible:false
    })
  }

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  onFinish = values => {
    console.log('Success:', values);
  };

  onChangeInput = e => {
    this.onChangeCall(e.target);
  };

  onChangeCall = target => {
    const { value } = target;
    const { curCanvasElem, type, jsonData} = this.state;
    console.log(value);
    this.setState({
      title: value,
    },()=>{
      console.log(curCanvasElem,type,this.state.title)
      if (curCanvasElem) {
        this.echartsRender(curCanvasElem, type , jsonData, this.state.title);
      }
    })
  }

  onChangeSelect = (value) => {
    const {curCanvasElem, title} = this.state
      this.setState({
        type: value,
        jsonData: [
          {name:"华为", value:3000},
          {name:"小米", value:2500},
          {name:"苹果", value:1800},
        ]
      },()=>{
        if (curCanvasElem) {
          this.echartsRender(curCanvasElem, this.state.type , this.state.jsonData, title);
        }
      })
  }


  confirmChangeJson = () => {
    const { jsonData, curCanvasElem, type, title } = this.state;
    this.echartsRender(curCanvasElem, type, jsonData, title);
  }

  echartsRender = (element, type, jsonData, title) => {
    console.log(jsonData)
    const dom = element;
    const myChart = echarts.init(dom);
    let option = {};

    if (type === 'bar') {
      const xData = jsonData.map((item)=>item.x)
      const seriesData = jsonData.map((item)=>item.y)
      option = {
        title: { text: title || '' },
        tooltip: {},
        xAxis: {
          data: xData
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: seriesData
        }]
      };
    } else if (type === 'pie') {
      option = {
        title: { text: title || '三家公司手机销售市场同期占比' },
        tooltip: {},
        series: [{
          radius: 100,
          name: '销量',
          type: 'pie',
          data: jsonData
        }]
      }
    } 
    // 绘制图表
    myChart.setOption(option, true);
  }

  setTextInputRef = element => {
    console.log('初次渲染容器dom出现时触发！！！');
    this.setState({
      curCanvasElem: element,
    })
    if (element) {
      const {jsonData} = this.state;
      // 基于准备好的dom，初始化echarts实例, 默认初次定位”bar“类型。
      this.echartsRender(element, 'bar', jsonData);
    } 
  };

  jsonChange = (changeObj) => {
    const { updated_src } = changeObj;
    this.setState({
      jsonData: updated_src
    })
  }
   
  render() {
    const { carouselIsOrNot, list, visible, jsonData } = this.state;
    const { style, templateId, moduleId } = this.props;
    const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
    return (
     <div className={styles.resetC}>
        <Switch 
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked 
            size="small"
            className={styles.switch}
            onChange={()=>this.changeSwitch()}
        />
        {carouselIsOrNot?
        <Carousel afterChange={this.carouselChange} style={{lineHeight: style.height}}>
            {list.map((id)=>
              <div key={`${templateId}-${moduleId}-${id}`}>
                <Button type="dashed" size="small" onClick={()=>this.configModal(templateId,moduleId,id)}>+新建图表</Button>
                <DoubleRightOutlined style={{marginLeft:'20px',color:'whitesmoke'}} key='add' onClick={this.addCard} />
              </div>)
            }
        </Carousel>:
        <div 
          style={{
            height:style.height,
            background:"#6daeff",
            lineHeight:style.height,
            textAlign:'center'
          }}
        ><Button type="dashed" size="small" onClick={()=>this.configModal(templateId,moduleId,1)} >+新建图表</Button></div>
        }
        <Modal
          title="图形数据配置"
          width="85%"
          style={{ top: 20 }}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
         <Row>
           <Col flex="auto">
            <Row>
              <Form
                // {...layout}
                layout="inline"
                labelAlign=""
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
              >
                <Form.Item
                  label="标题"
                  name="title"
                  rules={[{ required: true, message: '输入图表名称!' }]}
                >
                  <Input onChange={this.onChangeInput}/>
                </Form.Item>
                <Form.Item
                  label="类型"
                  name="type"
                  rules={[{ required: true, message: '选择图类型!' }]}
                >
                  <Select defaultValue="bar" style={{ width: 120 }} onChange={this.onChangeSelect}>
                    <Option value="bar">柱状图</Option>
                    <Option value="line" disabled>折线图</Option>
                    <Option value="radio" disabled>雷达图</Option>
                    <Option value="pie">饼状图</Option>
                    <Option value="map" disabled>地图</Option>
                    <Option value="barLine" disabled>柱状折现混合图</Option>
                  </Select>
                </Form.Item>
              </Form>
            </Row>
            <Row>
              <div ref={this.setTextInputRef} style={{width:'500px',height:'500px',margin:'10px 10px'}}/>
            </Row>
           </Col>
           <Col flex="400px">
             <Row>
              <Form.Item
                  label="坐标轴"
                  name="title"
                >
                  <Input onChange={this.onChangeInput}/>
              </Form.Item>
              <Form.Item
                  label="数据类型"
                  name="type"
                >
                  <Select defaultValue="json" style={{ width: 100 }} onChange={this.onChangeSelect}>
                    <Option value="json">静态json</Option>
                    <Option value="csv" disabled>csv</Option>
                    <Option value="excel" disabled>excel</Option>
                    <Option value="mysql" disabled>mysql</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="数据源"
                  name="type"
                >
                  <Select disabled defaultValue="test" style={{ width: 100 }} onChange={this.onChangeSelect}>
                    <Option value="test">test.json</Option>
                    <Option value="csv" disabled>csv</Option>
                    <Option value="excel" disabled>excel</Option>
                    <Option value="mysql" disabled>mysql</Option>
                  </Select>
                </Form.Item>
              <Button style={{marginLeft:'30px'}} onClick={this.confirmChangeJson}>确认修改</Button>
             </Row>
             <Row>
              <ReactJson 
                name={false}
                displayDataTypes={false}
                displayObjectSize={false}
                onEdit={(edit)=>this.jsonChange(edit)}
                onAdd={(add)=>this.jsonChange(add)}
                onDelete={(deleted)=>this.jsonChange(deleted)}
                src={jsonData} 
                theme="monokai"
                style={{overflow: "auto",height: "500px",width: "400px"}}
              />
             </Row>
           </Col>
         </Row>
        </Modal>
        
     </div>
    );
  }
}

export default ConfigCard
