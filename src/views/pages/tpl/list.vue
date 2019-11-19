<template>
  <st-panel app>
    <st-search-panel slot="prepend" @search="onSearch" @reset="onReset">
      <st-search-panel-item label="卡类别:"></st-search-panel-item>
    </st-search-panel>

    <st-table :dataSource="[]"></st-table>
  </st-panel>
</template>

<script>
export default {
  methods: {
    onSearch() {},
    onReset() {}
  }
}
</script>
