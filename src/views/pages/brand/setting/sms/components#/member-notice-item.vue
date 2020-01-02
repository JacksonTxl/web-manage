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
            <span class="color-title mg-r8">预览内容:</span>
            <span :class="bComponent('text-right')">{{ info.preview }}</span>
          </div>
          <div :class="bComponent('text')" style="padding-left:0">
            <span class="color-primary cursor-pointer" @click="showEdit">
              编辑
            </span>
          </div>
          <div
            class="width75"
            :class="bComponent('text')"
            v-if="info.course_type_description"
          >
            <span class="color-title">课程类型:</span>
            <span class="mg-l8">{{ info.course_type_description }}</span>
          </div>
          <div
            class="width75"
            :class="bComponent('text')"
            v-if="info.order_type_description"
          >
            <span class="color-title">订单类型:</span>
            <span class="mg-l8">{{ info.order_type_description }}</span>
          </div>
        </div>

        <div :class="bComponent('column')" v-show="isShowEdit">
          <div class="width75" :class="bComponent('text')">
            <!-- 发送内容 start -->
            <template v-if="info.preview">
              <div class="mg-b16">
                <span class="mg-r8 color-title">发送内容</span>
                <span :class="bComponent('text-right')">
                  <a-input
                    :class="bComponent('column-input')"
                    v-model="params.msg_preffix"
                    placeholder="请输入"
                  ></a-input>
                  <span>{{ info.content }}</span>
                  <a-input
                    :class="bComponent('column-input')"
                    v-model="params.msg_suffix"
                    placeholder="请输入"
                  ></a-input>
                </span>
              </div>
              <div class="mg-b16">
                <span class="mg-r8 color-title">预览内容</span>
                <span :class="bComponent('text-right')">
                  {{ info.preview }}
                </span>
              </div>
            </template>
            <!-- 发送内容 end -->

            <!-- 发送规则 start 如果是预约到期提醒 购买商品到期通知 发送规则是自定义时间，而不是直接展示后返回过来的发送规则-->
            <div>
              <span class="color-title mg-r8">发送规则</span>
              <span
                v-if="
                  info.notify_sub_type.value ===
                    NOTIFY_MEMBER_SUB_TYPE.RESERVE_EXPIRE
                "
              >
                课程开始前
                <a-select v-model="params.notify_time" style="width:100px">
                  <a-select-option
                    v-for="(item, index) in notifyHour"
                    :key="index"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
                发送
              </span>

              <!-- 购买商品到期通知 是radio -->
              <a-radio-group
                v-if="
                  info.notify_sub_type.value ===
                    NOTIFY_MEMBER_SUB_TYPE.GOODS_EXPIRE
                "
                v-model="params.notify_time"
                class="mg-b16"
              >
                <a-radio
                  v-for="(item, index) in notifyRule"
                  :key="index"
                  :value="item.value"
                >
                  {{ item.label }}
                </a-radio>
              </a-radio-group>
              <span
                v-if="
                  ![
                    NOTIFY_MEMBER_SUB_TYPE.RESERVE_EXPIRE,
                    NOTIFY_MEMBER_SUB_TYPE.GOODS_EXPIRE
                  ].includes(info.notify_sub_type.value)
                "
              >
                {{ info.notify_time.name }}
              </span>
            </div>
            <!-- 发送规则end 如果是预约到期提醒 购买商品到期通知 发送规则是自定义时间，而不是直接展示后返回过来的发送规则-->
          </div>

          <div :class="bComponent('text')" style="padding-left:0">
            <span class="btn color-primary mg-r12" @click="cancel">取消</span>
            <span class="btn color-primary" @click="save">保存</span>
          </div>
        </div>
        <div class="shadow-bottom"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { UserService } from '@/services/user.service'
