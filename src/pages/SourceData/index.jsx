import { PlusOutlined, ZoomInOutlined, DeleteOutlined, UploadOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { Card, Button, List, Modal, Row, Col, Input, Divider, Avatar, Form, Select, Upload, message } from 'antd';
import React, { Component } from 'react';
import { connect } from 'umi';
import styles from './index.less';

const { Meta } = Card;
const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const data = [
  {
    title: 'CSV文件',
    key:'csv',
    img:'/csv.png',
    optionObj: [
      {
        key: 'name',
        text: "名称",
        placeholder:'请输入名称',
        type: "input",
      },
      {
        key: 'accessKey',
        text: "Access Key",
        placeholder:'请输Access Key',
        type: "input",
      },
      {
        key: 'secretAccessKey',
        text: "Secret Access Key",
        placeholder:'请输Secret Access Key',
        type: "input",
      },
      {
        key: 'fileSource',
        text: "文件来源",
        type: "select",
        selectOption: [
          {
            key: 'local',
            value: '本地文件'
          },
          {
            key: 'obs',
            value: 'obs文件'
          }
        ]
      },
      {
        key: 'filePath',
        text: "文件路径",
        placeholder:'请输入文件路径',
        type: "input",
      },
    ],
  },
  {
    title: 'MySQL',
    key:'mysql',
    img:'/mysql.png',
    optionObj: [
      {
        key: 'host',
        text: "名字/ip",
        placeholder:'host名称 / 192.168.66.122',
        type: "input",
      },
      {
        key:'port',
        text: "端口",
        placeholder:'请输入端口号',
        type: "input",
      },
      {
        key:'userName',
        text: "用户名",
        placeholder:'请输入用户名',
        type: "input",
      },
      {
        key: 'passWord',
        text: "密码",
        placeholder:'请输入密码',
        type: "input",
      },
      {
        key: 'dataBaseName',
        text: "数据库名",
        type: "select",
        selectOption: [
        ]
      }
    ]
  },
];

const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};


class SourceData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      list: [{},{
          id: 1,
          type:'csv',
          name:'csv测试文件1',
      }],
      optionObj: [
        {
          key: 'name',
          text: "名称",
          placeholder:'请输入名称',
          type: "input",
        },
        {
          key: 'accessKey',
          text: "Access Key",
          placeholder:'请输Access Key',
          type: "input",
        },
        {
          key: 'secretAccessKey',
          text: "Secret Access Key",
          placeholder:'请输Secret Access Key',
          type: "input",
        },
        {
          key: 'fileSource',
          text: "文件来源",
          type: "select",
          selectOption: [
            {
              key: 'local',
              value: '本地文件'
            },
            {
              key: 'obs',
              value: 'obs文件'
            }
          ]
        },
        {
          key: 'filePath',
          text: "文件路径",
          placeholder:'请输入文件路径',
          type: "input",
        },
      ],
      visible: false,
      upload: false,
      currentKey: 'csv'
    }
  }
  
  
  // Modal相关的
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    
    this.setState({
      visible: false,
    });
  };


  // 选择数掘类型
  checkDataType = item => {
    console.log(item);
    this.setState({
      currentKey: item.key,
      upload: false,
      optionObj: item.optionObj
    })
  }



  // Form表单相关
  onFinish = values => {
    console.log('Success:', values);
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  selectChange = key => {
    console.log(key);
    if (key === "local") {
      this.setState({
        upload: true
      })
    } else {
      this.setState({
        upload: false
      })
    }
  }

  render() {
    const { loading, list, visible, optionObj, upload, currentKey } = this.state;
    return (
      <div>
        <div className={styles.title}>我的数据</div>
        <Modal
          title="新建数据连接"
          width="70%"
          style={{ top: 20 }}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Row style={{flexFlow:"unset"}}>
            <Col flex="350px" className={styles.left}>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <List.Item key={item.key} onClick={()=>this.checkDataType(item)}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.img} />}
                      title={item.title}
                    />
                    {item.key===currentKey?<CheckCircleTwoTone twoToneColor="#52c41a" />:null}
                  </List.Item>
                )}
              />
            </Col>
            <Divider type="vertical" style={{height:'unset'}} dashed/>
            <Col flex="auto">
              <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
              >
                { optionObj.map(item => {
                    if (item.type === "input") {
                      return (
                        <Form.Item
                          label={item.text}
                          name={item.key}
                          rules={[{ required: true, message: '' }]}
                        >
                          <Input  disabled={upload} placeholder={item.placeholder}/>
                        </Form.Item>
                      )
                    } 
                    return (
                      <Form.Item
                        label={item.text}
                        name={item.key}
                        rules={[{ required: true, message: '' }]}
                      >
                          <Select style={{ width: 120 }} onChange={this.selectChange}>
                            {item.selectOption.map(itm => {
                              return (
                                <Option value={itm.key}>{itm.value}</Option>
                              )
                            })}
                          </Select>
                      </Form.Item>                      
                    )
                  }
                  )
                }
                {upload?
                        <Form.Item
                          name="upload"
                          label="Upload"
                        >
                          <Upload {...props}>
                            <Button>
                              <UploadOutlined /> Click to upload
                            </Button>
                          </Upload>
                        </Form.Item>
                      :null
                }
              </Form>
            </Col>
          </Row>
        </Modal>
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
                          style={{margin: "10px 10px", width: "68px"}}
                          alt=""
                          className={styles.cardAvatar}
                          src={`/${item.type}_128.png`}
                        />
                      }
                      actions={[
                        <ZoomInOutlined key="show" />,
                        <DeleteOutlined key="delete"/>
                      ]}
                    >
                      <Meta
                        title={item.name}
                        className={styles.myCard}
                      />
                    </Card>
                  </List.Item>
                );
              }
              return (
                <List.Item>
                  <Button type="dashed" className={styles.newButton} onClick={this.showModal}>
                    <PlusOutlined /> 新建数据连接
                  </Button>
                </List.Item>
              );
            }}
          />
        </div>
      </div>
    );
  }
}

export default connect(({ loading, accountAndcenter }) => ({
  currentUser: accountAndcenter.currentUser,
  currentUserLoading: loading.effects['accountAndcenter/fetchCurrent'],
}))(SourceData);
