<template>
  <div>
    <h3>弹出层类</h3>
    <p>
      vue-modal-router 文档请查看
      <a
        target="_blank"
        href="https://www.npmjs.com/package/vue-modal-router"
      >vue-modal-router</a>
    </p>
    <p>这里的模态窗名称同modals文件夹下的模态窗路径</p>
    <section class="sg-app-content">
      <st-panel>
        <modal-link tag="st-button" :to="{ name: 'test-sg',on:{ok:onOk} }">使用组件test-sg</modal-link>
        <button class="mg-l16" @click="onCustomClick">使用api</button>
      </st-panel>
    </section>

    <h3>常用业务模态窗</h3>
    <section class="sg-app-content">
      <st-panel>

      </st-panel>
    </section>
  </div>
</template>

<script>
export default {

}
</script>
