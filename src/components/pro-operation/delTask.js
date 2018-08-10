import { Modal, Message } from 'iview';

export function delClick(val) {
  Modal.confirm({
    title: "删除对话框",
    content: "<p>是否确认删除子任务？</p>",
    onOk: () => {
      handleSubTaskList(params)
        .then(res => {
          let data = res.data;
          if (data.code == 200) {
            Message.success(data.msg);
            this.initSubTaskData(this.taskParams);
            this.initDetailsData();
          } else {
            Message.error(data.msg);
          }
        })
        .catch(err => {
          Message.error("系统异常！");
        });
    },
    onCancel: () => {
      Message.info("你取消了删除操作！");
    }
  });
}
