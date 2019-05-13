<template>
<st-panel app>
  <a-checkbox-group v-model="kael" @change="onChange">
    <a-row>
      <a-col :span="8"><a-checkbox value="A">A</a-checkbox></a-col>
      <a-col :span="8"><a-checkbox value="B">B</a-checkbox></a-col>
      <a-col :span="8"><a-checkbox value="C">C</a-checkbox></a-col>
      <a-col :span="8"><a-checkbox value="D">D</a-checkbox></a-col>
      <a-col :span="8"><a-checkbox value="E">E</a-checkbox></a-col>
    </a-row>
  </a-checkbox-group>
  {{kael}}
</st-panel>
</template>
<script>
export default {
  data() {
    return {
      kael: []
    }
  },
  methods: {
    onChange(data) {
      if (!data.length) {
        this.kael = ['A']
      }
      console.log('checked = ', data)
    }
  }
}
</script>
