<template>
  <div>
    <page-add :isUpdate="true"></page-add>
  </div>
</template>

<script>
import PageAdd from './add'
export default {
  name: 'EditActivity',
  components: {
    PageAdd
  }
}
</script>
