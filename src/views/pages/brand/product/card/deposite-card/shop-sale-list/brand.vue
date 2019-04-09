<template>
  <div class="page-shop-sale-list__brand">
    <header>
      <div class="page-shop-sale-list__brand--opreation">
        <st-button type="primary">转入品牌私教课程库</st-button>
        <div>
          <a-select></a-select><a-select></a-select>
        </div>
      </div>
      <div class="page-shop-sale-list__brand--count mg-t16">
        <span>i</span><span>已选</span>
      </div>
    </header>
    <main class="page-shop-sale-list__brand--table mg-t8">
      <st-table></st-table>
    </main>
  </div>
</template>

<script>
export default {
  name: 'ShopSaleListShop'
}
</script>

<style scoped>

</style>
