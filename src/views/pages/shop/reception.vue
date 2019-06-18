<template>
  <section :class="reception()">
    <div :class="reception('form-block')">
        form-block
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
