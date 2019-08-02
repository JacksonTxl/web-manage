<template>
  <div :class="activity()">
    <p v-if="info.is_auth === 0"></p>
    <div v-if="info.is_auth === 1" :class="activity('flexbox')">
      <div :class="activity('left')">
        <h5-component id="h5" :class="{ fixed: isFixed }"></h5-component>
      </div>
      <div :class="activity('right')">
        <a-tabs defaultActiveKey="1">
          <a-tab-pane tab="活动轮播图" key="1">
            <row-container-component
              title="头图活动广告"
              subTitle="拖动图片进行排序，最多添加5张轮播图广告"
            >
              <slider-component v-if="sliderLoaded"></slider-component>
            </row-container-component>
          </a-tab-pane>
          <a-tab-pane tab="营销位活动" key="2" forceRender>
            <row-container-component
              title="营销活动推广设置"
              subTitle="推广活动数量会对图片尺寸有不同要求"
            >
              <event-component v-if="eventLoaded"></event-component>
            </row-container-component>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <div v-if="info.is_auth === 1" :class="activity('btn-group')">
      <st-button type="primary" :loading="loading.save" @click="saveConfirm(2)">
        保存并提交
      </st-button>
      <!-- <st-button type="primary" :loading="loading.save" @click="saveConfirm(2)">提交</st-button> -->
    </div>
  </div>
</template>
<script>
import { H5WrapperService } from '@/views/pages/brand/setting/mina/components#/h5/h5-wrapper.service'
import RowContainerComponent from '@/views/pages/brand/setting/mina/components#/h5/row-container.component'
import H5Component from '@/views/pages/brand/setting/mina/components#/h5/h5.component'
import SliderComponent from './components#/slider.component'
import EventComponent from './components#/event.component'
import { NotificationService } from '@/services/notification.service'
import { ActivityService } from './activity.service'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'H5WrapperComponent',
  components: {
    RowContainerComponent,
    H5Component,
    SliderComponent,
    EventComponent
  },
  props: {},
  bem: {
    activity: 'brand-marketing-activity'
  },
  serviceInject() {
    return {
      h5WrapperService: H5WrapperService,
      notificationService: NotificationService,
      activityService: ActivityService
    }
  },
  rxState() {
    return {
      sliderInfo: this.h5WrapperService.sliderInfo$,
      eventInfo: this.h5WrapperService.eventInfo$,
      loading: this.h5WrapperService.loading$,
      actList: this.activityService.actList$,
      info: this.activityService.info$
    }
  },
  data() {
    return {
      sliderLoaded: false,
      eventLoaded: false,
      isFixed: false,
      offsetTop: 0
    }
  },
  created() {
    if (this.info.is_auth === 0) {
      let that = this
      this.$confirm({
        title: '提示',
        content: '请先开通小程序后使用此功能',
        okText: '去绑定小程序',
        cancelText: '返回',
        onOk() {
          that.$router.push({ path: '/brand/setting/mina/index' })
        },
        onCancel() {
          that.$router.back()
        }
      })
    } else {
      this.getH5Info()
    }
    // this.getActList()
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
        category: 1,
        content: this.sliderInfo
      })
      saveForm.info.push({
        category: 3,
        content: this.eventInfo
      })
      this.h5WrapperService.save(saveForm).subscribe(res => {
        if (res.is_success === 1) {
          this.notificationService.success({
            title: '保存成功',
            content: '成功'
          })
        } else if (res.is_success === 0) {
          this.notificationService.error({
            title: '保存失败',
            content: res.message
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
    getActList() {
      this.activityService.getInfo().subscribe()
    },
    getH5Info() {
      let that = this
      this.h5WrapperService.getH5Info({ category: 1 }).subscribe(() => {
        this.sliderLoaded = true
      })
      this.h5WrapperService.getH5Info({ category: 2 }).subscribe()
      this.h5WrapperService.getH5Info({ category: 3 }).subscribe(() => {
        this.eventLoaded = true
      })
      this.h5WrapperService.getH5Info({ category: 4 }).subscribe(res => {
        let staff_id = []
        if (res.content) {
          staff_id = res.content.staff_id_list
        }
        that.h5WrapperService.getCoachInfo({ staff_id: staff_id }).subscribe()
      })
      this.h5WrapperService.getH5Info({ category: 5 }).subscribe()
      this.h5WrapperService.getMenu().subscribe()
    }
  }
}
</script>
