<template>
  <div :class="bComponent()">
    <div :class="bComponent('title')">{{info.title}}</div>
    <div :class="bComponent('content')">
      <div
        :class="bComponent('text')"
        v-if="typeof info.notify_time.name === 'string'"
      >{{info.notify_time.name}}</div>
      <div :class="bComponent('text')" v-else>
        <a-radio-group>
          <a-radio v-for="(item,index) in rule.name" :key="index" :value="rule.value">{{item.label}}</a-radio>
        </a-radio-group>
      </div>
      <div :class="bComponent('text')">{{info.notify_type.name}}</div>
      <div :class="bComponent('text')">
        <st-switch v-model="info.notify_mode.sms.value"></st-switch>
      </div>
      <div :class="bComponent('text')" v-if="info.notify_type.value===1">
        <st-switch v-model="info.notify_mode.mini_programs.value"></st-switch>
        <span class="color-primary mg-l12" v-show="info.notify_mode.mini_programs.value">预览</span>
      </div>
      <div :class="bComponent('text')" v-if="info.notify_type.value===2">
        <st-switch v-model="info.notify_mode.app.value"></st-switch>
        <span class="color-primary mg-l12" v-show="info.notify_mode.app.value">预览</span>
      </div>
      <div v-show="info.notify_mode.sms.value">
        <div :class="bComponent('column')" class="shadow" v-show="!isShowEdit">
          <div style="width:75%" :class="bComponent('text')">短信预览: {{info.preview}}</div>
          <span class="color-primary" :class="bComponent('text')" @click="showEdit">编辑</span>
        </div>
        <div :class="bComponent('column')" class="shadow" v-show="isShowEdit">
          <div style="width:75%" :class="bComponent('text')">
            发送内容
            <a-input style="width:250px" :defaultValue="info.msg_preffix" placeholder="请输入"></a-input>
            <span>{{info.content}}</span>
            <a-input
              style="width:250px"
              v-model="params.msg_suffix"
              :defaultValue="info.msg_suffix"
              placeholder="请输入"
            ></a-input>
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
const componentName = 'notice-item'
export default {
  name: 'NoticeItem',
  bem: {
    bComponent: componentName
  },
  data() {
    return {
      isShowContent: 0,
      isShowPre: 0,
      isShowEdit: 0,
      rule: {},
      params: {
        msg_suffix: '',
        msg_preffix: ''
      }
    }
  },
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    let temp = this.info.notify_time.name
    if (typeof temp === 'string') {

    } else {
      this.rule.name = []
      Object.entries(temp).forEach(item => {
        this.rule.name.push({ value: item[0], label: item[1] })
      })
      this.rule.value = this.info.notify_time.value
    }
  },
  methods: {
    showEdit() {
      this.isShowEdit = 1
      //   this.isShowContent = 0
    },
    cancel() {
      this.isShowEdit = 0
    },
    save() {
      this.$emit('editInfo', this.params)
    }
  }
}
</script>
