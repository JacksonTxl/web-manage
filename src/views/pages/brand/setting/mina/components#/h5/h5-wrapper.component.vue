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
              <action-component v-if="actionLoaded"></action-component>
            </row-container-component>
            <row-container-component title="教练风采" subTitle="最多添加100个教练">
              <coach-component  v-if="coachLoaded"></coach-component>
            </row-container-component>
            <row-container-component title="推荐课程">
              <course-component  v-if="courseLoaded"></course-component>
            </row-container-component>
          </a-tab-pane>
          <a-tab-pane tab="底部导航" key="2" forceRender>
            <nav-component v-if="menuLoaded"></nav-component>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <div :class="h5wpr('btn-group')">
        <st-button type="primary" @click="saveConfirm(1)">保存</st-button>
        <st-button type="primary" @click="saveConfirm(2)">提交</st-button>
      </div>
  </div>
</template>
<script>
import { H5WrapperService } from './h5-wrapper.service'
import RowContainerComponent from './row-container.component'
import H5Component from './h5.component'
import ActionComponent from './action.component'
import CoachComponent from './coach.component'
import CourseComponent from './course.component'
import NavComponent from './nav.component'
import { cloneDeep } from 'lodash-es'
import { MessageService } from '@/services/message.service'
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
  serviceInject() {
    return {
      h5WrapperService: H5WrapperService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      actionInfo: this.h5WrapperService.actionInfo$,
      coachInfo: this.h5WrapperService.coachInfo$,
      coach: this.h5WrapperService.coach$,
      courseInfo: this.h5WrapperService.courseInfo$,
      menuInfo: this.h5WrapperService.menuInfo$
    }
  },
  data() {
    return {
      actionLoaded: false,
      coachLoaded: false,
      courseLoaded: false,
      menuLoaded: false
    }
  },
  created() {
    this.getH5Info()
  },
  methods: {
    saveConfirm(is_save) {
      let content = ''
      if (is_save === 1) content = '页面已修改，是否保存？'
      if (is_save === 2) content = '点击发布将提交微信审核，在1-3个工作日后可在手机端查看，您可在完成全部配置后再发布。现在是否确认发布？'
      this.$confirm({
        content: content,
        onOk: () => {
          this.save(is_save)
        }
      })
    },
    save(is_save) {
      let saveForm = {
        is_save,
        info: []
      }
      saveForm.info.push({
        category: 2,
        content: this.actionInfo
      })
      let coachInfo = this.setCoashIDs()
      if (coachInfo.staff_id_list.length > 100) {
        this.messageService.warning({ content: '最多可以添加100个教练' })
        return
      }
      saveForm.info.push({
        category: 4,
        content: coachInfo
      })

      saveForm.info.push({
        category: 5,
        content: this.courseInfo
      })
      this.h5WrapperService.save(saveForm).subscribe()
      this.h5WrapperService.saveMenu(this.menuInfo).subscribe()
    },
    setCoashIDs() {
      let coach = cloneDeep(this.coach)
      coach.staff_id_list = []
      this.coachInfo.forEach(item => {
        coach.staff_id_list.push(item.id)
      })
      return coach
    },
    getH5Info() {
      let that = this
      this.h5WrapperService.getH5Info({ category: 1 }).subscribe()
      this.h5WrapperService.getH5Info({ category: 2 }).subscribe(() => { this.actionLoaded = true })
      this.h5WrapperService.getH5Info({ category: 3 }).subscribe()
      this.h5WrapperService.getH5Info({ category: 4 }).subscribe(() => {
        let staff_id = []
        if (that.coach.content) {
          staff_id = that.coach.conent.staff_id_list
        }
        that.h5WrapperService.getCoachInfo({ staff_id: staff_id }).subscribe(() => { that.coachLoaded = true })
      })
      this.h5WrapperService.getH5Info({ category: 5 }).subscribe(() => { this.courseLoaded = true })
      this.h5WrapperService.getMenu().subscribe(() => { this.menuLoaded = true })
    }
  }
}

</script>
