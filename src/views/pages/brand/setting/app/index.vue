<template>
  <div class="st-page-tab">
    <a-tabs defaultActiveKey="2" tabPosition="left">
      <a-tab-pane key="1">
        <div slot="tab">品牌设置</div>
        <st-panel app>1
        </st-panel>
      </a-tab-pane>
      <a-tab-pane key="2">
        <div slot="tab">课程定价及预约设置</div>
        <st-panel app>
          <setting-course-info/>
        </st-panel>
      </a-tab-pane>
       <a-tab-pane key="3">
        <div slot="tab">支付设置</div>
        <st-panel app>2
        </st-panel>
      </a-tab-pane>
       <a-tab-pane key="4">
        <div slot="tab">小票设置</div>
        <st-panel app>2
        </st-panel>
      </a-tab-pane>
       <a-tab-pane key="5">
        <div slot="tab">教练等级设置</div>
        <st-panel app>2
        </st-panel>
      </a-tab-pane>
       <a-tab-pane key="6">
        <div slot="tab">用户等级设置</div>
        <st-panel app>2
        </st-panel>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import SettingCourseInfo from './course/personal'
export default {
  components: {
    SettingCourseInfo
  }
}
</script>
