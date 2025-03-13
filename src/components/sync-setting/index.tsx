import { FC, useEffect, useState } from 'react'
import { List, Modal, Form, Input, Toast } from 'antd-mobile'
import useSettingStore, { GistConfig } from '@/store/setting-store'
import useRecordStore from '@/store/recordStore'
import gistSync from '@/utils/sync/gist-provider'
import './style.scss'
import dayjs from 'dayjs'

const SyncSetting: FC = () => {
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm<GistConfig>()
  const { gistConfig, setGistConfig, syncTime, updateSyncTime } = useSettingStore()
  const { mergeRecordData, recordList } = useRecordStore()
  const { token, gistId, filename } = gistConfig || {}

  useEffect(() => {
    if (token) {
      gistSync.setToken(token)
    }
  }, [token])
  const handleSync = async () => {
    if (!gistConfig) {
      setVisible(true)
      return
    }

    try {
      Toast.show({
        icon: 'loading',
        content: '同步中...',
        duration: 0
      })

      const response = await gistSync.get(gistId)

      const recordList = JSON.parse(response.data?.files[filename]?.content || '')
      if (!recordList) {
        throw new Error('同步失败')
      }

      mergeRecordData(recordList)
      
      Toast.show({
        icon: 'success',
        content: '同步成功'
      })
      updateSyncTime()
    } catch (error) {
      Toast.show({
        icon: 'fail',
        content: '同步失败，请检查配置'
      })
    }
  }

  const handleSyncTo = async () => {
    try {
      const recordListJson = JSON.stringify(recordList)
      const response = await gistSync.update(gistId, {
        filename, content: recordListJson
      })
      if (response.status === 200) {
        Toast.show({
          icon: 'success',
          content: '同步成功'
        })
        updateSyncTime()
      }
    } catch {
      Toast.show({
        icon: 'fail',
        content: '同步失败，请检查配置'
      })
    }
  }

  const handleSubmit = async () => {
    let values = null
    try {
      values = await form.validateFields()
      Toast.show({
        icon: 'success',
        content: '配置已保存'
      })
      setVisible(false)
    } catch (error) {
      Toast.show({
        icon: 'fail',
        content: '请填写完整信息'
      })
    }
    if (!values) {
      return
    }
    setGistConfig(values)
  }

  return (
    <>
      <List.Item
        onClick={handleSync}
        extra={gistConfig ? '点击同步' : '未配置'}
        description={syncTime 
          ? `上次同步时间: ${dayjs(syncTime).format('YY/MM/DD - HH:mm')}` 
          : ''
        }
      >
        {gistConfig ? '从 Gist 同步' : 'Gist 同步'}
      </List.Item>
      {gistConfig && (
        <List.Item
          onClick={handleSyncTo}
          extra="点击同步"
        >
          同步到 Gist
        </List.Item>
      )}

      <Modal
        visible={visible}
        title='Gist 同步设置'
        content={
          <Form
            form={form}
            layout='vertical'
            className='sync-form'
          >
            <Form.Item
              label='Personal Access Token'
              name='token'
              rules={[{ required: true, message: '请输入 Token' }]}
            >
              <Input placeholder='请输入 GitHub Token' />
            </Form.Item>
            <Form.Item
              label='文件名'
              name='filename'
              rules={[{ required: true, message: '请输入文件名' }]}
            >
              <Input placeholder='例如：records.json' />
            </Form.Item>
            <Form.Item
              label='Gist ID'
              name='gistId'
              rules={[{ required: true, message: '请输入 Gist ID' }]}
            >
              <Input placeholder='请输入 Gist ID' />
            </Form.Item>
          </Form>
        }
        closeOnAction
        onClose={() => setVisible(false)}
        actions={[
          {
            key: 'cancel',
            text: '取消'
          },
          {
            key: 'confirm',
            text: '确认',
            primary: true
          }
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