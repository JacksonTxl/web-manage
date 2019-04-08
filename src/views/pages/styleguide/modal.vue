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
        <modal-link tag="st-button" :to="{ name: 'test-sg',on:{ok:onOk} }">test-sg</modal-link>
      </st-panel>
    </section>

    <p>手动触发模态窗弹出</p>

    <section class="sg-app-content">
      <st-panel>
        <button @click="onCustomClick">手动弹出莫泰窗</button>
      </st-panel>
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    onOk() {
      console.log('接受ok事件')
    },
    onCustomClick() {
      this.$modalRouter.push({
        name: 'test-sg',
        on: {
          ok: this.onOk
        }
      })
    }
  }
}
</script>
