<template>
  <section class="page-test-kael">
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    选择{{JSON.stringify(arr)}}：
    <st-checkbox-facility-group v-model="arr" :disabled="false" @change="gc">
      <st-checkbox-facility-item style="margin-right:20px" icon="home" label="aaa" :value="1" :disabled="true" @change="kael"></st-checkbox-facility-item>
      <st-checkbox-facility-item style="margin-right:20px" icon="home" label="b" :value="2" :disabled="false" @change="kael"></st-checkbox-facility-item>
      <st-checkbox-facility-item style="margin-right:20px" icon="home" label="b" :value="3" :disabled="false" @change="kael"></st-checkbox-facility-item>
      <st-checkbox-facility-item style="margin-right:20px" icon="home" label="b" :value="4" :disabled="false" @change="kael"></st-checkbox-facility-item>
      <st-checkbox-facility-item style="margin-right:20px" icon="home" label="b" :value="5" :disabled="false" @change="kael"></st-checkbox-facility-item>
      <st-checkbox-facility-item style="margin-right:20px" icon="home" label="b" :value="6" :disabled="false" @change="kael"></st-checkbox-facility-item>
      <st-checkbox-facility-item style="margin-right:20px" icon="home" label="b" :value="7" :disabled="false" @change="kael"></st-checkbox-facility-item>
      <st-checkbox-facility-item style="margin-right:20px" icon="home" label="b" :value="8" :disabled="false" @change="kael"></st-checkbox-facility-item>
      <st-checkbox-facility-item icon="home" label="ccc9" :value="9" :disabled="false" @change="kael"></st-checkbox-facility-item>
    </st-checkbox-facility-group>
  </section>
</template>
<script>
export default {
  data() {
    return {
      arr: [1]
    }
  },
  methods: {
    kael(data) {
      console.log(data)
    },
    gc(data) {
      console.log(data)
    }
  },
  mounted() {
    setTimeout(i => {
      this.arr = [6, 7, 8, 10, 11, 23]
    }, 2000)
  }
}
</script>
