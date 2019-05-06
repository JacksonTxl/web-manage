<template>
  <div>
    <a-tabs defaultActiveKey="1" tabPosition="left" :style="{ height: '200px'}">
      <a-tab-pane tab="Tab 1" key="1">
        <st-panel app>1
        </st-panel>
      </a-tab-pane>
      <a-tab-pane tab="Tab 2" key="2">
        <st-panel app>2
        </st-panel>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
export default {

}
</script>
