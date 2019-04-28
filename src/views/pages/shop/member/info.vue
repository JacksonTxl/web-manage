<template>
  <st-panel
    :tabs="[
          { label: '用户资料', route: { name: 'shop-member-info-basic' } },
          { label: '预约上课', route: { name: 'shop-member-info-reserve' } },
          { label: '卡课消费', route: { name: 'shop-member-info-sold' } },
          { label: '员工跟进', route: { name: 'shop-member-info-follow-history' } }
        ]"
  >
    <div slot="actions"></div>
    <router-view></router-view>
  </st-panel>
</template>

<script>
export default {
  name: 'list',
  data() {
    return {}
  },
  methods: {}
}
</script>
