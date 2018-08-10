<template>
  <div class="page" :style='rightModelstyle'>
    <Icon type="md-close" class="close primary" @click="rightModel.ifShow=false" />
    <div class="title name">{{tableData?tableData.subtaskHandler:''}}</div>
    <Table border :columns="columns1" :data="myTaskList" >
    </Table>
    <Divider class="title"> 全部任务
      <span class="error">（共6个）</span>
    </Divider>
    <member-allTask :dataList='myAllTaskList'></member-allTask>
  </div>
</template>
<script>
import {getAllSubtaskInfoByMenmberApi,getSubtaskCountByMemberApi} from 'api/home.js'
import { Icon,Divider } from 'iview';
import MemberAllTask from './memberAllTask.vue';
export default {
  components: {
    Icon,Divider,MemberAllTask
  },
  props: {
    rightModelstyle: {
      type: Object,
      default: function() {
        return {
          background: "#fafcfe",
          width: "1200px"
        };
      }
    },
    tableData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    rightModel: {
      type: Object,
      default: function() {
        return {
          ifShow: false
        };
      }
    }
  },
  watch:{
    tableData(){
      this.myTaskList=[];
      this.getAllSubtaskInfoByMenmberList();
      this.getSubtaskCountByMemberList();
    }
  },
  data() {
    return {
      myTaskList:[],
      myAllTaskList:[],
      columns1: [
        {
          title: "开发中的任务",
          align: "center",
          key: "kfz"
        },
        {
          title: "未开始的任务",
          align: "center",
          key: "wks"
        },
        {
          title: "负责任务最后结束时间",
          align: "center",
          key: "maxdate"
        },
        {
          title: "已归档任务数",
          align: "center",
          key: "ygd"
        },
        {
          title: "逾期任务数",
          align: "center",
          key: "ywc"
        },
        {
          title: "完成准时率",
          align: "center",
          key: "wcrate",
          render: (h, params) => {
            return h("div", params.row.wcrate + "%");
          }
        }
      ]
    };
  },
  mounted() {
    this.getSubtaskCountByMemberList();
    this.getAllSubtaskInfoByMenmberList();
  },
  methods:{
    getSubtaskCountByMemberList(){
      getSubtaskCountByMemberApi({userName:this.tableData.subtaskHandler}).then(
        res=>{
          if(res.data.code===200){
            console.log('某个组员的任务统计表',res.data)
            if(res.data.data!==null&&res.data.data){
              this.myTaskList.push(res.data.data);
            }else{
               this.myTaskList=[];
            }
            console.log(11111,this.myTaskList)
          }
        }
      ).catch(err=>{
        this.$Message.error('接口故障：/getSubtaskCountByMember')
      })
    },
    getAllSubtaskInfoByMenmberList(){
       getAllSubtaskInfoByMenmberApi({userName:this.tableData.subtaskHandler}).then(
          res=>{
          if(res.data.code===200){
            console.log('某个组员的所有任务',res.data)
            this.myAllTaskList=res.data.data;
          }
        }
       ).catch(err=>{
        this.$Message.error('接口故障：/getAllSubtaskInfoByMenmber')
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  position: fixed;
  border-left: 1px solid #ccc;
  padding: 10px 30px;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 6;
}
.close {
  font-size: 24px;
  padding: 3px 10px;
  position: absolute;
  right: 30px;
  top: 10px;
  cursor: pointer;
}
.name {
  height: 30px;
  line-height: 30px;
  font-weight: 700;
  margin-bottom: 10px;
}
</style>
