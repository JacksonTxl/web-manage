
<template>
  <div>
    <title-info v-model="titleData" style="margin-bottom:44px"></title-info>
    <span style="margin-right:16px">选择性别</span>
    <a-radio-group name="radioGroup" v-model="value.getData.base_sex" @change="onChange">
      <a-radio :value="JSON.stringify({name: '男', value: 1})">男</a-radio>
      <a-radio :value="JSON.stringify({name: '女', value: 2})">女</a-radio>
    </a-radio-group>
  </div>
</template>
<script>
import titleInfo from './title-info.vue'
export default {
  model: {
    type: 'value',
    event: 'dataChangge'
  },
  props: {
    value: Object
  },
  components: {
    titleInfo
  },
  data() {
    return {
      titleData: {
        title: '性别',
        info: '满足一下性别属性的用户'
      }
    }
  },
  methods: {
    onChange(event) {
      this.value.getData.base_sex = event.target.value
      console.log(this.value.getData.base_sex)
      this.$emit('dataChangge', this.value)
    }
  },
  mounted() {}
}
</script>
