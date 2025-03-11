import { FC, useState } from 'react'
import { List, Modal, Form, Input, Toast } from 'antd-mobile'
import webdav from './webdav'
import './style.scss'

interface SyncConfig {
  url: string;
  username: string;
  password: string;
}

const SyncSetting: FC = () => {
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm<SyncConfig>()

  const handleSubmit = async () => {
    // try {
    //   const values = await form.validateFields()
    //   console.log('同步配置：', values)
    //   // TODO: 测试连接并保存配置
    //   Toast.show({
    //     icon: 'success',
    //     content: '配置已保存',
    //   })
      
    //   setVisible(false)
    // } catch (error) {
    //   Toast.show({
    //     icon: 'fail',
    //     content: '请填写完整信息',
    //   })
    // }
    const items = await webdav.client.getDirectoryContents("/")
    console.log(items)
  }

  return (
    <>
      <List.Item
        onClick={() => setVisible(true)}
        arrow
      >
        WebDAV 同步
      </List.Item>

      <Modal
        visible={visible}
        title='同步设置'
        content={
          <Form
            form={form}
            layout='vertical'
            className='sync-form'
          >
            <Form.Item
              label='服务器地址'
              name='url'
              rules={[{ required: true, message: '请输入服务器地址' }]}
            >
              <Input placeholder='请输入 WebDAV 服务器地址' />
            </Form.Item>
            <Form.Item
              label='用户名'
              name='username'
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input placeholder='请输入用户名' />
            </Form.Item>
            <Form.Item
              label='密码'
              name='password'
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input
                type='password'
                placeholder='请输入密码'
              />
            </Form.Item>
          </Form>
        }
        closeOnAction
        onClose={() => setVisible(false)}
        actions={[
          {
            key: 'cancel',
            text: '取消',
          },
          {
            key: 'confirm',
            text: '确认',
            primary: true,
          },
        ]}
        onAction={(action) => {
          if (action.key === 'confirm') {
            handleSubmit()
          }
        }}
      />
    </>
  )
}

export default SyncSetting 