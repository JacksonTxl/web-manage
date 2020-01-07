<template>
  <div :class="bComponent()">
    <div :class="bComponent('title')">{{ info.title }}</div>
    <div :class="bComponent('content')">
      <!-- text 卡片头部 start-->
      <div :class="bComponent('text')">{{ info.notify_time.name }}</div>
      <div :class="bComponent('text')">{{ info.notify_type.name }}</div>
      <div :class="bComponent('text')" style="padding-left:0">
        <st-switch @change="save" v-model="params.notify_mode.sms"></st-switch>
      </div>
      <div :class="bComponent('text')" style="padding-left:0">
        <st-switch
          @change="save"
          v-model="params.notify_mode.mini_programs"
        ></st-switch>
        <span
          class="color-primary mg-l12 cursor-pointer"
          v-show="params.notify_mode.mini_programs"
          type="primary"
          v-modal-link="{
            name: 'brand-setting-sms-notice',
            props: {
              img: info.img_url
            }
          }"
        >
          预览
        </span>
      </div>
      <!-- text 卡片头部 end -->

      <div
        v-show="
          params.notify_mode.sms ||
            params.notify_mode.app ||
            params.notify_mode.mini_programs
        "
      >
        <div class="shadow"></div>
        <div :class="bComponent('column')" v-show="!isShowEdit">
          <div class="width75" :class="bComponent('text')" v-if="info.preview">
            <span class="color-title mg-r24">预览内容:</span>
            <span :class="bComponent('text-right')">{{ info.preview }}</span>
          </div>
          <div :class="bComponent('text')" style="padding-left:0">
            <span class="color-primary cursor-pointer" @click="isShowEdit = 1">
              编辑
            </span>
          </div>
          <div
            class="width75"
            :class="bComponent('text')"
            v-if="info.course_type_description"
          >
            <span class="color-title mg-r24">课程类型:</span>
            <span>{{ info.course_type_description }}</span>
          </div>
          <div
            class="width75"
            :class="bComponent('text')"
            v-if="info.order_type_description"
          >
            <span class="color-title mg-r24">订单类型:</span>
            <span>{{ info.order_type_description }}</span>
          </div>
        </div>

        <div :class="bComponent('column')" v-show="isShowEdit">
          <div class="width75" :class="bComponent('text')">
            <!-- 发送内容 start -->
            <template v-if="info.preview">
              <div class="mg-b16">
                <span class="color-title mg-r24">发送内容</span>
                <span :class="bComponent('text-right')">
                  <a-input
                    :class="bComponent('column-input')"
                    v-model="params.msg_preffix"
                    placeholder="请输入"
                  ></a-input>
                  <span>
                    {{ info.content }}
                  </span>
                  <a-input
                    :class="bComponent('column-input')"
                    v-model="params.msg_suffix"
                    placeholder="请输入"
                  ></a-input>
                </span>
              </div>
              <div class="mg-b16">
                <span class="color-title mg-r24">预览内容</span>
                <span :class="bComponent('text-right')">
                  {{ info.preview }}
                </span>
              </div>
            </template>
            <!-- 发送内容 end -->

            <slot name="notify-time" :params="params">
              <span class="color-title mg-r24">发送规则</span>
              <span>
                {{ info.notify_time.name }}
              </span>
            </slot>
          </div>
          <div :class="bComponent('text')" style="padding-left:0">
            <span class="btn color-primary mg-r12" @click="isShowEdit = 0">
              取消
            </span>
            <span class="btn color-primary" @click="save">保存</span>
          </div>
        </div>

        <div class="shadow-bottom"></div>
      </div>
    </div>
  </div>
</template>
<script>
import BrandSettingSmsNotice from '@/views/biz-modals/brand/setting/sms/notice'
const componentName = 'notice-item'
export default {
  name: 'NoticeItem',
  bem: {
    bComponent: componentName
  },
  modals: {
    BrandSettingSmsNotice
  },
  data() {
    return {
      isShowEdit: 0,
      params: {
        id: '',
        msg_suffix: '',
        msg_preffix: '',
        notify_time: '',
        notify_number: '',
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
  created() {
    this.init()
  },
  methods: {
    // 初始化回显数据
    init() {
      this.params.notify_time = this.info.notify_time.value
      this.params.notify_number = this.info.notify_number
      this.params.msg_preffix = this.info.msg_preffix
      this.params.msg_suffix = this.info.msg_suffix

      this.params.notify_mode = {
        sms: this.info.notify_mode.sms && this.info.notify_mode.sms.value,
        mini_programs:
          this.info.notify_mode.mini_programs &&
          this.info.notify_mode.mini_programs.value
      }
    },
    save() {
      const para = Object.assign({}, this.params, {
        id: this.info.id
      })
      this.$emit('editInfo', para)
      this.isShowEdit = 0
    }
  }
}
</script>
