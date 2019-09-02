<template>
  <div :class="h5wpr()">
    <div :class="h5wpr('flexbox')">
      <div :class="h5wpr('left')">
        <h5-component id="h5" :class="{ fixed: isFixed }"></h5-component>
      </div>
      <div :class="h5wpr('right')">
        <a-tabs defaultActiveKey="1">
          <a-tab-pane tab="主页" key="1" class="mg-t8">
            <row-container-component title="功能入口">
              <action-component v-if="actionLoaded"></action-component>
            </row-container-component>
            <row-container-component
              title="教练风采"
              subTitle="最多添加100个教练"
            >
              <coach-component v-if="coachLoaded"></coach-component>
            </row-container-component>
            <row-container-component title="推荐课程">
              <course-component v-if="courseLoaded"></course-component>
            </row-container-component>
          </a-tab-pane>
          <a-tab-pane tab="底部导航" key="2" forceRender class="mg-t8">
            <nav-component v-if="menuLoaded"></nav-component>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <div :class="h5wpr('btn-group')">
      <st-button
        type="primary"
        :loading="loading.saveAll"
        @click="saveConfirm(2)"
      >
        保存并提交
      </st-button>
      <!-- <st-button type="primary" :loading="loading.saveAll" @click="saveConfirm(2)">提交</st-button> -->
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
import { NotificationService } from '@/services/notification.service'
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
      messageService: MessageService,
      notificationService: NotificationService
    }
  },
  rxState() {
    return {
      actionInfo: this.h5WrapperService.actionInfo$,
      coachInfo: this.h5WrapperService.coachInfo$,
      coach: this.h5WrapperService.coach$,
      courseInfo: this.h5WrapperService.courseInfo$,
      menuInfo: this.h5WrapperService.menuInfo$,
      loading: this.h5WrapperService.loading$
    }
  },
  data() {
    return {
      actionLoaded: false,
      coachLoaded: false,
      courseLoaded: false,
      menuLoaded: false,
      isFixed: false,
      offsetTop: 0
    }
  },
  created() {
    this.getH5Info()
  },
  mounted() {
    this.offsetTop = document.querySelector('#h5').offsetTop
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      let offsetTop = this.offsetTop
      if (scrollTop > offsetTop) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    },
    saveConfirm(is_save) {
      let content = ''
      if (is_save === 1) content = '是否确认将当前配置信息发布到小程序？'
      if (is_save === 2) content = '是否确认将当前配置信息发布到小程序？'
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
      // this.h5WrapperService.save(saveForm).subscribe()
      // this.h5WrapperService.saveMenu(this.menuInfo).subscribe()
      this.h5WrapperService
        .saveAll({ tabbar: this.menuInfo }, saveForm)
        .subscribe(res => {
          if (res[0].is_success === 1 && res[1].is_success === 1) {
            this.notificationService.success({
              title: '保存成功',
              content: '成功'
            })
          } else if (res[0].is_success === 0) {
            this.notificationService.error({
              title: '保存失败',
              content: res[0].message
            })
          } else if (res[1].is_success === 0) {
            this.notificationService.error({
              title: '保存失败',
              content: res[1].message
            })
          }
        })
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
      this.h5WrapperService.getH5Info({ category: 2 }).subscribe(() => {
        this.actionLoaded = true
      })
      this.h5WrapperService.getH5Info({ category: 3 }).subscribe()
      this.h5WrapperService.getH5Info({ category: 4 }).subscribe(() => {
        let staff_id = []
        if (that.coach) {
          staff_id = that.coach.staff_id_list
        }
        that.h5WrapperService
          .getCoachInfo({ staff_id: staff_id })
          .subscribe(() => {
            that.coachLoaded = true
          })
      })
      this.h5WrapperService.getH5Info({ category: 5 }).subscribe(() => {
        this.courseLoaded = true
      })
      this.h5WrapperService.getMenu().subscribe(() => {
        this.menuLoaded = true
      })
    }
  }
}
</script>
