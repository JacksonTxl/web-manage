<template>
  <div>
    <!-- 私教课程定价设置 -->
    <a-row>
      <a-col :span="16"><st-t2>私教课程定价设置</st-t2></a-col>
      <a-col :span="8" class="ta-r">
        <modal-link tag="a" :to="{ name:'brand-setting-personal-reserve' }">编辑</modal-link>
      </a-col>
    </a-row>
    <!-- 私教课程定价模式 -->
    <st-t4 class="mg-t24">私教课程定价模式</st-t4>
    <div class="st-des">教练统一定价（每一个私教课程，所授课的教练的课程售出价格一致）</div>
    <st-hr></st-hr>
    <!-- 私教课程售卖模式 -->
    <st-t4>私教课程定价设置</st-t4>
    <div class="st-des">教练谈单模式（ 1. 设置课程最低课时费和最高课时费 2. 超过售卖价格范围时，不支持购买 3. 不支持在用户端直接购买私教课 ）</div>
    <st-hr></st-hr>

      <!-- 私教课程预约设置 -->
    <st-t2>私教课程预约设置</st-t2>
    <!-- 私教课程定价模式 -->
    <st-t4 class="mg-t24">预约范围</st-t4>
    <div class="st-des">
      用户可预约{{info.reserve_start | enumFilter('setting.reserve_start')}}
      到{{info.reserve_range | enumFilter('setting.reserve_range')}}以内的私教课程，员工代预约不受此限制
    </div>
    <st-hr></st-hr>
    <!-- 取消预约 -->
    <st-t4>私教课程定价设置</st-t4>
    <div class="st-des">允许用户在私教课程开始前{{info.cancel_reserve | enumFilter('setting.cancel_reserve')}}取消预约，员工代取消不受此限制</div>
    <st-hr></st-hr>
    <!-- 预约提醒 -->
    <st-t4>预约提醒</st-t4>
    <div class="st-des">在课程开始前{{info.reserve_remind | enumFilter('setting.reserve_remind')}}提醒用户上课</div>
    <st-hr></st-hr>
    <!-- 签到方式 -->
    <st-t4>签到方式</st-t4>
    <div class="st-des">{{info.is_sign ? '支持' : '不支持'}}用户自主签到</div>
    <st-hr></st-hr>
    <!-- 签到时间 -->
    <st-t4>签到时间</st-t4>
    <div class="st-des">开课后{{info.sign_time | enumFilter('setting.sign_time')}}允许签到</div>
    <st-hr></st-hr>
    <!-- 自动签到 -->
    <st-t4>自动签到</st-t4>
    <div class="st-des">{{info.is_auto_sign ? '支持' : '不支持'}}系统自动签到</div>
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
      resData: personalService.resData$
    }
  },
  computed: {
    info() {
      return this.resData.info
    }
  },
  created() {
    this.personalService.getInfo().subscribe()
  }
}
</script>
