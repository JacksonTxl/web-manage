<template>
  <st-mina-panel>
    <h5-container slot="preview" fixed>
      haha
    </h5-container>
    <st-plugin-form-title>
      功能入口
      <!-- <span slot="desc">这是描述</span> -->
    </st-plugin-form-title>
    <st-hr></st-hr>
    <st-plugin-form-title>
      教练风采
      <span slot="desc">
        最多添加100个教练
      </span>
    </st-plugin-form-title>

    <template slot="actions">
      <st-button type="primary">下一步</st-button>
      <st-button class="mg-l8">取消</st-button>
    </template>
  </st-mina-panel>
</template>

<script>
import H5Container from '@/views/biz-components/h5/h5-container.vue'
export default {
  components: {
    H5Container
  }
}
</script>
