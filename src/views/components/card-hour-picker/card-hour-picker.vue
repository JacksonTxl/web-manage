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
      <tr>
        <td>周一</td>
        <td colspan="5">
          <a-slider range :defaultValue="[20, 50]"></a-slider>
        </td>
        <td>
          <a-popover>
            <div slot="content">
              <a-checkbox-group v-model="selectedDaysCheckbox">
                <a-checkbox :value="1">周一</a-checkbox>
                <br>
                <a-checkbox :value="2">周二</a-checkbox>
                <br>
                <a-checkbox :value="3">周三</a-checkbox>
                <br>
                <a-checkbox :value="4">周四</a-checkbox>
                <br>
                <a-checkbox :value="5">周五</a-checkbox>
                <br>
                <a-checkbox :value="6">周六</a-checkbox>
                <br>
                <a-checkbox :value="7">周日</a-checkbox>
              </a-checkbox-group>
            </div>
            <a href="javascript:;">复制到</a>
          </a-popover>
        </td>
      </tr>
      <tr>
        <td>周二</td>
        <td colspan="5">
          <a-slider></a-slider>
        </td>
        <td>复制到</td>
      </tr>
      <tr>
        <td>周三</td>
        <td colspan="5">
          <a-slider></a-slider>
        </td>
        <td>复制到</td>
      </tr>
      <tr>
        <td>周四</td>
        <td colspan="5">
          <a-slider></a-slider>
        </td>
        <td>复制到</td>
      </tr>
      <tr>
        <td>周五</td>
        <td colspan="5">
          <a-slider></a-slider>
        </td>
        <td>复制到</td>
      </tr>
      <tr>
        <td>周六</td>
        <td colspan="5">
          <a-slider></a-slider>
        </td>
        <td>复制到</td>
      </tr>
      <tr>
        <td>周日</td>
        <td colspan="5">
          <a-slider></a-slider>
        </td>
        <td>复制到</td>
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
  data() {
    return {
      selectedDays: [],
      selectedDaysCheckbox: []
    }
  }
}
</script>
