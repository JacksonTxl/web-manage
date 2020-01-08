<template>
  <div :class="bPage()">
    <div :class="bItem()">
      <st-t3 class="mg-b16">通知会员信息</st-t3>
      <div :class="bItem('table')">
        <div :class="bItem('table-title')">
          <div :class="bItem('table-th')">模板标题</div>
          <div class="th-wrap">
            <div class="th" v-for="(item, index) in thsMember" :key="index">
              {{ item.title }}
            </div>
          </div>
        </div>
        <div
          :class="bItem('table-tr')"
          v-for="(item, index) in memberList$"
          :key="index"
        >
          <member-notice-item @editInfo="save" :info="item">
            <!-- 预约到期提醒 需要设置时间 start-->
            <template
              v-slot:notifyTime="slotProps"
              v-if="
                item.notify_sub_type.value ===
                  NOTIFY_MEMBER_SUB_TYPE.RESERVE_EXPIRE
              "
            >
              <span>
                课程开始前
                <a-select
                  v-model="slotProps.params.notify_time"
                  style="width:100px"
                >
                  <a-select-option
                    v-for="(item, index) in notifyTimeHour$"
                    :key="index"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
                发送
              </span>
            </template>
            <!-- 预约到期提醒 需要设置时间 end-->

            <!-- 购买商品到期通知 是radio -->
            <template
              v-slot:notify-time="slotProps"
              v-if="
                [
                  NOTIFY_MEMBER_SUB_TYPE.GOODS_EXPIRE,
                  NOTIFY_MEMBER_SUB_TYPE.RESERVE_EXPIRE
                ].includes(item.notify_sub_type.value)
              "
            >
              <span
                v-if="
                  NOTIFY_MEMBER_SUB_TYPE.RESERVE_EXPIRE ===
                    item.notify_sub_type.value
                "
              >
                课程开始前
                <a-select
                  v-model="slotProps.params.notify_time"
                  style="width:100px"
                >
                  <a-select-option
                    v-for="(item, index) in notifyTimeHour$"
                    :key="index"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
                发送
              </span>
              <a-radio-group
                v-if="
                  NOTIFY_MEMBER_SUB_TYPE.GOODS_EXPIRE ===
                    item.notify_sub_type.value
                "
                v-model="slotProps.params.notify_time"
                class="mg-b16"
              >
                <a-radio
                  v-for="(item, index) in notifyRule$"
                  :key="index"
                  :value="item.value"
                >
                  {{ item.label }}
                </a-radio>
              </a-radio-group>
            </template>
            <!-- 购买商品到期通知 是radio end-->
          </member-notice-item>
        </div>
      </div>
    </div>
    <div :class="bItem()" class="mg-t24">
      <st-t3 class="mg-b16">通知门店信息</st-t3>
      <div :class="bItem('table')">
        <div :class="bItem('table-title')">
          <div :class="bItem('table-th')">模板标题</div>
          <div class="th-wrap">
            <div
              class="th shop-th"
              v-for="(item, index) in thsShop"
              :key="index"
            >
              {{ item.title }}
              <st-help-tooltip
                v-if="thsMember.length === index"
                id="TBPCT001"
              />
            </div>
          </div>
        </div>
        <div
          :class="bItem('table-tr')"
          v-for="(item, index) in shopList$"
          :key="index"
        >
          <shop-notice-item @editInfo="save" :info="item">
            <!-- 自定义内容 start -->
            <template
              v-if="
                NOTIFY_SHOP_SUB_TYPE.MEMBER_ENTRANCE_SUCCESS ===
                  item.notify_sub_type.value
              "
              v-slot:content-self="slotProps"
            >
              <div class="mg-b16">
                <span class="color-title mg-r24">消息类型</span>
                <span
                  class="mg-r16"
                  v-for="(item, index) in consumeTypeString"
                  :key="index"
                >
                  {{ item }}
                </span>
              </div>

              <div class="mg-b16">
                <span class="color-title mg-r24">入场方式</span>
                <span
                  class="mg-r16"
                  v-for="(item, index) in entranceTypeString"
                  :key="index"
                >
                  {{ item }}
                </span>
              </div>
            </template>
            <!-- 自定义内容 start -->

            <!-- 自定义发送规则 start -->
            <template
              v-if="
                [
                  NOTIFY_SHOP_SUB_TYPE.MEMBER_COURSE_EXPIRE_DUE,
                  NOTIFY_SHOP_SUB_TYPE.MEMBER_EXPIRE_DUE,
                  NOTIFY_SHOP_SUB_TYPE.MEMBER_FLOW_DUE
                ].includes(item.notify_sub_type.value)
              "
              v-slot:sendRule="slotProps"
            >
              <span
                v-if="
                  [
                    NOTIFY_SHOP_SUB_TYPE.MEMBER_EXPIRE_DUE,
                    NOTIFY_SHOP_SUB_TYPE.MEMBER_FLOW_DUE
                  ].includes(item.notify_sub_type.value)
                "
              >
                {{
                  NOTIFY_SHOP_SUB_TYPE.MEMBER_EXPIRE_DUE ===
                  item.notify_sub_type.value
                    ? '客保到期前'
                    : '会员流失前'
                }}
                <a-input
                  v-model="slotProps.params.notify_time"
                  style="width:80px"
                  type="number"
                />
                天提醒，每日早7点推送
              </span>
              <span
                v-if="
                  NOTIFY_SHOP_SUB_TYPE.MEMBER_COURSE_EXPIRE_DUE ===
                    item.notify_sub_type.value
                "
              >
                会员课程剩余
                <a-input
                  v-model="slotProps.params.notify_number"
                  style="width:80px"
                  type="number"
                />
                次时，或会员课程有效期剩余
                <a-input
                  v-model="slotProps.params.notify_time"
                  style="width:80px"
                  type="number"
                />
                天时提醒，每日早7点推送
              </span>
            </template>
            <!-- 自定义发送规则 end -->

            <!-- 接收人员 选择角色 start -->
            <template
              v-if="
                item.notify_sub_type.value ===
                  NOTIFY_SHOP_SUB_TYPE.MEMBER_ENTRANCE_SUCCESS ||
                  item.notify_sub_type.value ===
                    NOTIFY_SHOP_SUB_TYPE.BATCH_OPERATE
              "
              v-slot:custom="slotProps"
            >
              <a-select
                style="width:44%"
                mode="multiple"
                placeholder="点击选择角色"
                :options="roleList$"
                v-model="slotProps.params.custom_phone"
              ></a-select>
            </template>
            <!-- 接收人员 选择角色 end -->
          </shop-notice-item>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { NoticeService } from './notice.service'
