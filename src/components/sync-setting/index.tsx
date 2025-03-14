import { FC, useEffect, useState } from 'react'
import { List, Modal, Form, Input, Toast } from 'antd-mobile'
import useSettingStore, { GistConfig } from '@/store/setting-store'
import useRecordStore from '@/store/recordStore'
import gistSync from '@/utils/sync/gist-provider'
import './style.scss'
import dayjs from 'dayjs'
import { DEFAULT_VEHICLE_ID, DEFAULT_VEHICLE_NAME } from '../../utils/consts'

const withLoading = async (fn: (...args: any) => Promise<boolean> ) => {
  Toast.show({
    icon: 'loading',
    content: '同步中...',
    duration: 0
  })
  const result = await fn()
  if (result) {
    Toast.show({
      icon: 'success',
      content: '同步成功'
    })
  } else {
    Toast.show({
      icon: 'fail',
      content: '同步失败，请检查配置'
    })
  }
}

const SyncSetting: FC = () => {
  const [form] = Form.useForm<GistConfig>()
  const { 
    gistConfig, 
    setGistConfig, 
    syncTime, 
    updateSyncTime,
    vehicleId,
    setVehicleId
  } = useSettingStore()
  const { mergeRecordData, recordList } = useRecordStore()
  const [files, setFiles] = useState(null)

  const { token, gistId } = gistConfig || {}

  useEffect(() => {
    const fetchInit = async () => {
      const response = await gistSync.get(gistId)
      const files = response.data?.files
      setFiles(files)
    }
    fetchInit()
  }, [])
  useEffect(() => {
    if (token) {
      gistSync.setToken(token)
    }
  }, [token])


  const showGistConfigModal = () => {
    const handleSubmit = async () => {
      let values = null
      try {
        values = await form.validateFields()
        Toast.show({
          icon: 'success',
          content: '配置已保存'
        })
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
    Modal.confirm({
      title: 'Gist 同步设置',
      content: (
        <Form
          form={form}
          initialValues={gistConfig}
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
            label='Gist ID'
            name='gistId'
            rules={[{ required: true, message: '请输入 Gist ID' }]}
          >
            <Input placeholder='请输入 Gist ID' />
          </Form.Item>
        </Form>
      ),
      onConfirm: () => {
        handleSubmit()
      }
    })
  }

  const handleShowSyncModal = async () => {
    if (!gistConfig) {
      showGistConfigModal()
      return
    }

    const handleSync = () => {
      if (!gistConfig) {
        showGistConfigModal()
        return
      }

      withLoading(async () => {
        try {
          const response = await gistSync.get(gistId)
          const files = response.data?.files
          const recordList = JSON.parse(files[vehicleId]?.content || '')
          if (!recordList) {
            throw new Error('同步失败')
          }

          mergeRecordData(recordList)
          
          updateSyncTime()
          return true
        } catch (error) {
          return false
        }
      })
    }
    const handleSyncTo = () => {
      withLoading(async () => {
        try {
          const recordListJson = JSON.stringify(recordList)
          const response = await gistSync.update(gistId, {
            filename: vehicleId, content: recordListJson
          })
          if (response.status === 200) {
            updateSyncTime()
          }
          return response.status === 200
        } catch {
          return false
        }
      })
    }

    Modal.alert({
      title: 'Gist 同步',
      content: (
        <List>
          <List.Item onClick={showGistConfigModal}>Gist 配置</List.Item>
          {
            gistConfig ? (
              <>
              <List.Item onClick={handleSync}>从 Gist 下载</List.Item>
              <List.Item onClick={handleSyncTo}>同步到 Gist</List.Item>
              </>
            ) : null
          }
        </List>
      )
    })
  }

  const changeVehicle = async () => {
    Modal.alert({
      title: '切换车辆',
      content: (
        <List>
          {Object.keys(files).map((filename) => (
            <List.Item key={filename}> 
              {filename === DEFAULT_VEHICLE_ID 
              ? DEFAULT_VEHICLE_NAME 
              : filename}
            </List.Item>
          ))}
        </List>
      )
    })
  }

  return (
    <>
      <List.Item
        onClick={handleShowSyncModal}
        extra={gistConfig ? '' : '未配置'}
        description={syncTime 
          ? `上次同步时间: ${dayjs(syncTime).format('YY/MM/DD - HH:mm')}` 
          : ''
        }
      >
        Gist 同步
      </List.Item>
      {gistConfig && (
        <>
          <List.Item 
            onClick={changeVehicle}
            extra={vehicleId === DEFAULT_VEHICLE_ID ? '默认车辆' : vehicleId}
          >
            切换车辆
          </List.Item>
        </>
      )}
    </>
  )
}

export default SyncSetting 