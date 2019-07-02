
<template>
<div class="page-dashboard-analysis">
  <a-tabs :defaultActiveKey="key" @change="onChangeTabKey">
    <a-tab-pane tab="用户分析" key="user"> <slot name="user"></slot>  </a-tab-pane>
    <a-tab-pane tab="营销分析" key="marketing" forceRender><slot name="marketing"></slot></a-tab-pane>
  </a-tabs>
  <div class="action">
    <div class="mg-r16">
      <a-radio-group @change="onChangeData" v-model="value">
        <a-radio-button value="a">近7天</a-radio-button>
        <a-radio-button value="b">近15天</a-radio-button>
        <a-radio-button value="c">近30天</a-radio-button>
      </a-radio-group>
    </div>
    <a-input style="width:180px" placeholder="全部活动"></a-input>
  </div>
</div>
</template>
<script>
export default {
  name: 'DashboardTabs',
  data() {
    return {
      key: 'user'
    }
  },
  methods: {
    onChangeData(value) {
      console.log(value)
    },
    onChangeTabKey(key) {
      this.key = key
      this.$emit('change', key)
    }
  }
}
</script>
