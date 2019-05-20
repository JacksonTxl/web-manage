<template>
  <st-panel app>
    <st-search-panel>
      <div style="display: flex;align-items: center;margin:16px 0;">
        <span style="width:70px;">条件1：</span>
        <st-search-radio v-model="kael" @change="onkael" :list="list"></st-search-radio>
      </div>
      {{kael}}
      <div slot="button">
        <st-button type="primary">查询1</st-button>
        <st-button class="mgl-8">重置1</st-button>
      </div>
    </st-search-panel>
  </st-panel>
</template>
<script>
export default {
  data() {
    return {
      kael: 3,
      list: [{
        value: 1,
        label: '在呢'
      }, {
        value: 2,
        label: '好吧'
      }, {
        value: 3,
        label: '睡觉'
      }]
    }
  },
  methods: {
    onkael(data) {
      console.log(data)
    }
  }
}
</script>
