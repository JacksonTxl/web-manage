<template>
  <section class="mg-t16 sg-app-content" style="height:600px">
    <st-panel-layout>
      <div style="height:100px;background: #fff;" class="mg-b16">
        定高的盒子
      </div>
      <st-panel app title="st-panel[app]" loading>
        <div slot="actions">
          <st-button type="primary">操作</st-button>
        </div>
        st-panel[app] 自动撑开高度
      </st-panel>
    </st-panel-layout>
  </section>
</template>

<script>
export default {}
</script>
