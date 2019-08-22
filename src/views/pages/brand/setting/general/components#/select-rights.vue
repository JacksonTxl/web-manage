<template>
  <a-checkbox-group v-model="checked">
    <a-checkbox v-for="(item, index) in value" :key="index" :value="item.id">
      {{ item.rights_name }}
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
  created() {
    this.setChecked()
  },
  watch: {
    value(val) {
      this.setChecked()
    },
    checked(val) {
      this.$emit('change', val)
    }
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
    }
  }
}
</script>
