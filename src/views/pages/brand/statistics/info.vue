<template>
  <div :class="b()" >
     <st-panel
        :tabs="[
          { label: '营收', route: { name: 'brand-statistics-info-revenue',query:{id:$route.query.id} } },
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
  name: 'BrandStatisticsInfo',
  serviceInject() {
    return {
    }
  },
  rxState() {
    return {
    }
  },
  bem: {
    b: 'page-brand-statistics'
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
