<template>
  <div>
    <p>
      有两个以上容器时需要panel撑开最小高度时使用此组件
    </p>
    <section class="mg-t16 sg-app-content" style="height:400px">
      <st-panel-layout>
        <div style="height:50px;background: #fff;" class="mg-b16">定高50px</div>
        <st-panel app title="hello">
          <div slot="actions">
            <st-button type="primary">操作</st-button>
          </div>
          使用[app]自动撑开高度
        </st-panel>
      </st-panel-layout>
    </section>
  </div>
</template>

<script>
export default {}
</script>
