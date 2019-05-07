<template>
  <st-panel
        :tabs="[
          { label: '私教设置', route: { name: 'brand-setting-app-course-personal' } },
          { label: '团课设置', route: { name: 'brand-setting-app-course-team' } }
        ]"
      >
        <!-- 私教课程定价设置 -->
        <a-row>
          <a-col :span="16"><st-t2>私教课程定价设置</st-t2></a-col>
          <a-col :span="8" class="ta-r">
            编辑
          </a-col>
        </a-row>
        <!-- 私教课程定价模式 -->
        <st-t4 class="mg-t24">私教课程定价模式</st-t4>
        <div class="setting-app-des">教练统一定价（每一个私教课程，所授课的教练的课程售出价格一致）</div>
        <st-hr></st-hr>
        <!-- 私教课程售卖模式 -->
        <st-t4>私教课程定价设置</st-t4>
        <div class="setting-app-des">教练谈单模式（ 1. 设置课程最低课时费和最高课时费 2. 超过售卖价格范围时，不支持购买 3. 不支持在用户端直接购买私教课 ）</div>
        <st-hr></st-hr>

         <!-- 私教课程预约设置 -->
        <st-t2>私教课程预约设置</st-t2>
        <!-- 私教课程定价模式 -->
        <st-t4 class="mg-t24">预约范围</st-t4>
        <div class="setting-app-des">用户可预约3小时后到1周以内的私教课程，员工代预约不受此限制</div>
        <st-hr></st-hr>
        <!-- 取消预约 -->
        <st-t4>私教课程定价设置</st-t4>
        <div class="setting-app-des">允许用户在私教课程开始前2个小时取消预约，员工代取消不受此限制</div>
        <st-hr></st-hr>
        <!-- 预约提醒 -->
        <st-t4>预约提醒</st-t4>
        <div class="setting-app-des">在课程开始前 2小时提醒用户上课</div>
        <st-hr></st-hr>
        <!-- 签到方式 -->
        <st-t4>签到方式</st-t4>
        <div class="setting-app-des">支持用户自主签到</div>
        <st-hr></st-hr>
        <!-- 自动签到 -->
        <st-t4>自动签到</st-t4>
        <div class="setting-app-des">开课后即刻允许签到</div>
        <st-hr></st-hr>
        <!-- 取消预约 -->
        <st-t4>取消预约</st-t4>
        <div class="setting-app-des">不支持系统自动签到</div>

        <router-view></router-view>
      </st-panel>
</template>
<script>
export default {

}
</script>
