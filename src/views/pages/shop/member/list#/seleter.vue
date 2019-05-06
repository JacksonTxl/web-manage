
<template>
  <div>
    <a-form-item :label-col="{span:2}" :wrapper-col="{ span: 12 }" label="用户等级">
      <a-radio-group buttonStyle="solid" v-model="value.member_level">
        <a-radio-button value="-1">全部用户</a-radio-button>
        <a-radio-button value="1">潜在用户</a-radio-button>
        <a-radio-button value="2">正式会员</a-radio-button>
        <a-radio-button value="3">流失会员</a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item :label-col="{span:2}" :wrapper-col="{ span: 12 }" label="来源方式">
      <a-radio-group buttonStyle="solid" v-model="value.register_type">
        <a-radio-button value="-1">全部</a-radio-button>
        <a-radio-button value="1">外出获取</a-radio-button>
        <a-radio-button value="2">直接到访</a-radio-button>
        <a-radio-button value="3">小程序</a-radio-button>
        <a-radio-button value="4">多人拼团</a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item :label-col="{span:2}" :wrapper-col="{ span: 12 }" label="注册时间">
      <a-range-picker
        v-if="value.start_time && value.stop_time"
        :defaultValue="[moment(value.start_time, dateFormat), moment(value.stop_time, dateFormat)]"
        @change="onChange"
      />
      <a-range-picker v-else @change="onChange"/>
    </a-form-item>
    <slot name="custom"></slot>
    {{value}}
  </div>
</template>
<script>
import moment from 'moment'
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
    return {
      dateFormat: 'YYYY/MM/DD'
    }
  },
  computed: {},
  methods: {
    moment,
    onChange(date, dateString) {
      this.value.start_time = dateString[0]
      this.value.stop_time = dateString[1]
    }
  }
}
</script>
