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
      <shop-sale-list-table></shop-sale-list-table>
    </main>
  </div>
</template>

<script>
import ShopSaleListTable from './shop-sale-list#/shop-table'
export default {
  name: 'ShopSaleListShop',
  components: {
    ShopSaleListTable
  }
}
</script>

<style scoped>

</style>