import BrandSettingSmsNotice from '@/views/biz-modals/brand/setting/sms/notice'
import { NoticeService } from '../notice.service'
import {
  NOTIFY_TYPES,
  NOTIFY_MEMBER_SUB_TYPE,
  NOTIFY_SHOP_SUB_TYPE
} from '@/constants/setting/sms'
const componentName = 'notice-item'
export default {
  name: 'NoticeItem',
  bem: {
    bComponent: componentName
  },
  serviceInject() {
    return {
      userService: UserService,
      noticeService: NoticeService
    }
  },
  rxState() {
    const user = this.userService
    const { consumeType$, entranceType$ } = this.noticeService
    return {
      settingEnums: user.settingEnums$,
      consumeType$,
      entranceType$
    }
  },
  modals: {
    BrandSettingSmsNotice
  },
  data() {
    return {
      isShowContent: 0,
      isShowPre: 0,
      isShowEdit: 0,
      NOTIFY_TYPES,
      NOTIFY_MEMBER_SUB_TYPE,
      NOTIFY_SHOP_SUB_TYPE,
      isShowPhone: false, // 默认不展示输入手机号
      rule: {},
      params: {
        id: '',
        msg_suffix: '',
        msg_preffix: '',
        custom_phone: '',
        course_type: {
          team_course: {
            value: 0,
            name: '团课'
          },
          personal_course: {
            value: 0,
            name: '私教课'
          }
        },
        order_type: {
          advance: {
            value: 0,
            name: '定金'
          },
          deposit: {
            value: 0,
            name: '押金'
          },
          product: {
            value: 0,
            name: '商品'
          },
          poundage: {
            value: 0,
            name: '手续费'
          }
        },
        receiver: {
          coach: {
            value: 0,
            name: this.$c('coach')
          },
          member: {
            value: 0,
            name: '会员'
          },
          seller: {
            value: 0,
            name: '销售'
          },
          custom: {
            value: 0,
            name: '自定义'
          }
        },
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
  computed: {
    consumeTypeString() {
      return this.consumeType$.map(item => item.label)
    },
    entranceTypeString() {
      return this.entranceType$.map(item => item.label)
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
    if (Object.keys(this.info.order_type).length > 0) {
      this.params.order_type = this.info.order_type
    }
    if (Object.keys(this.info.course_type).length > 0) {
      this.params.course_type = this.info.course_type
    }
    if (Object.keys(this.info.receiver).length > 0) {
      this.params.receiver = this.info.receiver
    }
    this.params.notify_time = this.info.notify_time.value
    this.params.notify_number = this.info.notify_number
    this.params.msg_preffix = this.info.msg_preffix
    this.params.msg_suffix = this.info.msg_suffix
    this.params.custom_phone = this.info.custom_phone
    const isJoin = [
      NOTIFY_SHOP_SUB_TYPE.MEMBER_ENTRANCE_SUCCESS,
      NOTIFY_SHOP_SUB_TYPE.BATCH_OPERATE
    ]
    if (!isJoin.includes(this.info.notify_sub_type.value)) {
      this.params.custom_phone = this.info.custom_phone.join(' ')
    }
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
      let course_type = {}
      let order_type = {}
      let receiver = {}
      if (this.info.course_type.team_course) {
        course_type.team_course = 0
      }
      if (this.info.course_type.personal_course) {
        course_type.personal_course = 0
      }

      if (this.info.order_type.advance) {
        order_type.advance = 0
      }
      if (this.info.order_type.deposit) {
        order_type.deposit = 0
      }
      if (this.info.order_type.product) {
        order_type.product = 0
      }
      if (this.info.order_type.poundage) {
        order_type.poundage = 0
      }

      if (this.info.receiver.coach) {
        receiver.coach = 0
      }
      if (this.info.receiver.member) {
        receiver.member = 0
      }
      if (this.info.receiver.custom) {
        receiver.custom = 0
      }
      if (this.info.receiver.seller) {
        receiver.seller = 0
      }
      if (this.info.course_type.team_course) {
        course_type.team_course = this.params.course_type.team_course.value
          ? 1
          : 0
      }
      if (this.info.course_type.personal_course) {
        course_type.personal_course = this.params.course_type.personal_course
          .value
          ? 1
          : 0
      }
      if (this.info.order_type.advance) {
        order_type.advance = this.params.order_type.advance.value ? 1 : 0
      }
      if (this.info.order_type.deposit) {
        order_type.deposit = this.params.order_type.deposit.value ? 1 : 0
      }
      if (this.info.order_type.product) {
        order_type.product = this.params.order_type.product.value ? 1 : 0
      }
      if (this.info.order_type.poundage) {
        order_type.poundage = this.params.order_type.poundage.value ? 1 : 0
      }

      if (this.info.receiver.coach) {
        receiver.coach = this.params.receiver.coach.value ? 1 : 0
      }
      if (this.info.receiver.member) {
        receiver.member = this.params.receiver.member.value ? 1 : 0
      }
      if (this.info.receiver.custom) {
        receiver.custom = this.params.receiver.custom.value ? 1 : 0
      }
      if (this.info.receiver.seller) {
        receiver.seller = this.params.receiver.seller.value ? 1 : 0
      }
      let custom_phone = []
      if (Array.isArray(this.params.custom_phone)) {
        custom_phone = this.params.custom_phone
      } else {
        custom_phone =
          this.params.custom_phone.length > 0
            ? this.params.custom_phone.split(',')
            : []
      }

      const para = Object.assign({}, this.params, {
        id: this.info.id,
        custom_phone,
        order_type,
        receiver,
        course_type
      })
      this.$emit('editInfo', para)
      this.isShowEdit = 0
    }
  },
  watch: {
    'params.receiver.custom.value'(oldVal, newVal) {
      if (oldVal) {
        this.isShowPhone = true
      } else {
        this.isShowPhone = false
      }
    }
  }
}
</script>