import { thsMember, thsShop } from './notice.config'
import MemberNoticeItem from './components#/member-notice-item'
import ShopNoticeItem from './components#/shop-notice-item'
import {
  NOTIFY_TYPES,
  NOTIFY_MEMBER_SUB_TYPE,
  NOTIFY_SHOP_SUB_TYPE
} from '@/constants/setting/sms'
const pageName = 'page-setting-sms-notice'

export default {
  name: 'NoticeConfig',
  bem: {
    bPage: pageName,
    bItem: `${pageName}-item`
  },
  serviceInject() {
    return {
      noticeService: NoticeService
    }
  },
  data() {
    return {
      NOTIFY_TYPES,
      NOTIFY_MEMBER_SUB_TYPE,
      NOTIFY_SHOP_SUB_TYPE
    }
  },
  rxState() {
    const {
      memberList$,
      roleList$,
      shopList$,
      consumeType$,
      entranceType$,
      notifyTimeHour$,
      notifyRule$
    } = this.noticeService
    return {
      memberList$,
      roleList$,
      shopList$,
      consumeType$,
      entranceType$,
      notifyTimeHour$,
      notifyRule$
    }
  },
  computed: {
    thsMember,
    thsShop,
    consumeTypeString() {
      return this.consumeType$.map(item => item.label)
    },
    entranceTypeString() {
      return this.entranceType$.map(item => item.label)
    }
  },

  methods: {
    onSearch() {},
    save(para) {
      this.putNotice(para)
    },
    getNoticeList() {
      return this.noticeService.getNoticeList().subscribe()
    },
    putNotice(para) {
      return this.noticeService.putNotice({ ...para }).subscribe(res => {
        this.$message.success('编辑成功')
        this.getNoticeList()
      })
    }
  },
  components: {
    MemberNoticeItem,
    ShopNoticeItem
  }
}
</script>
