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
      selectDept: [],
    }
  },
  watch: {
    // 部门的变化
    selectDept(newval, val) {
      let str = newval[newval.length - 1];
      let index = str.indexOf("-");
      this.$emit('update:deptId',str.slice(0, index)) ;
      this.$emit('update:deptName',str.slice(index + 1));
    }
  },
  mounted() {
    this.initDept();
  },
  methods: {
    initDept() {
      getAllDepartmentInfoApi()
        .then(res => {
          console.log(res.data.data);
          if (res.data.code === 200) {
            const data = res.data.data;
            this.deptList = this.deptComputed(data);
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
