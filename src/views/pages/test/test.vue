<template>
  <div>
    <a-textarea v-model="des" @change="change"></a-textarea>
  </div>
</template>
<script>
export default {
  data() {
    return {
      des: '1'
    }
  },
  methods: {
    change() {
      console.log(this.des)
    }
  }
}
</script>
