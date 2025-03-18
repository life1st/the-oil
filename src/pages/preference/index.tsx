import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { List, Modal, Button, TextArea, Toast } from 'antd-mobile'
import dayjs from 'dayjs'
import Navigate from '@/components/navigate'
import useRecordStore from '@/store/recordStore'
import useSettingStore from '@/store/setting-store'
import SyncSetting from '@/components/sync-setting'
import './style.scss'

const Preference: FC = () => {
    const navi = useNavigate()
    const { recordList, setRecordData } = useRecordStore()
    const { vehicleId } = useSettingStore()
    const [importVisible, setImportVisible] = useState(false)
    const [importText, setImportText] = useState('')
    
    const handleExport = () => {
        const data = JSON.stringify(recordList)
        const blob = new Blob([data], { type: 'application/json;charset=utf-8;' })
        const link = document.createElement("a")
        const url = URL.createObjectURL(blob)
        link.href = url
        link.download = `${vehicleId}_${dayjs().format('YY/MM/DD-HH:mm')}.json`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const handleImport = () => {
        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0]
            if (!file) return
            const reader = new FileReader()
            reader.onload = (e) => {
                const data = e.target?.result
                if (typeof data === 'string') {
                    try {
                        const records = JSON.parse(data)
                        records.forEach((r: any) => setRecordData(r))
                        Toast.show({
                            icon: 'success',
                            content: '导入成功'
                        })
                        setImportVisible(false)
                        navi('/')
                    } catch (error) {
                        Toast.show({
                            icon: 'fail',
                            content: '导入失败，请检查文件格式'
                        })
                    }
                }
            }
            reader.readAsText(file)
        }

        const fromFile = () => {
            const input = document.createElement('input')
            input.type = 'file'
            input.accept = '.json'
            input.onchange = handleFileChange
            input.click()
        }

        const fromText = () => {
            try {
                const records = JSON.parse(importText)
                records.forEach((r: any) => setRecordData(r))
                Toast.show({
                    icon: 'success',
                    content: '导入成功'
                })
                setImportVisible(false)
                setImportText('')
                navi('/')
            } catch (error) {
                Toast.show({
                    icon: 'fail',
                    content: '导入失败，请检查数据格式'
                })
            }
        }

        return (
            <Modal
                visible={importVisible}
                title='导入数据'
                content={
                    <div className='import-modal'>
                        <Button 
                            block 
                            color='primary'
                            onClick={fromFile}
                            className='import-button'
                        >
                            从文件导入
                        </Button>
                        <div className='import-divider'>或</div>
                        <TextArea
                            placeholder='粘贴 JSON 数据'
                            value={importText}
                            onChange={setImportText}
                            className='import-textarea'
                        />
                        <Button 
                            block 
                            color='primary'
                            onClick={fromText}
                            disabled={!importText}
                            className='import-button'
                        >
                            从文本导入
                        </Button>
                    </div>
                }
                closeOnAction
                onClose={() => {
                    setImportVisible(false)
                    setImportText('')
                }}
                actions={[
                    {
                        key: 'cancel',
                        text: '取消'
                    }
                ]}
            />
        )
    }

    return (
        <div className="preference-container">
            <Navigate title="偏好设置" />
            
            <div className="preference-content">
                <List className="preference-section">
                    <SyncSetting />
                    <List.Item onClick={handleExport}>
                        导出数据
                    </List.Item>
                    <List.Item onClick={() => setImportVisible(true)}>
                        导入数据
                    </List.Item>
                </List>
            </div>
            {handleImport()}
        </div>
    )
}

export default Preference 