<template>
  <div :class="bComponent()">
    <div :class="bComponent('title')">{{info.title}}</div>
    <div :class="bComponent('content')">
      <div :class="bComponent('text')">{{info.notify_time.name}}</div>
      <div :class="bComponent('text')">{{info.notify_type.name}}</div>
      <div :class="bComponent('text')">
        <st-switch v-model="info.notify_mode.mini_programs.value"></st-switch>
      </div>
      <div :class="bComponent('text')" v-if="info.notify_type.value===1">
        <!-- v-model="info.notify_mode.mini_programs.value" -->
        <st-switch @change="onChange" ></st-switch>
        <span class="color-primary mg-l12" v-show="info.notify_mode.mini_programs.value">预览</span>
      </div>
      <!-- <div :class="bComponent('text')" v-if="info.notify_type.value===2">
        <st-switch v-model="info.notify_mode.app.value"></st-switch>
        <span class="color-primary mg-l12" v-show="info.notify_mode.app.value">预览</span>
      </div>-->
      <div v-show="info.notify_mode.sms.value">
        <div :class="bComponent('column')" class="shadow" v-show="!isShowEdit">
          <div style="width:75%" :class="bComponent('text')" v-if="info.preview">
            <span>短信预览</span>
            <span class="mg-l24">{{info.preview}}</span>
          </div>
          <div style="width:75%" :class="bComponent('text')" v-if="info.receiver_description">
            <span>接受人员</span>
            <span class="mg-l24">{{info.receiver_description}}</span>
          </div>
          <div style="width:75%" :class="bComponent('text')" v-if="info.course_type_description">
            <span>课程类型</span>
            <span class="mg-l24">{{info.course_type_description}}</span>
          </div>
          <div style="width:75%" :class="bComponent('text')" v-if="info.order_type_description">
            <span>订单类型</span>
            <span class="mg-l24">{{info.order_type_description}}</span>
          </div>
          <span class="color-primary" :class="bComponent('text')" @click="showEdit">编辑</span>
        </div>
        <div :class="bComponent('column')" class="shadow" v-show="isShowEdit">
          <div style="width:75%" :class="bComponent('text')">
            <div class="mg-b16" v-if="info.preview">
              <span clas="mg-r24">发送内容</span>
              <a-input
                class="mg-l24"
                :class="bComponent('column-input')"
                v-model="params.msg_preffix"
                :defaultValue="info.msg_preffix"
                placeholder="请输入"
              ></a-input>
              <span>{{info.content}}</span>
              <a-input
                :class="bComponent('column-input')"
                v-model="params.msg_suffix"
                :defaultValue="info.msg_suffix"
                placeholder="请输入"
              ></a-input>
            </div>
            <!-- v-if="info.course_type_description" -->
            <div>
              <span>课程类型</span>
              <a-radio-group v-model="params.course_type" class="mg-b16 mg-l24">
                <a-radio
                  v-for="(item,index) in courseType"
                  :key="index"
                  :value="item.value"
                >{{item.label}}</a-radio>
              </a-radio-group>
            </div>
            <!-- v-if="info.receiver_description" -->
            <div>
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
                v-show="isShowPhone"
                v-model="params.custom_phone"
                placeholder="请输入手机号码，多个用逗号分隔"
              />
            </div>
            <!-- v-if="info.order_type_description" -->
            <div>
              <span>订单类型</span>
              <a-checkbox-group v-model="params.order_type" class="mg-b16 mg-l24">
                <a-checkbox
                  v-for="(item,index) in orderType"
                  :key="index"
                  :value="item.value"
                >{{item.label}}</a-checkbox>
              </a-checkbox-group>
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
      default: () => {

      }
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
    }
  },
  created() {},
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
        custom_phone: this.params.custom_phone.split(','),
        notify_mode: {
          sms: this.info.notify_mode.sms.value,
          app: this.info.notify_mode.app.value,
          mini_programs: this.info.notify_mode.mini_programs.value
        }
      })
      this.$emit('editInfo', para)
    },
    onChange(para) {
      this.test = para
      console.log(para)
    }
  },
  watch: {
    isShowPhone(oldVal, newVal) {
      this.params.receiver = []
    }
  }
}
</script>
