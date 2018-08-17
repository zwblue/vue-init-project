<template>
<div class="page">
  <Cascader :data="deptList" v-model="selectDept" change-on-select filterable></Cascader>
</div>
</template>
<script>
import {
  getAllDepartmentInfoApi
} from "api/dept.js";
import {
  Cascader
} from 'iview'
export default {
  components: {
    Cascader
  },
  props: {
    deptId: {
      type: String,
      default: ''
    },
    deptName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      deptList: [],
      selectDept: []
    }
  },
  computed: {
    
  },
  watch: {
    // 部门的变化
    selectDept(newval, val) {
      if (newval.length) {
        let str = newval[newval.length - 1];
        let index = str.indexOf("-");
        this.$emit('update:deptId', str.slice(0, index));
        this.$emit('update:deptName', str.slice(index + 1));
      }
    }
  },
  mounted() {
    // 将部门接收过来并给初始值
    this.initDept();
  },
  methods: {
    getAllParentDept(deptId, array) {
      console.log(deptId,array)
      const newArray = array.concat();
      let parentsArray = [];
      function plan(id,deptarray) {
        for (let val of deptarray) {
          console.log(val.id)
          if (val.id === Number(id)) {
             console.log(888,val.department)
             parentsArray.unshift({id:val.id,'dept':val.department,'parentId':val._parentId});
             if(val._parentId>0){
               plan(val._parentId,newArray)
             }
             return;
           }
          if(val.children.length!=0){
            plan(id,val.children)
          }
        }
      } 
      plan(deptId,newArray)
      return parentsArray;
    },
    initDept() {
      getAllDepartmentInfoApi()
        .then(res => {
          if (res.data.code === 200) {
            const data = res.data.data;
            this.deptList = this.deptComputed(data);
            if (this.deptId) {
             let array=this.getAllParentDept(this.deptId, data).map((val)=>{
               return val.id+'-'+val.dept
             });
             this.selectDept=array;
            }
          } else {
            this.$Message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.$Message.error("/getAllDepartmentInfo-接口异常");
        });
    },
    deptComputed(array) {
      const newArray = array.concat();
      function plan(newArray) {
        for (let val of newArray) {
          val.label = val.department;
          val.value = val.id + "-" + val.department;
          if (val.children && val.children.length !== 0) {
            plan(val.children);
          }
        }
      }
      plan(newArray);
      return newArray;
    }
  }
}
</script>

<style lang="scss" scoped>
.page {}
</style>
