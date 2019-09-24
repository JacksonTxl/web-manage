<template>
  <div>
    <h2>Biz-Components 业务组件类（按需引入）</h2>
    <p>
      组件具体的使用方式还是需要查看@/views/biz-components/*.vue
    </p>
    <div class="sg">
      <div class="sg__sider">
        <a-anchor :offsetTop="160">
          <a-anchor-link
            v-for="demo in demos"
            :key="demo.id"
            :href="'#' + demo.id"
            :title="demo.id + ' ' + demo.title"
          ></a-anchor-link>
        </a-anchor>
      </div>
      <div class="sg__main">
        <component
          v-for="demo in demos"
          :key="demo.id"
          :id="demo.id"
          :is="'demo-' + demo.id"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import demoComponents from './biz-component#/index'
export default {
  components: demoComponents,
  computed: {
    demos() {
      return [
        { id: 'checkbox-facility', title: '标题' },
        { id: 'coupon-tag', title: '优惠券' },
        { id: 'shop-hour-picker', title: '门店时间选择' },
        { id: 'member-search', title: '会员搜索' }
      ]
    }
  }
}
</script>
