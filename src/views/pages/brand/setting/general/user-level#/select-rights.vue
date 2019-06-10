<template>
  <a-checkbox-group
    v-model="checked"
    @change="onChange"
  >
    <a-checkbox
      v-for="(item, index) in value"
      :key="index"
      :value="item.id">
      {{item.right_name}}
    </a-checkbox>
  </a-checkbox-group>
</template>
<script>
export default {
  name: 'SelectRights',
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
