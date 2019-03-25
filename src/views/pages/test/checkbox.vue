<template>
  <stCheckboxGroup :name1="`kael`">
    <stCheckboxItem :value="0" :disabled="false" :label="`Monday`" @change="itemChange">周一</stCheckboxItem>
    <stCheckboxItem :value="1" :disabled="false">周二</stCheckboxItem>
    <stCheckboxItem :value="2" :disabled="true">周三</stCheckboxItem>
    <stCheckboxItem :value="3" :disabled="true">周四</stCheckboxItem>
    <stCheckboxItem :value="4" :disabled="true">周五</stCheckboxItem>
    <stCheckboxItem :value="5" :disabled="true">周六</stCheckboxItem>
    <stCheckboxItem :value="6" :disabled="true">周日</stCheckboxItem>
    {{}}
  </stCheckboxGroup>
</template>
<script>
import stCheckboxGroup from '@/views/components/checkbox-group.vue'
import stCheckboxItem from '@/views/components/checkbox-item.vue'

export default {
  data() {
    return {

    }
  },
  components: {
    stCheckboxGroup,
    stCheckboxItem
  },
  methods: {
    itemChange(data) {
      console.log(data)
    }
  }
}
</script>
<style lang="less" scoped>

</style>
