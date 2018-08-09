<style scoped>

</style>
<template>
<div>
  <div :id="id" :style="{height:height+'px',position:'relative'}">
  </div>
</div>
</template>
<script>
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/bar");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");
require("echarts/lib/component/title");
import walden from "../echarts/theme/macarons.json";
echarts.registerTheme("walden", walden);
export default {
  name: "myPie",
  props: {
    yAxis: {
      type: Array,
      default: () => {
        return ["行政部", "策划A组", "合肥聚财", "测试组", "前端产品组", "后端产品组", "Java开发部"]
      }
    },
    xAxis: {
      type: Array,
      default: () => {}
    },
    seriesData2:{
      type:Array,
      default:()=>{
        return ['10%','9%','3%','2%','8%','9%','3%','2%','8%']
      }
    },
    title: {
      type: String,
      default: "饼图"
    },
    height: {
      type: Number,
      default: 500
    },
    legendData: {
      type: Array,
      default () {
        return ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"];
      }
    },
    seriesData: {
      type: Array,
      default () {
        return [{
            value: 335,
            name: "直接访问"
          },
          {
            value: 310,
            name: "邮件营销"
          },
          {
            value: 234,
            name: "联盟广告"
          },
          {
            value: 135,
            name: "视频广告"
          },
          {
            value: 1548,
            name: "搜索引擎"
          }
        ];
      }
    }
  },
  data() {
    return {
      barchart: null
    };
  },
  computed: {
    id() {
      return parseInt(Math.random() * 1000000);
    }
  },
  mounted() {
    this.drawBar();
  },
  watch: {
    seriesData() {
      this.drawBar();
    },
    legendData() {
      this.drawBar();
    }

  },
  methods: {
    drawBar() {
      // 基于准备好的dom，初始化echarts实例
      this.barchart = echarts.init(document.getElementById(this.id), "walden");
      // 绘制图表
      this.barchart.setOption({
        title: {
          text: this.title,
          left: 'center',
          bottom: 0,
          textStyle: {
            color: '#2d8cf0'
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "4%",
          right: "4%",
          bottom: "40px",
          containLabel: true
        },
        xAxis: {
          data: this.xAxis
        },
        yAxis: {
          data: this.yAxis
        },
        tooltip: {
          trigger: "item",
            formatter:(params, ticket, callback)=>{
            return params.name+'数量：' +params.data+ "<br />" + 
            params.name + "占比：" + this.seriesData2[params.dataIndex];
        }
        },
        series: [{
          name: "数量",
          type: "bar",
          itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        1, 0, 0, 1,
                        [
                            {offset: 0, color: '#83bff6'},
                            {offset: 0.5, color: '#188df0'},
                            {offset: 1, color: '#188df0'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        1, 0, 0, 1,
                        [
                            {offset: 0, color: '#2378f7'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            },
          data: this.seriesData
        }]
      });
    }
  }
};
</script>
<style scoped>

</style>

