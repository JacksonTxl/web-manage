
<template>
  <div>
    <a-form-item :label-col="{span:2}" :wrapper-col="{ span: 12 }" label="用户等级">
      <a-radio-group buttonStyle="solid" v-model="value.grade">
        <a-radio-button :value="-1">全部用户</a-radio-button>
        <a-radio-button :value="1">潜在用户</a-radio-button>
        <a-radio-button :value="2">正式会员</a-radio-button>
        <a-radio-button :value="3">流失会员</a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item :label-col="{span:2}" :wrapper-col="{ span: 12 }" label="来源方式">
      <a-radio-group buttonStyle="solid" v-model="value.source">
        <a-radio-button :value="-1">全部</a-radio-button>
        <a-radio-button :value="1">外出获取</a-radio-button>
        <a-radio-button :value="2">直接到访</a-radio-button>
        <a-radio-button :value="3">小程序</a-radio-button>
        <a-radio-button :value="4">多人拼团</a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item :label-col="{span:2}" :wrapper-col="{ span: 12 }" label="注册时间">
      <a-range-picker @change="onChange"/>
    </a-form-item>
    <slot name="custom"></slot>
    {{value}}
  </div>
</template>
<script>
export default {
  name: 'stSeleter',
  model: {
    prop: 'value',
    event: 'eventChange'
  },
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    onChange(date, dateString) {
      this.value.register = dateString
    }
  }
}
</script>
