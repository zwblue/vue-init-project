import { Modal, Message } from 'iview';
import { updSubtaskhandleApi } from 'api/myproject.js';
export function delClick(id, type) {
  console.log(id,type);
  Modal.confirm({
    title: "删除对话框",
    content: "<p>是否确认删除子任务？</p>",
    onOk: () => {
      console.log(1111111)
      return 333
      if (type === 'ziTask') {
        console.log(444444)
        updSubtaskhandleApi({ subtaskId: id,subtaskName: })
          .then(res => {
            let data = res.data;
            if (data.code == 200) {
              Message.success(data.msg);
              return true;
            } else {
              Message.error(data.msg);
            }
          })
          .catch(err => {
            Message.error("接口故障：/updSubtaskhandle");
            return false;
          });
      } else if (type === 'task') {
        newGroupHandleApi({ taskId: id })
          .then(res => {
            let data = res.data;
            if (data.code == 200) {
              Message.success(data.msg);
            } else {
              Message.error(data.msg);
            }
          })
          .catch(err => {
            Message.error("接口故障：/newGroupHandle");
          });
      }

    },
    onCancel: () => {
      Message.info("你取消了删除操作！");
    }
  });
}

export function remindClick(id, type) {
  console.log(id,type);
  Modal.confirm({
    title: "提醒对话框",
    content: "<p>确认提醒该任务负责人尽快完成此任务？</p>",
    onOk: () => {
      if (type === 'ziTask') {
        getHomePageReminding(remindingParams)
          .then(res => {
            if (res.data.code == 200) {
              Message.success("提醒成功！");
            } else {
              Message.error(res.data.msg);
            }
          })
          .catch(err => {
            Message.error("系统异常！");
          });
      } else if (type === 'task') {
        getHomePageReminding(remindingParams)
          .then(res => {
            if (res.data.code == 200) {
              Message.success("提醒成功！");
            } else {
              Message.error(res.data.msg);
            }
          })
          .catch(err => {
            Message.error("系统异常！");
          });
      }

    },
    onCancel: () => {
      Message.info("你取消了提醒用户！");
    }
  });
}
