<template>
<div class="page">
  <DatePicker type="date" placeholder="请选择日期" :value='value?value.slice(0,10):""' :options="options" @on-change='changeDate' :disabled='eDateshow'></DatePicker>
  <Icon type="ios-remove" />
  <TimePicker type="time" placeholder="请选择时间" hide-disabled-options :disabled-hours="hideHourArray" :disabled-minutes='hideMinutesArray' :clearable='false' format="HH:mm:ss" :steps='[1,30,60]' @on-change='changeTime' :disabled='eDateshow' style='width:170px'
    :value="defaultTime"></TimePicker>
</div>
</template>
<script>
import {
  DatePicker,
  TimePicker
} from 'iview';
export default {
  components: {
    DatePicker,
    TimePicker
  },
  props: {
    maxTime: {
      type: String,
      default: ''
    },
    minTime: {
      type: String,
      default: ''
    },
    selectType: {
      type: String,
      default: 'start'
    },
    value: {
      type: String,
      default: ''
    },
    eDateshow: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  computed: {
    defaultTime() {
      if (this.value && this.valueIsChange) { //是否有默认值  有默认值，就是默认值，只要一改变，就变成没有默认值。
        return this.value.slice(-8);
      } else { //没有默认值
        if (this.selectType === 'start') { //开始时间
          if (this.minTime) { //是否有最小值
            const minDate = this.minTime.slice(0, 10);
            const minTime = this.minTime.slice(-8); //当天最小时间，如果小于08:30还是默认17：30小于，就是12：30
            if (this.activeDate == minDate) {
              if (minTime <= "08:30:00") {
                return "08:30:00";
              } else {
                return this.minTime.slice(-8);
              }
            } else {
              return "08:30:00";
            }
          } else {
            return "08:30:00";
          }
        } else {
          if (this.maxTime) { //最大时间
            const lastDate = this.maxTime.slice(0, 10); //是否有最大值
            const maxTime = this.maxTime.slice(-8); //当天最大时间，如果大于17:30还是默认17：30小于，就是12：30
            if (this.activeDate == lastDate) {
              if (maxTime <= "17:30:00") {
                return this.maxTime.slice(-8);
              } else {
                return "17:30:00";
              }
            } else {
              return "17:30:00";
            }
          } else {
            if (this.minTime) { //是否有最小值
              const minDate = this.minTime.slice(0, 10);
              const minTime = this.minTime.slice(-8); //当天最小时间，如果小于08:30还是默认17：30小于，就是12：30
              if (this.activeDate == minDate) {
                if (minTime <= "17:30:00") {
                  return this.minTime.slice(-8);
                } else {
                  return "17:30:00";
                }
              } else {
                return "17:30:00";
              }
            } else {
              return "17:30:00"
            }

          }
        }
      }
    },
    hideMinutesArray() {
      const minutesArray = [];
      if (this.maxTime) {
        const activeHour = this.maxTime.slice(11, 13);
        const activeMutines = Number(this.maxTime.slice(14, 16));
        const activeDate = this.maxTime.slice(0, 10);
        if (this.activeDate === activeDate && (this.activeTime.slice(0, 2) === activeHour || !this.activeTime)) {
          for (let m = 30 - activeMutines; m > 0; m -= 30) {
            minutesArray.push(m)
          }
        }
      }
      if (this.minTime) {
        const activeHour = this.minTime.slice(11, 13);
        const activeMutines = this.minTime.slice(14, 16);
        const activeDate = this.minTime.slice(0, 10);
        if (this.activeDate === activeDate && (this.activeTime.slice(0, 2) === activeHour || !this.activeTime)) {
          for (let m = 0; m < activeMutines; m += 30) {
            minutesArray.push(m)
          }
        }
      }
      return minutesArray;
    },
    hideHourArray() {
      //将大于默认值的数字隐藏掉
      const hourArray = [];
      if (this.maxTime) {
        const activeHour = this.maxTime.slice(11, 13);
        const activeDate = this.maxTime.slice(0, 10);
        if (this.activeDate === activeDate) {
          for (let x = activeHour; x < 24; x++) {
            hourArray.push(x)
          }
        }
      }
      if (this.minTime) {
        const activeHour = this.minTime.slice(11, 13);
        const activeDate = this.minTime.slice(0, 10);
        if (this.activeDate === activeDate) {
          for (let x = 0; x < activeHour; x++) {
            hourArray.push(x)
          }
        }
      }
      return hourArray;
    }
  },
  data() {
    return {
      activeDate: '',
      activeTime: '',
      valueIsChange: true
    }
  },
  watch: {
    activeDate(newval, val) {

    },
    value(newval, val) {
      newval ? this.activeDate = this.value.slice(0, 10) : null
    }
  },
  mounted() {
    this.value ? this.activeDate = this.value.slice(0, 10) : null
  },
  methods: {
    changeDate(val) {
      if (val) {
        this.valueIsChange = false;
        this.activeDate = val;
        if (this.activeTime) {
          this.$emit('changeDate', this.activeDate + " " + this.activeTime)
        } else {
          this.$emit('changeDate', this.activeDate + " " + this.defaultTime)
        }
      } else {
        this.$emit('changeDate', '')
      }
    },
    changeTime(val) {
      if (val) {
        this.valueIsChange = false;
        this.activeTime = val;
        this.$emit('changeDate', this.activeDate + " " + this.activeTime)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.page {}
</style>
