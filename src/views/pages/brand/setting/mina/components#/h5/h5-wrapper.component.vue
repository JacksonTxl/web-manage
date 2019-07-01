<template>
  <div :class="h5wpr()">
    <div :class="h5wpr('flexbox')">
      <div :class="h5wpr('left')">
        <h5-component></h5-component>
      </div>
      <div :class="h5wpr('right')">
        <a-tabs defaultActiveKey="1">
          <a-tab-pane tab="主页" key="1">
            <row-container-component title="功能入口">
              <action-component></action-component>
            </row-container-component>
            <row-container-component title="教练风采" subTitle="最多添加100个教练">
              <coach-component></coach-component>
            </row-container-component>
            <row-container-component title="推荐课程">
              <course-component></course-component>
            </row-container-component>
          </a-tab-pane>
          <a-tab-pane tab="底部导航" key="2" forceRender>
            <nav-component></nav-component>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <div :class="h5wpr('btn-group')">
        <st-button type="primary" @click="save">保存</st-button>
        <st-button type="primary" @click="save">提交</st-button>
      </div>
  </div>
</template>
<script>
import RowContainerComponent from './row-container.component'
import H5Component from './h5.component'
import ActionComponent from './action.component'
import CoachComponent from './coach.component'
import CourseComponent from './course.component'
import NavComponent from './nav.component'
export default {
  name: 'H5WrapperComponent',
  components: {
    RowContainerComponent,
    H5Component,
    ActionComponent,
    CoachComponent,
    CourseComponent,
    NavComponent
  },
  props: {},
  bem: {
    h5wpr: 'h5-wrapper-component'
  },
  methods: {
    save() {

    }
  }
}

</script>
