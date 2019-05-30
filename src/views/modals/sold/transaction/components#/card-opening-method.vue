<template>
  <st-form-item label="开卡方式" class="mgb-12" required>
    <a-radio-group v-decorator="value.open_type" @change="onChange">
      <a-radio
        v-for="(item,index) in cardInfo.open_type"
        :value="item.open_type"
        :key="index"
      >{{item.open_type | openType}}</a-radio>
    </a-radio-group>
  </st-form-item>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: ['value', 'form', 'cardInfo'],
  data() {
    return {
      value1: 1
    }
  },
  filters: {
    openType(value) {
      let arr = ['即时开卡', '到店开卡', '指定日期开卡']
      return arr[value - 1]
    }
  },
  methods: {
    onChange(e) {
      console.log(e.target.value)
      this.$emit('filterChange', {
        open_type: e.target.value
      })
    }
  }
}
</script>
