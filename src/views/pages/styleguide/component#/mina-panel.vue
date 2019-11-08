<template>
  <section class="mg-t16 sg-app-content" style="height:800px">
    <st-mina-panel>
      <div slot="preview">
        放手机预览
        <h5-container></h5-container>
      </div>
      这里放预览之外的配置
    </st-mina-panel>
  </section>
</template>

<script>
import H5Container from '@/views/biz-components/h5/h5-container'
export default {
  name: 'StMinaPanelDemo',
  components: {
    H5Container
  }
}
</script>
