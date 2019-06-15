
<template>
  <div>
    <a-form-item
      :label-col="{span:2}"
      :wrapper-col="{ span: 12 }"
      :label="shopMemberEnums.member_level.description"
    >
      <a-radio-group buttonStyle="solid" v-model="value.member_level">
        <a-radio-button value="-1">全部用户</a-radio-button>
        <a-radio-button
          :value="key"
          v-for="(item,key,index) in shopMemberEnums.member_level.value"
          :key="index"
        >{{item}}</a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item :label-col="{span:2}" :wrapper-col="{ span: 20 }" label="来源方式">
      <a-radio-group buttonStyle="solid" v-model="value.register_way">
        <a-radio-button value="-1">全部</a-radio-button>
        <a-radio-button
          v-for="(item,key,index) in SourceRegisters"
          :value="key"
          :key="index"
        >{{item}}</a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item :label-col="{span:2}" :wrapper-col="{ span: 12 }" label="注册时间">
      <a-range-picker
        v-model="time"
        v-if="value.register_start_time && value.register_stop_time"
        :defaultValue="[moment(value.register_start_time, dateFormat), moment(value.register_stop_time, dateFormat)]"
        @change="onChange"
      />
      <a-range-picker v-else @change="onChange" v-model="time"/>
    </a-form-item>
    <slot name="custom"></slot>
  </div>
</template>
<script>
import moment from 'moment'
import { SelectService } from './select.service'
import { UserService } from '@/services/user.service'
export default {
  serviceInject() {
    return {
      aService: SelectService,
      userService: UserService
    }
  },
  rxState() {
    /**
     * @type {UserService}
     */
    const user = this.userService
    return {
      shopMemberEnums: user.shopMemberEnums$
    }
  },
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
      dateFormat: 'YYYY/MM/DD',
      time: [],
      SourceRegisters: []
    }
  },
  computed: {},
  created() {
    this.sourceRegisters()
  },
  methods: {
    moment,
    onChange(date, dateString) {
      this.value.register_start_time = dateString[0]
      this.value.register_stop_time = dateString[1]
    },
    sourceRegisters() {
      let self = this
      self.aService.getMemberSourceRegisters().subscribe(status => {
        self.SourceRegisters = status
      })
    },
    handleResetItem() {
      this.time = []
    }
  }
}
</script>
