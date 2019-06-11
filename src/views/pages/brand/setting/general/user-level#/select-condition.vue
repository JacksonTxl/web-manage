<template>
  <a-popover placement="bottomRight" trigger="click" class="slider-copy-bottom">
    <template slot="content">
      <a-checkbox-group
        class="slider-copy"
        v-model="checked"
        @change="onChange"
      >
        <div v-for="(item, index) in value" :key="index">
          <a-checkbox :value="item.id">
            {{item.condition_name}}
          </a-checkbox>
        </div>
      </a-checkbox-group>
    </template>
    <a href="javascript: void(0);">
      任选其一即升级
      <st-icon type="down"></st-icon>
    </a>
  </a-popover>
</template>
<script>
export default {
  name: 'SelectCondition',
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
  watch: {
    value(val) {
      this.setChecked()
    }
  },
  created() {
    this.setChecked()
    this.onChange(this.checked)
  },
  methods: {
    setChecked() {
      const value = this.value
      const checked = []
      value.forEach(item => {
        if (item.checked) {
          checked.push(item.id)
        }
      })
      this.checked = checked
    },
    onChange(val) {
      this.$emit('change', val)
    }
  }
}
</script>
