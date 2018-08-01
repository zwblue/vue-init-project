<template>
<div>
    <Table border class="my-table" :columns="columns1" size='default' :data="data1">
    </Table>
</div>
</template>
<script>
import ProGress from 'components/proGress/proGress'
import {
  Table,
  Icon
} from 'iview'
export default {
  components: {
    Table,
    Icon,
    ProGress
  },
  data() {
    return {
      columns1: [{
          title: "项目名称",
          align: 'center',
          render: (h, params) => {
            return h(
              'div', [h('Icon', {
                props: {
                  type: params.row.age >= 20 ? '' : 'md-bookmark'
                },
                style: {
                  marginRight: '10px',
                  fontSize: '18px',
                },
                'class': {
                  warning: true,
                  warningIcon: true
                }
              }), h('span', {
                'class': {
                  primary: true
                }
              }, params.row.name)])
          }
        },
        {
          title: "预计完成时间",
          align: 'center',
          key: "age",
        },
        {
          title: "项目进度（实际进度/预期进度）",
          align: 'center',
          width: 300,
          render: (h, params) => {
            return h(
              ProGress, {
                props: {
                  currentProgress: Number(params.row.currentjd),
                  planProgress: Number(params.row.planjd)
                }
              }
            )
          }
        },
        {
          title: "状态",
          align: 'center',
          render: (h, params) => {
            return h(
              'div', {
                'class': {
                  error: params.row.age > 25
                }
              }, this.dealWith(params.row.address)
            )
          }
        },
        {
          title: "负责人",
          align: 'center',
          key: "address"
        },
        {
          title: "类型",
          align: 'center',
          render: (h, params) => {
            return h(
              'div', this.dealWith(params.row.address)
            )
          }
        }
      ],
      data1: [{
          name: "项目管理",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03",
          currentjd: '30',
          planjd: '70'
        },
        {
          name: "项目管理",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01",
          currentjd: '50',
          planjd: '50'
        },
        {
          name: "项目管理",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02",
          currentjd: '80',
          planjd: '50'
        }, {
          name: "项目管理",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02",
          currentjd: '80',
          planjd: '50'
        },
        {
          name: "项目管理",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04",
          currentjd: '100',
          planjd: '100'
        }
      ]
    };
  },
  methods: {
    dealWith(val) {
      switch (val) {
        case '1':
          return '上线待审批';
        case '2':
          return '逾期';
        case '3':
          return '延期待审批';
        case '4':
          return '开发中';
        case '5':
          return '立项待审批';
        default:
          return '其他';
      }
    }
  }
};
</script>
<style>
.warningIcon {
  font-size: 18px;
  margin: 0 2px;
  vertical-align: -3px;
}
</style>
<style lang="scss" scoped>
.page {}

</style>
