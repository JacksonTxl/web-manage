<template>
  <section class="sg-section">
    <h3>st-region-cascader</h3>
    <p>默认下使用全局城市tree作为选项 默认使用 {id,name,children作为字段}</p>
    <div>
      <st-region-cascader
        @change="onChange"
        v-model="model"
        placeholder="请选择城市"
      ></st-region-cascader>
      {{ model }}
    </div>
    <p>带search</p>
    <st-region-cascader
      isSearch
      @change="onChange"
      v-model="model2"
    ></st-region-cascader>
    isSearch {{ model2 }}
    <p>自主options</p>
    <st-region-cascader
      placeholder="自定义选择"
      :options="options3"
      @change="onChange"
      v-model="model3"
    ></st-region-cascader>
    自定义 {{ model3 }}
  </section>
</template>

<script>
export default {
  data() {
    return {
      model: [],
      model2: [],
      model3: [],
      options3: [
        {
          id: 1,
          name: '自定义',
          children: []
        }
      ]
    }
  },
  methods: {
    onChange(data) {
      console.log(data)
    }
  }
}
</script>
