<template>
  <div :class="bComponent()">
    <div :class="bComponent('title')">{{info.title}}</div>
    <div :class="bComponent('content')">
      <div :class="bComponent('text')">{{info.notify_time.name}}</div>
      <div :class="bComponent('text')">{{info.notify_type.name}}</div>
      <div :class="bComponent('text')">
        <st-switch v-model="params.notify_mode.sms"></st-switch>
      </div>
      <div :class="bComponent('text')" v-if="info.notify_type.value===1">
        <!-- v-model="info.notify_mode.mini_programs.value" -->
        <st-switch v-model="params.notify_mode.mini_programs"></st-switch>
        <span
          class="color-primary mg-l12"
          v-show="params.notify_mode.mini_programs"
          type="primary"
          v-modal-link="{
                name: 'brand-setting-sms-notice',
                props:{
                  img:info.img_url
                }
              }"
        >预览</span>
      </div>
      <div :class="bComponent('text')" v-if="info.notify_type.value===2">
        <st-switch v-model="params.notify_mode.app"></st-switch>
      </div>
      <div v-show="params.notify_mode.sms">
        <div class="shadow"></div>
        <div :class="bComponent('column')" v-show="!isShowEdit">
          <div class="width75" :class="bComponent('text')" v-if="info.preview">
            <span>预览内容</span>
            <span class="mg-l24">{{info.preview}}</span>
          </div>
          <div class="width75" :class="bComponent('text')" v-if="info.receiver_description">
            <span>接受人员</span>
            <span class="mg-l24">{{info.receiver_description}}</span>
          </div>
          <div class="width75" :class="bComponent('text')" v-if="info.course_type_description">
            <span>课程类型</span>
            <span class="mg-l24">{{info.course_type_description}}</span>
          </div>
          <div class="width75" :class="bComponent('text')" v-if="info.order_type_description">
            <span>订单类型</span>
            <span class="mg-l24">{{info.order_type_description}}</span>
          </div>
          <div :class="bComponent('text')">
            <span class="color-primary" @click="showEdit">编辑</span>
          </div>
        </div>
        <div :class="bComponent('column')" v-show="isShowEdit">
          <div class="width75" :class="bComponent('text')">
            <div class="mg-b16" v-if="info.preview">
              <span clas="mg-r24">发送内容</span>
              <a-input
                class="mg-l24"
                :class="bComponent('column-input')"
                v-model="params.msg_preffix"
                placeholder="请输入"
              ></a-input>
              <span>{{info.content}}</span>
              <a-input
                :class="bComponent('column-input')"
                v-model="params.msg_suffix"
                placeholder="请输入"
              ></a-input>
            </div>

            <div v-if="info.course_type_description">
              <span>课程类型</span>
              <a-radio-group v-model="params.course_type" class="mg-b16 mg-l24">
                <a-radio
                  v-for="(item,index) in courseType"
                  :key="index"
                  :value="item.value"
                >{{item.label}}</a-radio>
              </a-radio-group>
            </div>

            <div v-if="info.receiver_description">
              <span>接收人员</span>
              <a-checkbox-group v-model="params.receiver" class="mg-b16 mg-l24">
                <a-checkbox
                  v-for="(item, index) in receiver"
                  :key="index"
                  :value="item.value"
                >{{item.label}}</a-checkbox>
              </a-checkbox-group>
              <a-checkbox v-model="isShowPhone">自定义</a-checkbox>
              <a-input
                style="width:44%"
                class="mg-b16"
                v-show="isShowPhone"
                v-model="params.custom_phone"
                placeholder="请输入手机号码，多个用逗号分隔"
              />
            </div>

            <div v-if="info.order_type_description">
              <span>订单类型</span>
              <a-checkbox-group v-model="params.order_type" class="mg-b16 mg-l24">
                <a-checkbox
                  v-for="(item,index) in orderType"
                  :key="index"
                  :value="item.value"
                >{{item.label}}</a-checkbox>
              </a-checkbox-group>
            </div>
            <div v-if="info.notify_time.name">
              <div v-if="info.notify_sub_type.value===4">
                课程开始前
                <a-select v-model="params.notify_time" style="width:100px">
                  <a-select-option
                    v-for="(item,index) in notifyHour"
                    :key="index"
                    :value="item.value"
                  >{{item.label}}</a-select-option>
                </a-select>发送
              </div>
              <div v-else>
                <span>发送规则</span>
                <a-radio-group v-model="params.notify_time" class="mg-b16 mg-l24">
                  <a-radio
                    v-for="(item,index) in notifyRule"
                    :key="index"
                    :value="item.value"
                  >{{item.label}}</a-radio>
                </a-radio-group>
              </div>
            </div>
          </div>
          <div :class="bComponent('text')">
            <span class="color-primary mg-r12" @click="cancel">取消</span>
            <span class="color-primary" @click="save">保存</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { UserService } from '@/services/user.service'

