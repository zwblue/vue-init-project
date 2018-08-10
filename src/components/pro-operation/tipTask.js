import { Modal,Message } from 'iview';
// import {getHomePageReminding} from 'api/myproject'
function remindClick(row) {
  const remindingParams = {
    taskId: row.taskId,
    subtaskId: "",
    type: "2"
  };
  Modal.confirm({
    title: "提醒对话框",
    content: "<p>确认提醒该任务负责人尽快完成此任务？</p>",
    onOk: () => {
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
    },
    onCancel: () => {
      Message.info("你取消了提醒用户！");
    }
  });
}
