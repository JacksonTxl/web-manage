<template>
  <div>
    <page-add :isCopy="true"></page-add>
  </div>
</template>

<script>
import PageAdd from './add'
export default {
  name: 'CopyActivity',
  components: {
    PageAdd
  }
}
</script>
