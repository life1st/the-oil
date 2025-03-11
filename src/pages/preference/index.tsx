import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { List } from 'antd-mobile'
import Navigate from '@/components/navigate'
import useRecordStore from '@/store/recordStore'
import SyncSetting from '@/components/sync-setting'
import './style.scss'

const Preference: FC = () => {
    const navi = useNavigate()
    const { recordList, setRecordData } = useRecordStore();
    
    const handleExport = () => {
        const data = JSON.stringify(recordList);
        const blob = new Blob([data], { type: 'application/json;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = "records.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleImport = () => {
        const handleFileChange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                try {
                    const records = JSON.parse(data);
                    records.forEach(r => setRecordData(r))
                } catch (error) {
                    console.error('Error reading file:', error);
                }
                navi('/')
            };
            reader.readAsText(file);
        };
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = handleFileChange;
        input.click();
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
                    <List.Item onClick={handleImport}>
                        导入数据
                    </List.Item>
                </List>
            </div>
        </div>
    )
}

export default Preference 