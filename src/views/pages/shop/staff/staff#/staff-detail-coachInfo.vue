<template>
    <div>
        教练信息
        <a-button type="primary" @click="save">保存</a-button>
        <a-button @click="goNext">保存，并继续添加员工</a-button>
    </div>
</template>
<script>
export default {
  name: 'StaffDetailCoachInfo',
  methods: {
    goNext() {
      let data = {
        isGoNext: true
      }
      this.$emit('goNext', data)
    },
    save() {

    }

  }
}
</script>
