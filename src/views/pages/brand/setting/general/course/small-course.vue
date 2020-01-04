<template>
  <div v-if="auth.get">
    <section>
      <a-row>
        <a-col :span="16">
          <st-t2>{{ $c('small_course') }}预约设置</st-t2>
        </a-col>
        <a-col :span="8" class="ta-r">
          <st-info-action
            icon="edit"
            text="编辑"
            v-if="auth.edit"
            v-modal-link="{
              name: 'brand-setting-small-course-reserve',
              on: {
                change: onChange
              }
            }"
          />
        </a-col>
      </a-row>
      <st-t4 class="mg-t24">预约范围</st-t4>
      <div class="st-des">
        用户可预约{{
          reserveInfo.reserve_start | enumFilter('small_course.reserve_start')
        }}
        到{{
          reserveInfo.reserve_range | enumFilter('small_course.reserve_range')
        }}以内的课程，员工代预约不受此限制
      </div>
      <st-hr></st-hr>
      <st-t4>取消预约设置</st-t4>
      <div class="st-des">
        允许用户在课程开始前{{
          reserveInfo.cancel_reserve
            | enumFilter('small_course.cancel_reserve')
        }}取消预约，员工代取消不受此限制
      </div>
      <st-hr></st-hr>
      <st-t4>预约提醒</st-t4>
      <div class="st-des">
        在课程开始前{{
          reserveInfo.reserve_remind
            | enumFilter('small_course.reserve_remind')
        }}提醒用户上课
      </div>
      <st-hr></st-hr>
      <st-t4>签到方式</st-t4>
      <div class="st-des">
        {{ reserveInfo.is_sign ? IS_SIGN.YES : IS_SIGN.NO }}用户自主签到
      </div>
      <st-hr></st-hr>
      <st-t4>签到条件</st-t4>
      <div class="st-des">
        当天{{
          reserveInfo.is_sign_entrance
            ? IS_SIGN_ENTRANCE.YES
            : IS_SIGN_ENTRANCE.NO
        }}入场记录(PC不受此条件限制)
      </div>
      <st-hr></st-hr>
      <st-t4>签到时间</st-t4>
      <div class="st-des">
        开课后{{
          reserveInfo.sign_time | enumFilter('small_course.sign_time')
        }}允许签到
      </div>
      <st-hr></st-hr>
      <st-t4>旷课判断</st-t4>
      <div class="st-des">
        课程结束后{{
          reserveInfo.absenteeism_limit
            | enumFilter('small_course.absenteeism_limit')
        }}内,未签到
      </div>
      <st-hr></st-hr>
      <st-t4>上课通知</st-t4>
      <div class="st-des">
        课程开始前{{
          reserveInfo.sign_time | enumFilter('small_course.sign_time')
        }}通知签到
      </div>
    </section>
  </div>
</template>
<script>
import { UserService } from '@/services/user.service'
import { MessageService } from '@/services/message.service'
import { SmallCourseService } from './small-course.service'
import BrandSettingSmallCourseReserve from '@/views/biz-modals/brand/setting/small-course/reserve'
import { IS_SIGN, IS_SIGN_ENTRANCE } from '@/constants/course/small-course'
export default {
  serviceInject() {
    return {
      userService: UserService,
      smallCourseService: SmallCourseService
    }
  },
  rxState() {
    const smallCourseService = this.smallCourseService
    return {
      loading: smallCourseService.loading$,
      reserveInfo: smallCourseService.reserveInfo$,
      auth: smallCourseService.auth$
    }
  },
  modals: {
    BrandSettingSmallCourseReserve
  },
  data() {
    return {
      IS_SIGN,
      IS_SIGN_ENTRANCE
    }
  },
  methods: {
    onChange() {
      this.$router.push({})
    }
  }
}
</script>
