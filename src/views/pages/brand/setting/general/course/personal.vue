<template>
  <div>
    <!-- 私教课程定价设置 -->
    <section v-if="auth.price.get">
       <a-row>
        <a-col :span="16"><st-t2>私教课程定价设置</st-t2></a-col>
        <a-col :span="8" class="ta-r">
          <a href="javascript: void(0);"
            v-if="auth.price.edit"
            @click="onEditPricingSetting"
          >
            <st-icon type="edit"></st-icon>
            <span class="mg-l4 color-text-light">编辑</span>
          </a>
        </a-col>
      </a-row>

      <!-- 私教课程售卖模式 -->
      <st-t4 class="mg-t24">私教课程售卖模式</st-t4>
       <!-- 教练统一定价 -->
      <div class="st-des" v-if="pricingInfo.price_model === 1">教练统一定价（每一个私教课程，所授课的教练的课程售出价格一致）</div>
      <!-- 教练分级定价 -->
      <div class="st-des" v-if="pricingInfo.price_model === 2">教练分级定价（每一个私教课程，按教练等级进行差异化定价）</div>
      <st-hr></st-hr>
      <!-- 私教课程售卖模式 -->
      <st-t4>私教课程定价设置</st-t4>
      <!-- 教练谈单模式 -->
      <div class="st-des" v-if="pricingInfo.sale_model===1">教练谈单模式（ 1.设置课程最低课时费和最高课时费 2.超过售卖价格范围时，不支持购买 3.不支持在用户端直接购买私教课 ）</div>
      <!-- 统一标价模式 -->
      <div class="st-des" v-if="pricingInfo.sale_model===2">统一标价模式（ 1.设置课程的固定课时费 2. 支持用户在用户端在线购买 ）</div>
      <st-hr></st-hr>
    </section>

    <!-- 私教课程预约设置 -->
    <section v-if="auth.reserve.get">
      <a-row>
        <a-col :span="16"><st-t2>私教课程预约设置</st-t2></a-col>
        <a-col :span="8" class="ta-r">
          <a href="javascript: void(0);"
            v-if="auth.reserve.edit"
            v-modal-link="{
              name:'brand-setting-personal-reserve',
              on: {
                change: onChange
              }
            }"
          >
            <st-icon type="edit"></st-icon>
            <span class="mg-l4 color-text-light">编辑</span>
          </a>
        </a-col>
      </a-row>
      <!-- 私教课程定价模式 -->
      <st-t4 class="mg-t24">预约范围</st-t4>
      <div class="st-des">
        用户可预约{{reserveInfo.reserve_start | enumFilter('setting.reserve_start')}}
        到{{reserveInfo.reserve_range | enumFilter('setting.reserve_range')}}以内的私教课程，员工代预约不受此限制
      </div>
      <st-hr></st-hr>
      <!-- 取消预约 -->
      <st-t4>私教课程定价设置</st-t4>
      <div class="st-des">允许用户在私教课程开始前{{reserveInfo.cancel_reserve | enumFilter('setting.cancel_reserve')}}取消预约，员工代取消不受此限制</div>
      <st-hr></st-hr>
      <!-- 预约提醒 -->
      <st-t4>预约提醒</st-t4>
      <div class="st-des">在课程开始前{{reserveInfo.reserve_remind | enumFilter('setting.reserve_remind')}}提醒用户上课</div>
      <st-hr></st-hr>
      <!-- 签到方式 -->
      <st-t4>签到方式</st-t4>
      <div class="st-des">{{reserveInfo.is_sign ? '支持' : '不支持'}}用户自主签到</div>
      <st-hr></st-hr>
      <!-- 签到时间 -->
      <st-t4>签到时间</st-t4>
      <div class="st-des">开课后{{reserveInfo.sign_time | enumFilter('setting.sign_time')}}允许签到</div>
      <st-hr></st-hr>
      <!-- 自动签到 -->
      <st-t4>自动签到</st-t4>
      <div class="st-des">{{reserveInfo.is_auto_sign ? '支持' : '不支持'}}系统自动签到</div>
    </section>
  </div>
</template>
<script>
import { UserService } from '@/services/user.service'
import { MessageService } from '@/services/message.service'
import { PersonalService } from './personal.service'
export default {
  serviceInject() {
    return {
      userService: UserService,
      personalService: PersonalService
    }
  },
  rxState() {
    const user = this.userService
    const personalService = this.personalService
    return {
      loading: personalService.loading$,
      settingEnums: user.settingEnums$,
      resData: personalService.resData$,
      auth: personalService.auth$
    }
  },
  computed: {
    pricingInfo() {
      return this.resData[0]
    },
    reserveInfo() {
      return this.resData[1].info
    }
  },
  methods: {
    onChange() {
      this.$router.push({
        force: true
      })
    },
    onEditPricingSetting() {
      const isChanged = this.pricingInfo.is_changed
      const that = this
      if (isChanged) {
        this.$confirm({
          title: '',
          content: '私教售出模式从{统一定价}切换至{教练谈单}将于次日01:00开始执行',
          okText: '保持切换',
          cancelText: '放弃切换',
          /**
           * 保持切换
           */
          onOk() {
            that.showPricingSettingModal()
          },
          /**
           * 放弃切换
           */
          onCancel() {

          }
        })
      } else {
        this.showPricingSettingModal()
      }
    },
    showPricingSettingModal() {
      this.$modalRouter.push({
        name: 'brand-setting-personal-price-model',
        on: {
          change: this.onChange
        }
      })
    }
  }
}
</script>
