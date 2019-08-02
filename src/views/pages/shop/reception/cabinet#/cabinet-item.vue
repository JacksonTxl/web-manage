<template>
  <div :class="`${b()} ${b()}--${value.status}`">
    <div :class="`${b('num')} ${b('num')}--${value.status}`">
      {{ value.num }}
    </div>
    <div v-if="!unavailable">
      <div :class="b('name')">{{ value.name }}</div>
      <div :class="b('date')" class="mg-t8">{{ value.date }}</div>
      <div :class="b('time')">{{ value.time }}</div>
    </div>
    <div v-else>
      <div :class="b('des')">柜门损坏</div>
    </div>
    <div :class="`${b('status')} ${b('status')}--${value.status}`">
      <st-tag v-if="available" type="cabinet-available" />
      <st-tag v-if="inuse" type="cabinet-inuse" />
      <span v-if="unavailable">不可用</span>
    </div>
    <div v-if="!unavailable" :class="b('price')">
      {{ value.price }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'CabinetItem',
  bem: {
    b: 'st-cabinet-item'
  },
  props: {
    value: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    available() {
      return this.value.status === 'available'
    },
    inuse() {
      return this.value.status === 'inuse'
    },
    unavailable() {
      return this.value.status === 'unavailable'
    }
  }
}
</script>
