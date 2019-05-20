<template>
  <st-panel
    :tabs="[
          { label: '底薪模板', route: { name: 'brand-finance-salary-template-basic' } },
          { label: '业绩模板', route: { name: 'brand-finance-salary-template-performance' } }
        ]"
  >
    <div slot="actions"></div>
    <router-view></router-view>
  </st-panel>
</template>
<script>
export default {

}
</script>
