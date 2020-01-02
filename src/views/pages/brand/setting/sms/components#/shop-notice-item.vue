<template>
  <div :class="bComponent()">
    <div :class="bComponent('title')">{{ info.title }}</div>
    <div :class="bComponent('content')">
      <div :class="bComponent('text')">{{ info.notify_time.name }}</div>
      <div :class="bComponent('text')">{{ info.notify_type.name }}</div>
      <div :class="bComponent('text')" style="padding-left:0">
        <st-switch @change="save" v-model="params.notify_mode.sms"></st-switch>
      </div>
      <div :class="bComponent('text')" style="padding-left:0">
        <st-switch @change="save" v-model="params.notify_mode.app"></st-switch>
      </div>
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
            <span class="color-primary cursor-pointer" @click="isShowEdit = 1">
              编辑
            </span>
          </div>
          <div
            class="width75"
            :class="bComponent('text')"
            v-if="info.receiver_description"
          >
            <span class="color-title">接收人员:</span>
            <span class="mg-l8">{{ info.receiver_description }}</span>
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
            <template v-if="info.preview">
              <div class="mg-b16">
                <span class="mg-r8 color-title">预览内容</span>
                <span :class="bComponent('text-right')">
                  {{ info.preview }}
                </span>
              </div>
            </template>

            <!-- 课程类型 start -->
            <div class="mg-b16" v-if="Object.keys(info.course_type).length > 0">
              <span class="color-title">课程类型</span>
              <span
                v-for="(item, key) of params.course_type"
                :key="key"
                class="mg-l16 inlineblock"
              >
                <st-checkbox v-model="params.course_type[key].value">
                  {{ item.name }}
                </st-checkbox>
              </span>
            </div>
            <!-- 课程类型 end -->

            <!-- 接收人员 start -->
            <div class="mg-b16" v-if="Object.keys(info.receiver).length > 0">
              <span class="color-title">接收人员</span>
              <template v-for="(item, key) of params.receiver">
                <span
                  class="mg-l16 inlineblock"
                  :key="key"
                  v-if="key !== 'custom'"
                >
                  <st-checkbox v-model="params.receiver[key].value">
                    {{ item.name }}
                  </st-checkbox>
                </span>
              </template>
              <!-- 自定义 本来可以是直接拿后端数据v-for出来但是自定义有可能第二个 自定义应该是最后一个start -->
              <template>
                <span class="mg-l16 inlineblock">
                  <st-checkbox
                    v-if="params.receiver.custom"
                    v-model="params.receiver.custom.value"
                  >
                    {{ params.receiver.custom.name }}
                  </st-checkbox>
                </span>
                <span v-if="isShowPhone">
                  <!-- 这个slot 门店通知现在是选择角色 其他都是选择手机号码 为了自定义 本来产品想改成都是选择角色但是现在为了兼容老数据只能两种都保存TODO: 以后可能会改 20191231 -->
                  <slot name="custom" :params="params">
                    <a-input
                      style="width:44%"
                      v-show="isShowPhone"
                      v-model="params.custom_phone"
                      placeholder="请输入手机号码，多个用逗号分隔"
                    />
                  </slot>
                </span>
              </template>
              <!-- 自定义 end -->
            </div>
            <!-- 接收人员 end -->

            <!-- 订单类型 start -->
            <div class="mg-b16" v-if="Object.keys(info.order_type).length > 0">
              <span class="color-title">订单类型</span>
              <span
                v-for="(item, key) of params.order_type"
                :key="key"
                class="mg-l16 inlineblock"
              >
                <st-checkbox v-model="params.order_type[key].value">
                  {{ item.name }}
                </st-checkbox>
              </span>
            </div>
            <!-- 订单类型 end -->

            <slot name="content-self" :params="params"></slot>
            <!-- 发送规则 start -->
            <div>
              <span class="color-title mg-r8">发送规则</span>
              <slot name="sendRule" :params="params">
                <span>
                  {{ info.notify_time.name }}
                </span>
              </slot>
            </div>
            <!-- 发送规则 start -->
          </div>
          <div :class="bComponent('text')" style="padding-left:0">
            <span class="btn color-primary mg-r12" @click="isShowEdit = 1">
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
import { UserService } from '@/services/user.service'
import BrandSettingSmsNotice from '@/views/biz-modals/brand/setting/sms/notice'
import { NoticeService } from '../notice.service'
import { NOTIFY_SHOP_SUB_TYPE } from '@/constants/setting/sms'
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
      isShowEdit: 0,
      NOTIFY_SHOP_SUB_TYPE,
      isShowPhone: false, // 默认不展示输入手机号
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
          operator: {
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
    // TODO: 这里暂时只有 状态23 24选择角色 其他的选择手机号而且是字符串，以后产品打算改为选择角色
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
    save() {
      // 课程类型：团课， 私教课
      let course_type = { team_course: 0, personal_course: 0 }
      // 订单类型
      let order_type = {}
      let receiver = {}
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
      if (this.info.receiver.operator) {
        receiver.operator = this.params.receiver.operator.value ? 1 : 0
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
