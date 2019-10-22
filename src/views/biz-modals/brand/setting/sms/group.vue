<template>
  <st-modal
    :bModal="bModal()"
    title="群发短信"
    v-model="show"
    @ok="save"
    @cancel="cancel"
  >
    <st-form :form="form">
      <st-form-item labelWidth="70px" label="接受对象">
        <a-radio-group
          v-decorator="decorators.user_type"
          @change="getCurPrizUserType"
        >
          <a-radio
            v-for="(item, index) in userType"
            :key="index"
            :value="item.value"
          >
            {{ item.label }}
          </a-radio>
        </a-radio-group>
        <a-textarea
          v-if="curUser === USER_TYPES.USER"
          v-model="tel"
          placeholder="输入手机号,每行一个"
        ></a-textarea>
        <a-radio-group
          v-decorator="decorators.send_value"
          v-show="curUser === USER_TYPES.CROWD"
        >
          <a-radio-button
            v-for="(item, index) in crowdList"
            :key="index"
            :value="item.crowd_id"
          >
            {{ item.crowd_name }}
          </a-radio-button>
        </a-radio-group>
      </st-form-item>
      <st-form-item labelWidth="70px" label="发送时间">
        <a-radio-group
          v-decorator="decorators.send_type"
          @change="getCurTimeType"
        >
          <a-radio
            v-for="(item, index) in sendType"
            :key="index"
            :value="item.value"
          >
            {{ item.label }}
          </a-radio>
        </a-radio-group>
        <a-date-picker
          v-show="curTime === SEND_TYPES.ONTIME"
          :disabledDate="disabledStartDate"
          placeholder="请选择时间"
          format="YYYY-MM-DD HH:mm"
          showTime
          v-decorator="decorators.send_time"
        ></a-date-picker>
      </st-form-item>
      <st-form-item labelWidth="70px" label="编辑短信">
        <a-radio-group v-model="curTem" @change="getCurTemType">
          <a-radio
            v-for="(item, index) in tmplType"
            :key="index"
            :value="item.value"
          >
            {{ item.label }}
          </a-radio>
        </a-radio-group>
        <a-textarea
          class="mg-b24"
          v-if="curTem === TMPL_TYPES.PERSONAL"
          v-decorator="decorators.content"
          placeholder="请输入【签名】"
        ></a-textarea>
        <a-input
          v-if="curTem === TMPL_TYPES.PERSONAL"
          v-decorator="decorators.title"
          placeholder="请输入模版标题"
        ></a-input>
        <a-select
          class="mg-b8"
          v-show="curTem === TMPL_TYPES.CUSTOM"
          placeholder="请选择模版"
          @change="getCurTemContent"
          v-decorator="decorators.tmpl_id"
        >
          <a-select-option
            :value="item.tmpl_id"
            v-for="item in templateList"
            :key="item.tmpl_id"
          >
            {{ item.title }}
          </a-select-option>
        </a-select>
        <a-textarea
          v-if="curTem === TMPL_TYPES.CUSTOM"
          disabled
          :value="temContent"
        ></a-textarea>
      </st-form-item>
    </st-form>
  </st-modal>
</template>
<script>
import { ruleOptions } from './group.config'
import { GroupService } from './group.service'
import { USER_TYPES, SEND_TYPES, TMPL_TYPES } from '@/constants/setting/sms'
import { MessageService } from '@/services/message.service'

export default {
  name: 'SettingSmsGroup',
  bem: {
    bModal: 'setting-sms-group'
  },
  serviceInject() {
    return {
      groupService: GroupService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      loading: this.groupService.loading$,
      templateList: this.groupService.templateList$,
      userType: this.groupService.userType$,
      tmplType: this.groupService.tmplType$,
      sendType: this.groupService.sendType$,
      crowdList: this.groupService.crowdList$
    }
  },
  props: {
    id: {
      type: String
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      USER_TYPES,
      SEND_TYPES,
      TMPL_TYPES,
      show: false,
      curUser: USER_TYPES.USER,
      curTem: TMPL_TYPES.PERSONAL,
      curTime: SEND_TYPES.NOW,
      temContent: '',
      tel: '',
      info: {},
      time: ''
    }
  },
  created() {
    this.getCrowdList()
    this.getTemplateOptionList()
  },
  mounted() {
    // 编辑
    if (this.id) {
      this.getEditInfo(this.id)
    }
  },
  methods: {
    cancel() {},
    getCrowdList() {
      return this.groupService.getCrowdList().subscribe()
    },
    getTemplateOptionList() {
      return this.groupService.getTemplateOptionList().subscribe()
    },
    getCurPrizUserType(e) {
      this.curUser = e.target.value
    },
    getCurTemType(e) {
      this.curTem = e.target.value
    },
    getCurTimeType(e) {
      this.curTime = e.target.value
    },
    getCurTemContent(e) {
      this.templateList.map(item => {
        if (item.tmpl_id === e) {
          this.temContent = item.content
        }
      })
    },
    getEditInfo(id) {
      return this.groupService.getEditInfo(id).subscribe(res => {
        this.form.setFieldsValue({
          user_type: res.info.user_type,
          send_value: res.info.send_value,
          send_type: res.info.send_type,
          send_time: moment(res.info.send_time),
          title: res.info.title,
          content: res.info.content,
          tmpl_id: res.info.tmpl_id
        })
        this.curUser = res.info.user_type
        this.curTime = res.info.send_type
        if (res.info.user_type === this.USER_TYPES.USER) {
          this.tel = res.info.send_value
        }
        if (res.info.tmpl_id) {
          this.getCurTemContent(res.info.tmpl_id)
          this.curTem = this.TMPL_TYPES.CUSTOM
        }
      })
    },
    disabledStartDate(current) {
      return current && current < moment()
    },
    save() {
      this.form.validate((error, values) => {
        if (values.send_time) {
          values.send_time = values.send_time.format('YYYY-MM-DD HH:mm')
        }
        if (this.curUser === this.USER_TYPES.USER) {
          values.send_value = this.tel
        }
        if (this.curTem === this.TMPL_TYPES.PERSONAL) {
          if (!values.title) {
            this.messageService.warn({
              content: '请输入模板标题'
            })
            return
          }
        }
        if (this.curTem === this.TMPL_TYPES.PERSONAL) {
          if (!values.content) {
            this.messageService.warn({
              content: '请输入模板内容'
            })
            return
          }
        }
        if (this.id) {
          values.group_id = this.id
          return this.groupService.editGroup({ ...values }).subscribe(res => {
            this.messageService.success({
              content: '编辑成功'
            })
            this.$emit('success')
            this.show = false
          })
        } else {
          return this.groupService.addGroup({ ...values }).subscribe(res => {
            this.messageService.success({
              content: '添加成功'
            })
            this.$emit('success')
            this.show = false
          })
        }
      })
    }
  }
}
</script>
