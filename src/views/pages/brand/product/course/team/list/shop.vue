<template>
  <div class="page-shop-sale-list-shop">
    <header>
      <div class="page-shop-sale-list-shop__opreation page-shop-sale-list__opreation">
        <st-button type="primary">转入品牌团体课程库</st-button>
        <div>
          <a-select></a-select><a-select></a-select>
        </div>
      </div>
    </header>
    <main class="page-shop-sale-list-shop__table mg-t8">
      <team-table-shop></team-table-shop>
    </main>
  </div>
</template>

<script>
import TeamTableShop from './shop#/shop-table'
export default {
  name: 'ShopSaleListShop',
  components: {
    TeamTableShop
  }
}
</script>

<style scoped>

</style>
