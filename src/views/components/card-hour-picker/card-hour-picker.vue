<template>
  <div :class="b()">
    <st-checkbox-button-group :class="b('checkbox')" v-model="selectedDays">
      <st-checkbox-button-item :value="1">周一</st-checkbox-button-item>
      <st-checkbox-button-item :value="2">周二</st-checkbox-button-item>
      <st-checkbox-button-item :value="3">周三</st-checkbox-button-item>
      <st-checkbox-button-item :value="4">周四</st-checkbox-button-item>
      <st-checkbox-button-item :value="5">周五</st-checkbox-button-item>
      <st-checkbox-button-item :value="6">周六</st-checkbox-button-item>
      <st-checkbox-button-item :value="7">周日</st-checkbox-button-item>
    </st-checkbox-button-group>

    <table :class="bTable()">
      <tr>
        <th>时间段</th>
        <th>00:00</th>
        <th>06:00</th>
        <th>12:00</th>
        <th>18:00</th>
        <th>24:00</th>
        <th>操作</th>
      </tr>
      <tr v-show="isShowDay(n)" v-for="n in 7" :key="n">
        <td>{{n | dayFilter}}</td>
        <td colspan="5">
          <a-slider range :defaultValue="[20, 50]"></a-slider>
        </td>
        <td>
          <a-popover placement="bottomRight">
            <div slot="content">
              <a-checkbox-group v-model="selectedDaysCheckbox">
                <a-checkbox
                  @change="onCopyDayChange(1,n)"
                  :value="1"
                  :disabled="isDisabledCopyDay(1,n)"
                >周一</a-checkbox>
                <br>
                <a-checkbox
                  @change="onCopyDayChange(2,n)"
                  :value="2"
                  :disabled="isDisabledCopyDay(2,n)"
                >周二</a-checkbox>
                <br>
                <a-checkbox
                  @change="onCopyDayChange(3,n)"
                  :value="3"
                  :disabled="isDisabledCopyDay(3,n)"
                >周三</a-checkbox>
                <br>
                <a-checkbox
                  @change="onCopyDayChange(4,n)"
                  :value="4"
                  :disabled="isDisabledCopyDay(4,n)"
                >周四</a-checkbox>
                <br>
                <a-checkbox
                  @change="onCopyDayChange(5,n)"
                  :value="5"
                  :disabled="isDisabledCopyDay(5,n)"
                >周五</a-checkbox>
                <br>
                <a-checkbox
                  @change="onCopyDayChange(6,n)"
                  :value="6"
                  :disabled="isDisabledCopyDay(6,n)"
                >周六</a-checkbox>
                <br>
                <a-checkbox
                  @change="onCopyDayChange(7,n)"
                  :value="7"
                  :disabled="isDisabledCopyDay(7,n)"
                >周日</a-checkbox>
              </a-checkbox-group>
            </div>
            <a href="javascript:;">复制到</a>
          </a-popover>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'StCardHourPicker',
  bem: {
    b: 'st-card-hour-picker',
    bTable: 'st-card-hour-picker-table'
  },
  filters: {
    dayFilter(n) {
      return {
        1: '周一',
        2: '周二',
        3: '周三',
        4: '周四',
        5: '周五',
        6: '周六',
        7: '周日'
      }[n]
    }
  },
  methods: {
    isShowDay(day) {
      return this.selectedDays.indexOf(day) > -1
    },
    isDisabledCopyDay(day, n) {
      return !this.isShowDay(day) || day === n
    },
    onCopyDayChange(day, n) {
      console.log(n, day)
    }
  },
  data() {
    return {
      selectedDays: [],
      selectedDaysCheckbox: []
    }
  }
}
</script>
