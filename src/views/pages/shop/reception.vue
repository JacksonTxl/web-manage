<template>
  <section :class="reception()">
    <div :class="reception('form-block')" class="mg-b24">
      <div :class="reception('form-block-item')" v-for="i in 5" :key="i">
        <div :class="reception('form-block-detail')">
          <div :class="reception('form-block-number')">
            <p>今日签单（单）</p>
            <p>333</p>
          </div>
          <div :class="reception('form-block-chart')"></div>
        </div>
        <div :class="reception('form-block-button')">
          <span>查看详情</span>
          <span>right</span>
        </div>
      </div>
    </div>
    <div :class="reception('operation-list')">
        operation-list
    </div>
    <div :class="reception('member-todoist')">
        member-todoist
    </div>
  </section>
</template>
<script>
export default {
  name: 'PageShopReception',
  bem: {
    reception: 'page-shop-reception'
  }
}
</script>
