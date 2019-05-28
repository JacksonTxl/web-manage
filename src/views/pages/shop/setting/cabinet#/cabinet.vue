<template>
  <div>
    <div>
      <a-checkbox/>
      <span>已选 <span class="color-primary">2</span> / 12</span>
    </div>
    <a-checkbox-group class="full-width mg-t8">
      <a-row :gutter="16" :class="b()">
        <a-col v-for="(item, index) in value" :key="index" :md="6" :lg="4" :xl="3">
          <div :class="b('item')">
            <div :class="b('item-num')">{{item.serial_number}}</div>
            <div :class="b('item-price')">{{item.price}}</div>
            <a-checkbox :class="b('checkbox')"/>
          </div>
        </a-col>
      </a-row>
    </a-checkbox-group>
  </div>
</template>
<script>
export default {
  bem: {
    b: 'st-setting-cabinet'
  },
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
