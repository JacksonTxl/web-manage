<template>
  <div>
    <a-radio-group :value="checked" @change="onChange">
      <a-radio :style="radioStyle" :key="1" :value="BATCH_TYPE.SELECTED">
        已选当前{{ ids.length }}条数据
      </a-radio>
      <a-radio
        :style="radioStyle"
        :key="2"
        :value="BATCH_TYPE.CONDITION"
        :disabled="total > BATCH_INFO.LIMIT_NUM"
      >
        已选现有筛选条件下全部的{{ total }}条数据
      </a-radio>
    </a-radio-group>
  </div>
</template>
<script>
import { BATCH_TYPE, BATCH_INFO } from '@/constants/common/batch-operation'
export default {
  name: 'StBatchSelectRadio',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    ids: {
      type: Array,
      required: true
    },
    total: {
      type: Number,
      default: 0
    },
    checked: {
      type: Number
    }
  },
  data() {
    return {
      BATCH_TYPE,
      BATCH_INFO,
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      }
    }
  },
  methods: {
    onChange(event) {
      this.$emit('change', event.target.value)
    }
  }
}
</script>
