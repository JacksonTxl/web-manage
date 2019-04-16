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

    <st-form-table hoverable>
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
          <td colspan="4">
            <st-button type="dashed" block>添加座位</st-button>
          </td>
        </tr>
        <tr>
          <td>
            <img width="80px" src="~@/assets/img/icon_vip.png" alt="site-img">
          </td>
          <td>座位模版1</td>
          <td>座位模版2</td>
          <td>
            <modal-link tag="a" :to="{name:'test-sg'}">编辑</modal-link>
            <a-divider type="vertical"></a-divider>
            <modal-link tag="a" :to="{name:'test-sg'}">删除</modal-link>
          </td>
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
