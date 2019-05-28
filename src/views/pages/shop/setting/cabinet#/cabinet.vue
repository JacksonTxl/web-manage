<template>
  <div>
    <div>
      <a-checkbox/>
      <span>已选 <span class="color-primary">{{checked.length}}</span> / {{value.length}}</span>
    </div>
    <a-checkbox-group @change="onChange" class="full-width mg-t8">
      <a-row :gutter="16" :class="b()">
        <a-col v-for="(item, index) in value" :key="index" :md="6" :lg="4" :xl="3">
          <div :class="b('item')">
            <div :class="b('item-num')">{{item.serial_number}}</div>
            <div :class="b('item-price')">¥{{item.price_num}}/天</div>
            <a-checkbox :value="item.id" :class="b('checkbox')"/>
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
  },
  data() {
    return {
      checked: []
    }
  },
  methods: {
    onChange(checked) {
      this.checked = checked
      console.log(checked)
      this.$emit('change', checked)
    }
  }
}
</script>
