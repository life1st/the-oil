import { FC, useEffect, useState } from "react";
import { List, Modal, Form, Input, Toast } from "antd-mobile";
import useSettingStore, { GistConfig } from "@/store/setting-store";
import useRecordStore, { type Record } from "@/store/recordStore";
import gistSync from "@/utils/sync/gist-provider";
import "./style.scss";
import dayjs from "dayjs";
import { DEFAULT_VEHICLE_ID, DEFAULT_VEHICLE_NAME } from "@/utils/consts";
import PlateInput from "@/components/plate-input";
import PlateDisplay from "@/components/plate-display";

const withLoading = async (fn: (...args: any) => Promise<boolean>) => {
  Toast.show({
    icon: "loading",
    content: "同步中...",
    duration: 0,
  });
  const result = await fn();
  if (result) {
    Toast.show({
      icon: "success",
      content: "同步成功",
    });
  } else {
    Toast.show({
      icon: "fail",
      content: "同步失败，请检查配置",
    });
  }
};

const SyncSetting: FC = () => {
  const [form] = Form.useForm<GistConfig>();
  const {
    gistConfig,
    setGistConfig,
    syncTime,
    updateSyncTime,
    vehicleId,
    setVehicleId,
  } = useSettingStore();
  const { mergeRecordData, recordList } = useRecordStore();
  const [files, setFiles] = useState({});

  const { token, gistId } = gistConfig ?? {};

  useEffect(() => {
    const fetchInit = async () => {
      if (!token || !gistId) {
        return;
      }
      const response = await gistSync.get(gistId);
      const files = response.data.files;
      setFiles(files);
    };
    if (token) {
      gistSync.setToken(token);
    }
    void fetchInit();
  }, [token, gistId]);

  const showGistConfigModal = () => {
    const handleSubmit = async () => {
      let values = null;
      try {
        values = await form.validateFields();
        Toast.show({
          icon: "success",
          content: "配置已保存",
        });
      } catch {
        Toast.show({
          icon: "fail",
          content: "请填写完整信息",
        });
      }
      if (!values) {
        return;
      }
      setGistConfig(values);
    };
    void Modal.confirm({
      title: "Gist 同步设置",
      content: (
        <Form
          form={form}
          initialValues={gistConfig ?? {}}
          layout="vertical"
          className="sync-form"
        >
          <Form.Item
            label="Personal Access Token"
            name="token"
            rules={[{ required: true, message: "请输入 Token" }]}
          >
            <Input placeholder="请输入 GitHub Token" />
          </Form.Item>
          <Form.Item
            label="Gist ID"
            name="gistId"
            rules={[{ required: true, message: "请输入 Gist ID" }]}
          >
            <Input placeholder="请输入 Gist ID" />
          </Form.Item>
        </Form>
      ),
      onConfirm: handleSubmit,
    });
  };

  const handleSync = async (id?: string) => {
    if (!gistConfig || !gistId) {
      showGistConfigModal();
      return;
    }

    await withLoading(async () => {
      try {
        const response = await gistSync.get(gistId);
        const files = response.data.files;
        const recordList = JSON.parse(
          files[id ?? vehicleId].content || "[]"
        ) as Record[];
        if (recordList.length === 0) {
          throw new Error("同步失败");
        }

        mergeRecordData(recordList);
        updateSyncTime();
        return true;
      } catch {
        return false;
      }
    });
  };

  const handleSyncTo = async (id?: string) => {
    await withLoading(async () => {
      try {
        const recordListJson = JSON.stringify(recordList);
        const response = await gistSync.update(gistId!, {
          filename: id ?? vehicleId,
          content: recordListJson,
        });
        if (response?.status === 200) {
          updateSyncTime();
        }
        return response?.status === 200;
      } catch {
        return false;
      }
    });
  };

  const handleShowSyncModal = () => {
    if (!gistConfig) {
      showGistConfigModal();
      return;
    }

    void Modal.alert({
      title: "Gist 同步",
      content: (
        <List>
          <List.Item onClick={showGistConfigModal}>Gist 配置</List.Item>
          <List.Item onClick={() => handleSync()}>从 Gist 下载</List.Item>
          <List.Item onClick={() => handleSyncTo()}>同步到 Gist</List.Item>
        </List>
      ),
    });
  };

  const changeVehicle = () => {
    const handleAddVehicle = async (plateNum: string) => {
      setVehicleId(plateNum);
      await handleSyncTo(plateNum);
      Modal.clear();
    };
    const handleChangeVehicle = async (plateNum: string) => {
      setVehicleId(plateNum);
      await handleSync();
      Modal.clear();
    };
    void Modal.alert({
      title: "切换车辆",
      content: (
        <List>
          {Object.keys(files).map((filename) => (
            <List.Item
              key={filename}
              onClick={() => {
                void handleChangeVehicle(filename);
              }}
            >
              {filename === DEFAULT_VEHICLE_ID ? (
                DEFAULT_VEHICLE_NAME
              ) : (
                <PlateDisplay plate={filename} />
              )}
            </List.Item>
          ))}
          <List.Item>
            <PlateInput
              placeholder="请输入车牌号"
              onSubmit={handleAddVehicle}
            />
          </List.Item>
        </List>
      ),
    });
  };

  return (
    <>
      <List.Item
        onClick={() => {
          handleShowSyncModal();
        }}
        extra={gistConfig ? "" : "未配置"}
        description={
          syncTime
            ? `上次同步时间: ${dayjs(syncTime).format("YY/MM/DD - HH:mm")}`
            : ""
        }
      >
        Gist 同步
      </List.Item>
      {gistConfig && (
        <>
          <List.Item
            onClick={changeVehicle}
            extra={
              vehicleId === DEFAULT_VEHICLE_ID ? (
                "默认车辆"
              ) : (
                <PlateDisplay plate={vehicleId} size="small" />
              )
            }
          >
            切换车辆
          </List.Item>
        </>
      )}
    </>
  );
};

export default SyncSetting;