const componentName = 'notice-item'
export default {
  name: 'NoticeItem',
  bem: {
    bComponent: componentName
  },
  serviceInject() {
    return {
      userService: UserService
    }
  },
  rxState() {
    const user = this.userService
    return {
      settingEnums: user.settingEnums$
    }
  },
  data() {
    return {
      isShowContent: 0,
      isShowPre: 0,
      isShowEdit: 0,
      isShowPhone: false, // 默认不展示输入手机号
      rule: {},
      params: {
        id: '',
        msg_suffix: '',
        msg_preffix: '',
        custom_phone: '',
        course_type: '',
        order_type: [],
        receiver: [],
        notify_time: '',
        notify_mode: {
          sms: 0,
          app: 0,
          mini_programs: 0
        }
      }
    }
  },
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    courseType() {
      let list = []
      if (!this.settingEnums.course_type_web) return list
      Object.entries(this.settingEnums.course_type_web.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    },
    receiver() {
      let list = []
      if (!this.settingEnums.receiver_type) return list
      Object.entries(this.settingEnums.receiver_type.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    },
    orderType() {
      let list = []
      if (!this.settingEnums.order_type_web) return list
      Object.entries(this.settingEnums.order_type_web.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    },
    notifyRule() {
      let list = []
      if (!this.settingEnums.notify_rule) return list
      Object.entries(this.settingEnums.notify_rule.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    },
    notifyHour() {
      let list = []
      if (!this.settingEnums.notify_time_hour) return list
      Object.entries(this.settingEnums.notify_time_hour.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    }
  },
  created() {
    this.params.order_type = this.info.order_type
    this.params.course_type = this.info.course_type
    this.params.receiver = this.info.receiver
    this.params.msg_preffix = this.info.msg_preffix
    this.params.msg_suffix = this.info.msg_suffix
    this.params.notify_mode = {
      sms: this.info.notify_mode.sms && this.info.notify_mode.sms.value,
      app: this.info.notify_mode.app && this.info.notify_mode.app.value,
      mini_programs:
        this.info.notify_mode.mini_programs &&
        this.info.notify_mode.mini_programs.value
    }
  },
  methods: {
    showEdit() {
      this.isShowEdit = 1
    },
    cancel() {
      this.isShowEdit = 0
    },
    save() {
      const para = Object.assign({}, this.params, {
        id: this.info.id,
        custom_phone:
          this.params.custom_phone.length > 0
            ? this.params.custom_phone.split(',')
            : []
      })
      this.$emit('editInfo', para)
      this.isShowEdit = 0
    }
  },
  watch: {
    // isShowPhone(oldVal, newVal) {
    //   if (oldVal) {
    //     this.params.receiver = []
    //   }
    // },
    // ['params.receiver'](oldVal, newVal) {
    //   if (oldVal.length > 0) {
    //     this.isShowPhone = false
    //   }
    // }
  }
}
</script>
