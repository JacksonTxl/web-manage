<template>
  <st-form-item label="规格" class="mgb-12">
    <a-radio-group v-decorator="value.test_time" @change="onChange">
      <a-radio
        v-for="(item,index) in cardInfo.price"
        :key="index"
        :value="index"
      >{{item.num}}{{item.unit | unitType}}/{{item.rally_price}}元</a-radio>
    </a-radio-group>
  </st-form-item>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: ['value', 'cardInfo'],
  filters: {
    unitType(value) {
      let arr = ['次', '天', '月', '年']
      return arr[value - 1]
    }
  },
  methods: {
    onChange(e) {
      this.$emit('filterChange', { price: this.cardInfo.price[e.target.value] })
    }
  }
}
</script>
