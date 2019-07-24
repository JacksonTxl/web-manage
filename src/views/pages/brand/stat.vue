<template>
  <div :class="b()" >
     <st-panel
        :tabs="[
          { label: '营收', route: { name: 'brand-stat-revenue',query:{id:$route.query.id} } },
          { label: '订单', route: { name: 'shop-member-info-follow-history',query:{id:$route.query.id} }},
          { label: '用户', route: { name: 'shop-member-info-sold',query:{id:$route.query.id} } },
          { label: '课程', route: { name: 'shop-member-info-reserve',query:{id:$route.query.id} } },
          { label: '营销', route: { name: 'shop-member-info-sales-interests' ,query:{id:$route.query.id}} },
        ]"
    >
      <router-view></router-view>
    </st-panel>
  </div>
</template>

<script>
export default {
  name: 'BrandStatInfo',
  serviceInject() {
    return {
    }
  },
  rxState() {
    return {
    }
  },
  bem: {
    b: 'page-brand-stat'
  },
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {

  },
  components: {
  }
}
</script>
