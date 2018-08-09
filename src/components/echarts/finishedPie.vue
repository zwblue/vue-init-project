<style scoped>

</style>
<template>
<div class="par-box">
  <div class="num primary">
    {{count}}
  </div>
  <div :id="id" :style="{height:height+'px',position:'relative'}">
  </div>
</div>
</template>
<script>
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/pie");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");
require("echarts/lib/component/title");
import walden from "../echarts/theme/walden.json";
echarts.registerTheme("walden", walden);
export default {
  name: "myPie",
  props: {
    title: {
      type: String,
      default: "饼图"
    },
    count: {
      type: [Number,String],
      default: 0
    },
    height: {
      type: Number,
      default: 458
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
      console.log(this.seriesData);
      // 基于准备好的dom，初始化echarts实例
      this.barchart = echarts.init(document.getElementById(this.id), "walden");
      // 绘制图表
      this.barchart.setOption({
        title: {
          text: this.title,
          left: 'center',
          bottom: 10,
          textStyle: {
            color: '#2d8cf0'
          }
        },
        tooltip: {
          trigger: "item",
          formatter: (params, ticket, callback) => {
            let list = this.seriesData[params.dataIndex].list
            if (list[1]) {
              return params.name + '数量：' + params.value + "<br />" +
                params.name + "占比：" + this.seriesData[params.dataIndex].rpercent + "<br />" +
                list[0].name + '数量：' + list[0].value + "<br />" +
                list[0].name + '占比：' + list[0].rpercent + "<br />" +
                list[1].name + '数量：' + list[1].value + "<br />" +
                list[1].name + '占比：' + list[1].rpercent + "<br />";
            } else {
              return params.name + '数量：' + params.value + "<br />" +
                params.name + "占比：" + this.seriesData[params.dataIndex].rpercent + "<br />" +
                list[0].name + '数量：' + list[0].value + "<br />" +
                list[0].name + '占比：' + list[0].rpercent + "<br />";
            }

          }
        },
        series: [{
          name: this.title,
          type: "pie",
          radius: ["50%", "65%"],
          center: ["50%", "50%"],
          data: this.seriesData,
          labelLine: {}
        }]
      });
    }
  }
};
</script>
<style scoped>
.par-box {
  position: relative;
}

.num {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: bold;
}
</style>

