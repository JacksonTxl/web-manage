<template>
  <div :class="b('item-content')">
    <span :class="b('item-label')">{{ label }}</span>
    <i-count-up
      :class="b('item-value')"
      class="font-number"
      :endVal="+value"
      :options="{
        prefix: `
    <b>${unit}</b>
    `,
        decimalPlaces: value.toString().includes('.') ? 1 : 0
      }"
      v-if="!isNaN(value)"
    />
    <span v-else class="font-number" :class="b('item-value')">
      --
    </span>
  </div>
</template>

<script>
export default {
  name: 'StTotalItem',
  bem: {
    b: 'st-total'
  },
  props: {
    label: String,
    unit: String,
    value: [String, Number]
  }
}
</script>

<style></style>
