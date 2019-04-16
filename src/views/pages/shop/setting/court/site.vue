<template>
  <st-panel app :class="bPage()">
    <div slot="title">
      动感单车房子
      <img src="~@/assets/img/icon_vip.png" width="26px" alt>
    </div>
    <div slot="actions">
      <span>容纳人数（人）：100</span>
      <span class="mg-l32">座位模版（人）：4</span>
    </div>

    <st-form-table>
      <thead>
        <tr>
          <th>座位</th>
          <th>座位模版名称</th>
          <th>座位数量</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
        </tr>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
        </tr>
      </tbody>
    </st-form-table>
  </st-panel>
</template>

<script>
export default {
  bem: {
    bPage: 'page-shop-setting-court-site'
  },
  data() {
    return {}
  }
}
</script>
