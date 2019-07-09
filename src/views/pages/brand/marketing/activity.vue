<template>
  <div :class="activity()">
    <div :class="activity('flexbox')">
      <div :class="activity('left')">
        <h5-component></h5-component>
      </div>
      <div :class="activity('right')">
        <a-tabs defaultActiveKey="1">
          <a-tab-pane tab="活动轮播图" key="1">
            <row-container-component title="头图活动广告" subTitle="最多添加5张轮播图广告">
              <slider-component v-if="sliderLoaded"></slider-component>
            </row-container-component>
          </a-tab-pane>
          <a-tab-pane tab="营销位活动" key="2" forceRender>
            <row-container-component title="营销活动推广设置" subTitle="推广活动数量会对图片尺寸有不同要求">
              <event-component v-if="eventLoaded"></event-component>
            </row-container-component>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <div :class="activity('btn-group')">
      <st-button type="primary" @click="saveConfirm(1)">保存</st-button>
      <st-button type="primary" @click="saveConfirm(2)">提交</st-button>
    </div>
  </div>
</template>
<script>
import {
  H5WrapperService
} from '@/views/pages/brand/setting/mina/components#/h5/h5-wrapper.service'
import RowContainerComponent from '@/views/pages/brand/setting/mina/components#/h5/row-container.component'
import H5Component from '@/views/pages/brand/setting/mina/components#/h5/h5.component'
import SliderComponent from './components#/slider.component'
import EventComponent from './components#/event.component'
import {
  cloneDeep
} from 'lodash-es'
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
      h5WrapperService: H5WrapperService
    }
  },
  rxState() {
    return {
      sliderInfo: this.h5WrapperService.sliderInfo$,
      eventInfo: this.h5WrapperService.eventInfo$
    }
  },
  data() {
    return {
      sliderLoaded: false,
      eventLoaded: false
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
        category: 1,
        content: this.sliderInfo
      })
      saveForm.info.push({
        category: 3,
        content: this.eventInfo
      })
      this.h5WrapperService.save(saveForm).subscribe()
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
      this.h5WrapperService.getH5Info({ category: 1 }).subscribe(() => { this.sliderLoaded = true })
      this.h5WrapperService.getH5Info({ category: 2 }).subscribe()
      this.h5WrapperService.getH5Info({ category: 3 }).subscribe(() => { this.eventLoaded = true })
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
