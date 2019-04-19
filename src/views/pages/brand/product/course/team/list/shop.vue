<template>
  <div class="page-shop-sale-list-shop">
    <header>
      <div class="page-shop-sale-list-shop__opreation page-shop-sale-list__opreation">
        <st-button type="primary">转入品牌团体课程库</st-button>
        <div>
          <a-select class="mg-r8" defaultValue="" style="width: 120px" @change="handleChange">
            <a-select-option v-for="shop in shops" :key="shop.value" :value="shop.value">{{shop.label}}</a-select-option>
          </a-select>
          <a-select class="mg-r8" defaultValue="lucy" style="width: 120px" @change="handleChange">
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled" disabled>Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>
          <a-select class="mg-r8" defaultValue="lucy" style="width: 120px" @change="handleChange">
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled" disabled>Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>
        </div>
      </div>
    </header>
    <main class="page-shop-sale-list-shop__table mg-t8">
      <team-table-shop :teamCourseList="teamCourseList"></team-table-shop>
    </main>
  </div>
</template>

<script>
import TeamTableShop from './shop#/shop-table'
import { ShopService } from './shop.service'
export default {
  name: 'TeamCourseList',
  serviceInject() {
    return {
      shopService: ShopService
    }
  },
  subscriptions() {
    return {
      teamCourseList: this.shopService.teamCourseList$
    }
  },
  data() {
    return {
      shops: [{ label: '所有门店', value: '' }, { label: '门店A名称', value: '1' }, { label: '门店B名称', value: '2' }, { label: '门店C名称', value: '3' }, { label: '门店D名称', value: '4' }]
    }
  },
  components: {
    TeamTableShop
  }
}
</script>

<style scoped>

</style>
